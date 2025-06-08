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

    ordenarPorFecha() {
        this.ordenadosFecha.set(this.posts().slice(0, 3));
    }

    ordenarPorComentarios() {
        this.ordenadosComentarios.set(this.posts().slice().sort((a: Post, b: Post) => b.numComments - a.numComments));
        this.ordenadosComentarios.update((actual) => actual.splice(0, 3));
    }
}