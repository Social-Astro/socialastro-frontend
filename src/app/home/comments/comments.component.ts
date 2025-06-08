import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../interfaces/comment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { CommentsFormComponent } from './comments-form/comments-form.component';
import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { ModalConfirmComponent } from '../../shared/modal-confirm/modal-confirm.component';
import { ModalErrorComponent } from '../../shared/modal-error/modal-error.component';

@Component({
  selector: 'comments',
  imports: [DatePipe, CommentsFormComponent, CarouselModule, AvatarModule, RouterLink, ModalConfirmComponent, ModalErrorComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  readonly #commentsService = inject(CommentsService);
  readonly #destroyRed = inject(DestroyRef);

  comment = input.required<Comment>();
  deleted = output<void>();
  edited = output<void>();

  showAlert = signal(false);
  showEdit = signal(false);
  error = signal<string | null>(null);

  editComment() {
    this.showEdit.set(false);
    this.edited.emit();
  }

  deleteComment() {
    this.#commentsService.deleteComment(this.comment().id)
      .pipe(takeUntilDestroyed(this.#destroyRed))
      .subscribe({
        next: () => {
          this.deleted.emit()
        },
        error: (error) => {
          this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
          setTimeout(() => {
            this.error.set(null);
          }, 3000);
        }
      })
  }

  hideForm() {
    this.showEdit.set(false);
  }
}
