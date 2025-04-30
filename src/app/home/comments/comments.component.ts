import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../interfaces/comment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'comments',
  imports: [DatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  readonly #commentsService = inject(CommentsService);
  readonly #destroyRed = inject(DestroyRef);

  comment = input.required<Comment>();
  deleted = output<void>();

  deleteComment() {
    this.#commentsService.deleteComment(this.comment().id)
      .pipe(takeUntilDestroyed(this.#destroyRed))
      .subscribe({
        next: () => {
          this.deleted.emit()
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
  }
}
