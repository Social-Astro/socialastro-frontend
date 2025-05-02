import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { NewPost, Post } from '../../interfaces/post';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncodeBase64Directive } from '../../../shared/directives/encode-base64.directive';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Title } from '@angular/platform-browser';
import { Section } from '../../interfaces/sections';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../../interfaces/user';

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
        this.imageBase64 = this.post().content.multimedia;
      }
    })
  }

  sendPost() {
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

    const newPost: NewPost = {
      title: this.postForm.get('title')?.getRawValue(),
      section: this.section() ? this.section() : this.post().section,
      content: {
        description: this.postForm.get('description')?.getRawValue(),
        createdAt: this.post() ? this.post().content.createdAt : new Date(),
        multimedia: this.imageBase64,
        likes: 0,
        user: userPruebas
      }
    };

    if (this.post()) {
      this.#postsService.editPost(newPost, this.post().id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: (resp) => {
            console.log(resp);
            this.saved = true;
            this.#router.navigate(['/home/posts', this.post().id]);
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
            this.#router.navigate(['/home/sections', this.section().id]);
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
