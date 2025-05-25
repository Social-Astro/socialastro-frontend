import { Component, computed, DestroyRef, effect, inject, input, output } from "@angular/core";
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/post';
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Comment } from "../../interfaces/comment";
import { CommentsService } from "../../services/comments.service";
import { DatePipe } from "@angular/common";
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'posts-card',
  imports: [DatePipe, TagModule],
  templateUrl: './posts-card.component.html',
  styleUrl: './posts-card.component.scss'
})
export class PostsCardComponent {
  readonly #postService = inject(PostsService);
  readonly #commentsService = inject(CommentsService);
  readonly #destroyRef = inject(DestroyRef);

  post = input.required<Post>();

  commentsResource = rxResource({
    request: () => this.post().id,
    loader: ({ request: id }) => this.#commentsService.getCommentsByPost(id)
  });

  lastVisit = computed(() => this.commentsResource.value()?.comments.slice().sort((c: Comment, c2: Comment) => c2.content.updatedAt.toString().localeCompare(c.content.updatedAt.toString()))[0]);

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