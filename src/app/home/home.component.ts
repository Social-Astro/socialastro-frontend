import { Component, DestroyRef, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { PostsService } from "./services/posts.service";
import { Post } from "./interfaces/post";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'home',
    standalone: true,
    imports: [RouterOutlet, DatePipe, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    readonly #postsService = inject(PostsService);
    readonly #destroyRef = inject(DestroyRef);

    posts = signal<Post[]>([]);
    ordenadosFecha = signal<Post[]>([]);
    ordenadosComentarios = signal<Post[]>([]);

    constructor() {
        // TODO: Que se actualice al momento al corregir el todo de abajo
        this.getPosts();
    }

    getPosts() {
        this.#postsService.getPosts()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
                next: (resp) => {
                    this.posts.set(resp);
                    this.ordenarPorFecha();
                    this.ordenarPorComentarios();
                },
                error: (error) => {
                    console.log(error.error.message);
                }
            })
    }

    // TODO: Molaría conseguir que estos métodos se pudieran sacar por la base de datos directamente
    ordenarPorFecha() {
        console.log(this.posts());
        this.ordenadosFecha.set(this.posts().slice().sort((a: Post, b: Post) => b.content.createdAt.toString().localeCompare(a.content.createdAt.toString())));
        this.ordenadosFecha.update((actual) => actual.splice(0, 2));
        console.log('FECHA: ', this.ordenadosFecha());
        console.log('posts', this.posts());
    }

    ordenarPorComentarios() {
        this.ordenadosComentarios.set(this.posts().slice().sort((a: Post, b: Post) => b.comments.length - a.comments.length));
        this.ordenadosComentarios.update((actual) => actual.splice(0, 2));
        console.log('COMENTARIOS', this.ordenadosComentarios());
    }
}