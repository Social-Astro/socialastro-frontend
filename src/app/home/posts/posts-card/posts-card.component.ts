import { Component, DestroyRef, effect, inject, input, output } from "@angular/core";
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'posts-card',
  imports: [RouterLink],
  templateUrl: './posts-card.component.html',
  styleUrl: './posts-card.component.scss'
})
export class PostsCardComponent {
  readonly #postService = inject(PostsService);
  readonly #destroyRef = inject(DestroyRef);

  post = input.required<Post>();

  deleted = output<void>();

  constructor() {
    effect(() => {
      console.log(this.post());
    })
  }

  deletePost() {
    this.#postService.deletePost(this.post().id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.deleted.emit();
        },
        error: (error) => console.log(error.error.message)
      })
  }
}