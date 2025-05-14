import { Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { EncodeBase64Directive } from '../../../shared/directives/encode-base64.directive';
import { CommentsService } from '../../services/comments.service';
import { Post } from '../../interfaces/post';
import { Comment, NewComment } from '../../interfaces/comment';
import { User } from '../../../interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Multimedia } from '../../interfaces/Multimedia';

@Component({
  selector: 'comments-form',
  imports: [ReactiveFormsModule, ValidationClassesDirective, EncodeBase64Directive],
  templateUrl: './comments-form.component.html',
  styleUrl: './comments-form.component.scss'
})
export class CommentsFormComponent {
  readonly #commentsService = inject(CommentsService);
  readonly #destroyRef = inject(DestroyRef);
  imageBase64 = '';
  saved = false;

  post = input.required<Post>();
  comment = input<Comment>();

  edited = output<void>();
  added = output<void>();

  commentForm = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    multimedia: new FormControl('')
  });

  constructor() {
    effect(() => {
      if (this.comment()) {
        this.commentForm.get('description')!.setValue(this.comment()!.content.description);
        /* this.imageBase64 = this.comment()!.content.multimedia[0].filename; */
      }
    })
  }

  sendComment() {
    //TODO: Necesario para pruebas
    const userPruebas: User = {
      id: 1,
      username: 'admin',
      password: '',
      name: 'admin',
      email: 'admin@gmail.com',
      avatar: '',
      header: '',
      bio: '',
      role: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      friend_ids: []
    };

    let files: Multimedia[] = [];
    files.push({ filename: this.imageBase64 });

    const newComment: NewComment = {
      post: this.post(),
      content: {
        description: this.commentForm.get('description')?.getRawValue(),
        updatedAt: this.comment() ? this.comment()!.content.updatedAt : new Date(),
        multimedia: files,
        user: userPruebas
      }
    }

    if (this.comment()) {
      newComment.content.id = this.comment()!.content.id;
      this.#commentsService.editComment(newComment, this.comment()!.id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.saved = true;
            this.edited.emit();
          },
          error: (error) => {
            console.log(error.error.message);
          }
        })
    } else {
      this.#commentsService.addComment(newComment)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.saved = true;
            this.commentForm.reset();
            this.added.emit();
          },
          error: (error) => {
            console.log(error.error.message);
          }
        })
    }
  }
}
