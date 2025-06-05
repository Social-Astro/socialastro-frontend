import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncodeBase64Directive } from '../../../shared/directives/encode-base64.directive';
import { CommentsService } from '../../services/comments.service';
import { Post } from '../../interfaces/post';
import { Comment, NewComment } from '../../interfaces/comment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { Multimedia } from '../../interfaces/multimedia';
import { LoadButtonComponent } from '../../../shared/load-button/load-button.component';

@Component({
  selector: 'comments-form',
  imports: [ReactiveFormsModule, EncodeBase64Directive, NgClass, LoadButtonComponent],
  templateUrl: './comments-form.component.html',
  styleUrl: './comments-form.component.scss'
})
export class CommentsFormComponent {
  readonly #commentsService = inject(CommentsService);
  readonly #destroyRef = inject(DestroyRef);
  imagesBase64: string[] = [];
  loading = signal(false);

  post = input.required<Post>();
  comment = input<Comment>();

  edited = output<void>();
  added = output<void>();
  hide = output<void>();

  commentForm = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    multimediaGroup: new FormGroup({
      file1: new FormControl(null),
      file2: new FormControl(null),
      file3: new FormControl(null),
      file4: new FormControl(null)
    })
  });

  constructor() {
    effect(() => {
      if (this.comment()) {
        this.commentForm.get('description')!.setValue(this.comment()!.content.description);
        this.comment()!.content.multimedia?.forEach((f) => {
          this.imagesBase64.push(f.filename);
        })
      }
    })
  }

  sendComment() {
    let files: Multimedia[] = [];

    const newComment: NewComment = {
      post: this.post(),
      content: {
        description: this.commentForm.get('description')?.getRawValue(),
        updatedAt: new Date(),
        multimedia: files
      }
    }

    for (let i = 0; i < this.imagesBase64.length; i++) {
      /* if (this.comment() && this.comment()!.content.multimedia![i]) { */
      if (this.comment()?.content.multimedia?.[i]) {
        newComment.content.multimedia!.push({
          id: this.comment()!.content.multimedia![i].id,
          filename: this.imagesBase64[i]
        })
      } else {
        newComment.content.multimedia!.push({
          filename: this.imagesBase64[i]
        })
      }
    }

    if (this.comment()) {
      newComment.content.id = this.comment()!.content.id;
      newComment.content.user = this.comment()!.content.user;
      console.log(newComment);

      console.log("IMAGENES", this.imagesBase64);

      this.#commentsService.editComment(newComment, this.comment()!.id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.edited.emit();
          },
          error: (error) => {
            console.log(error.error.message);
          }
        })
    } else {
      console.log(newComment);

      this.#commentsService.addComment(newComment)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.commentForm.reset();
            this.imagesBase64 = [];
            this.added.emit();
          },
          error: (error) => {
            console.log(error.error.message);
          }
        })
    }
    this.loading.set(false);
  }

  exitForm() {
    this.loading.set(false);
    this.hide.emit();
    this.commentForm.reset();
    this.commentForm.markAsUntouched();
    this.imagesBase64 = [];
  }
}
