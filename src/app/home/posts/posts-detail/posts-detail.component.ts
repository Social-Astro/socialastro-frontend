import { Component, computed, DestroyRef, effect, inject, input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { PostsService } from "../../services/posts.service";
import { Post } from "../../interfaces/post";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommentsService } from "../../services/comments.service";
import { DividerModule } from 'primeng/divider';
import { CommentsComponent } from "../../comments/comments.component";
import { DatePipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { CommentsFormComponent } from "../../comments/comments-form/comments-form.component";
import { LikesService } from "../../services/likes.service";
import { CarouselModule } from 'primeng/carousel';
import { SavedService } from "../../services/saved.service";
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'posts-detail',
  imports: [DividerModule, CommentsComponent, DatePipe, CommentsFormComponent, CarouselModule, TagModule, AvatarModule, RouterLink],
  templateUrl: './posts-detail.component.html',
  styleUrl: './posts-detail.component.scss'
})
export class PostsDetailComponent {
  readonly #title = inject(Title);
  readonly #postService = inject(PostsService);
  readonly #likesService = inject(LikesService);
  readonly #savedService = inject(SavedService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #commentsService = inject(CommentsService);
  readonly #router = inject(Router);

  imageBase64 = '';
  post = input.required<Post>();

  commentsResource = rxResource({
    request: () => this.post().id,
    loader: ({ request: id }) => this.#commentsService.getCommentsByPost(id)
  });

  comments = computed(() => this.commentsResource.value()?.comments);
  actualPage = computed(() => this.commentsResource.value()?.page);

  constructor() {
    effect(() => {
      console.log(this.post());
      console.log(this.comments());
      this.#title.setTitle(this.post().title + ' ** Social Astro');
      if (this.post().content.multimedia && this.post().content.multimedia!.length > 0) {
        this.imageBase64 = this.post().content.multimedia![0].filename;
      }
      this.post().content.user!.avatar = this.post().content.user!.avatar ? this.post().content.user!.avatar : 'assets/default-avatar.png';
    })
  }

  actualize() {
    this.commentsResource.reload();
  }

  editPost() {
    this.#router.navigate(['/home/posts', this.post().id, 'edit']);
  }

  darLike() {
    const likes = this.post().alreadyLikes;

    if (likes) {
      this.post().numLikes--;
      this.post().alreadyLikes = false;

      this.#likesService.deleteLike(this.post().id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            console.log("Quit like");
          },
          error: () => this.post().alreadyLikes = likes
        })
    } else {
      this.post().numLikes++;
      this.post().alreadyLikes = true;

      this.#likesService.addLike(this.post())
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            console.log("Like");
          },
          error: () => this.post().alreadyLikes = likes
        });
    }
  }

  guardar() {
    const saved = this.post().alreadySaved;

    if (saved) {
      this.post().numSaved--;
      this.post().alreadySaved = false;

      this.#savedService.deleteSaved(this.post().id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            console.log("Quit like");
          },
          error: () => this.post().alreadySaved = saved
        })
    } else {
      this.post().numSaved++;
      this.post().alreadySaved = true;

      this.#savedService.addSaved(this.post())
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            console.log("Like");
          },
          error: () => this.post().alreadySaved = saved
        });
    }
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

  goBack() {
    this.#router.navigate(['/home/sections', this.post().section.id]);
  }
}
