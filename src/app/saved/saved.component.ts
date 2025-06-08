import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SavedService } from '../home/services/saved.service';
import { Post } from '../home/interfaces/post';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostsService } from '../home/services/posts.service';
import { PostsCardComponent } from '../home/posts/posts-card/posts-card.component';
import { RouterLink } from '@angular/router';
import { ModalErrorComponent } from '../shared/modal-error/modal-error.component';

@Component({
    selector: 'saved',
    standalone: true,
    imports: [PostsCardComponent, RouterLink, ModalErrorComponent],
    templateUrl: './saved.component.html',
    styleUrl: './saved.component.scss'
})
export class SavedComponent {
    readonly #destroyRef = inject(DestroyRef);
    readonly #savedService = inject(SavedService);
    readonly #postsService = inject(PostsService);

    savedPosts = signal<Post[]>([]);
    tags = signal<string[]>([]);
    error = signal<string | null>(null);

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
                    this.reduceTags();
                },
                error: (error) => {
                    this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
                    setTimeout(() => {
                        this.error.set(null);
                    }, 3000);
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
                },
                error: () => {
                    this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
                    setTimeout(() => {
                        this.error.set(null);
                    }, 3000);
                }
            });
    }

    reduceTags() {
        this.tags.update((value) => Array.from(new Set(value)));
    }
}
