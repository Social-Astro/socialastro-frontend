import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { NewPost, Post } from '../../interfaces/post';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncodeBase64Directive } from '../../../shared/directives/encode-base64.directive';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Title } from '@angular/platform-browser';
import { Section } from '../../interfaces/sections';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'posts-form',
  standalone: true,
  imports: [ReactiveFormsModule, EncodeBase64Directive, ValidationClassesDirective],
  templateUrl: './posts-form.component.html',
  styleUrl: './posts-form.component.scss'
})
export class PostsFormComponent {
  readonly #router = inject(Router);
  readonly #postsService = inject(PostsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #title = inject(Title);
  /* readonly #modalService = inject(NgbModal); */

  imageBase64 = '';
  saved = false;

  section = input.required<Section>();
  post = input.required<Post>();

  postForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    multimedia: new FormControl(''),
  });

  constructor() {
    effect(() => {
      console.log(this.section());
      if (this.post()) {
        this.#title.setTitle(this.post().title + ' | Edit');
        this.postForm.get('title')!.setValue(this.post().title);
        this.postForm.get('description')!.setValue(this.post().content.description);
      }
    })
  }

  sendPost() {
    const newPost: NewPost = {
      title: this.postForm.get('title')?.getRawValue(),
      section: this.section(),
      content: {
        description: this.postForm.get('description')?.getRawValue(),
        createdAt: new Date(),
        multimedia: this.imageBase64,
        likes: 0,
        user: undefined
      }
    };

    if (this.post()) {
      this.#postsService.editPost(newPost, this.post().id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.saved = true;
            this.#router.navigate(['/sections', this.section().id]);
          },
          error: (error) => console.log(error.error.message)
        });
    }
    else {
      this.#postsService.addPost(newPost)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: (resp) => {
            this.saved = true;
            this.#router.navigate(['/sections', this.section().id]);
          },
          error: (error) => console.log(error.error.message)
        });
    }
  }

  /* canDeactivate() {
    if (this.saved || this.postForm.pristine) {
      return true;
    }

    const modalRef = this.#modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Leaving the page';
    modalRef.componentInstance.body = 'Are you sure? The changes will be lost...';
    return modalRef.result.catch(() => false);
  } */
}
