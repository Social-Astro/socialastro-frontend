import { Component, computed, DestroyRef, effect, inject, input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { PostsService } from "../../services/posts.service";
import { Post } from "../../interfaces/post";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommentsService } from "../../services/comments.service";
import { DividerModule } from 'primeng/divider';
import { CommentsComponent } from "../../comments/comments.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'posts-detail',
  imports: [DividerModule, CommentsComponent, DatePipe],
  templateUrl: './posts-detail.component.html',
  styleUrl: './posts-detail.component.scss'
})
export class PostsDetailComponent {
  readonly #title = inject(Title);
  readonly #postService = inject(PostsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #commentsService = inject(CommentsService);

  post = input.required<Post>();

  commentsResource = rxResource({
    request: () => this.post().id,
    loader: ({ request: id }) => this.#commentsService.getCommentsByPost(id)
  });

  comments = computed(() => this.commentsResource.value());

  constructor() {
    effect(() => {
      console.log(this.post());
      console.log(this.comments());
      this.#title.setTitle(this.post().title + ' ** Social Astro');
    })
  }

  deleteComment() {
    this.commentsResource.reload();
  }

  deletePost() {
    this.#postService.deletePost(this.post().id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          // TODO: Router a la sección que toca
        },
        error: (error) => console.log(error.errror.message)
      })
  }
}
