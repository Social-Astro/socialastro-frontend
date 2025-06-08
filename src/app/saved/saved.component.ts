import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SavedService } from '../home/services/saved.service';
import { Post } from '../home/interfaces/post';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostsService } from '../home/services/posts.service';
import { PostsCardComponent } from '../home/posts/posts-card/posts-card.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'saved',
    standalone: true,
    imports: [PostsCardComponent, RouterLink],
    templateUrl: './saved.component.html',
    styleUrl: './saved.component.scss'
})
export class SavedComponent {
    readonly #destroyRef = inject(DestroyRef);
    readonly #savedService = inject(SavedService);
    readonly #postsService = inject(PostsService);

    savedPosts = signal<Post[]>([]);
    tags = signal<string[]>([]);

    constructor() {
        this.getSavedPosts();
    }

    getSavedPosts() {
        this.#savedService
            .getSavedByUser()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
                next: (resp) => {
                    resp.forEach((p) => {
                        this.tags.update((tags) => [...tags, p.postTag]);
                        this.getSinglePost(p.postId);
                    });

                    console.log(this.savedPosts());
                    this.reduceTags();
                    console.log(this.tags());
                },
                error: (error) => {
                    console.log(error.error.message);
                }
            });
    }

    getSinglePost(postId: number) {
        this.#postsService
            .getPost(postId)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
                next: (post) => {
                    this.savedPosts.update((posts) => [...posts, post]);
                }
            });
    }

    reduceTags() {
        this.tags.update((value) => Array.from(new Set(value)));
    }

    nada() {
        console.log('Hola');
    }
}
