import { Component, computed, DestroyRef, effect, inject, input, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { PostsService } from "../../services/posts.service";
import { Post } from "../../interfaces/post";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommentsService } from "../../services/comments.service";
import { DividerModule } from 'primeng/divider';
import { CommentsComponent } from "../../comments/comments.component";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { CommentsFormComponent } from "../../comments/comments-form/comments-form.component";

@Component({
  selector: 'posts-detail',
  imports: [DividerModule, CommentsComponent, DatePipe, CommentsFormComponent],
  templateUrl: './posts-detail.component.html',
  styleUrl: './posts-detail.component.scss'
})
export class PostsDetailComponent {
  readonly #title = inject(Title);
  readonly #postService = inject(PostsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #commentsService = inject(CommentsService);
  readonly #router = inject(Router);

  imageBase64 = '';
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
      if (this.post().content.multimedia && this.post().content.multimedia!.length > 0) {
        this.imageBase64 = this.post().content.multimedia![0].filename;
      }
    })
  }

  actualize() {
    this.commentsResource.reload();
  }

  editPost() {
    this.#router.navigate(['/home/posts', this.post().id, 'edit']);
  }

  deletePost() {
    this.#postService.deletePost(this.post().id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.#router.navigate(['/home/sections', this.post().section.id]);
        },
        error: (error) => console.log(error.errror.message)
      })
  }
}
