import { Component, DestroyRef, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { PostsService } from "./services/posts.service";
import { Post } from "./interfaces/post";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'home',
    imports: [RouterOutlet, DatePipe, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    readonly #postsService = inject(PostsService);
    readonly #destroyRef = inject(DestroyRef);

    posts = signal<Post[]>([]);
    ordenadosFecha: Post[] = [];
    ordenadosComentarios: Post[] = [];

    constructor() {
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
        this.ordenadosFecha = this.posts().slice().sort((a: Post, b: Post) => b.content.createdAt.toString().localeCompare(a.content.createdAt.toString()));
        this.ordenadosFecha.splice(2);
        console.log('FECHA: ', this.ordenadosFecha);
        console.log('posts', this.posts());
    }

    ordenarPorComentarios() {
        this.ordenadosComentarios = this.posts().slice().sort((a: Post, b: Post) => b.comments.length - a.comments.length);
        this.ordenadosComentarios.splice(2);
        console.log('COMENTARIOS', this.ordenadosComentarios);
    }
}