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
import { NgClass } from '@angular/common';
import { Multimedia } from '../../interfaces/multimedia';
import { ModalErrorComponent } from '../../../shared/modal-error/modal-error.component';

@Component({
  selector: 'posts-form',
  standalone: true,
  imports: [ReactiveFormsModule, EncodeBase64Directive, ValidationClassesDirective, NgClass, ModalErrorComponent],
  templateUrl: './posts-form.component.html',
  styleUrl: './posts-form.component.scss'
})
export class PostsFormComponent {
  readonly #router = inject(Router);
  readonly #postsService = inject(PostsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #title = inject(Title);

  imagesBase64: string[] = [];
  error = signal<string | null>(null);

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
    multimediaGroup: new FormGroup({
      file1: new FormControl(null),
      file2: new FormControl(null),
      file3: new FormControl(null),
      file4: new FormControl(null)
    }),
    tag: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor() {
    effect(() => {
      if (this.post()) {
        this.#title.setTitle(this.post().title + ' | Edit');
        this.postForm.get('title')!.setValue(this.post().title);
        this.postForm.get('description')!.setValue(this.post().content.description);
        this.postForm.get('tag')!.setValue(this.post().tag);

        this.post().content.multimedia?.forEach((f) => {
          this.imagesBase64.push(f.filename);
        })
      }
    })
  }

  sendPost() {
    let files: Multimedia[] = [];

    const newPost: NewPost = {
      title: this.postForm.get('title')?.getRawValue(),
      section: this.section() ? this.section() : this.post().section,
      content: {
        description: this.postForm.get('description')?.getRawValue(),
        updatedAt: new Date(),
        multimedia: files
      },
      tag: this.postForm.get('tag')?.getRawValue()
    };

    for (let i = 0; i < this.imagesBase64.length; i++) {
      if (this.post() && this.post().content.multimedia![i]) {
        newPost.content.multimedia!.push({
          id: this.post().content.multimedia![i].id,
          filename: this.imagesBase64[i]
        })
      } else {
        newPost.content.multimedia!.push({
          filename: this.imagesBase64[i]
        })
      }
    }

    if (this.post()) {
      newPost.content.id = this.post().content.id;
      newPost.content.user = this.post().content.user;

      if (!this.imagesBase64.length) {
        newPost.content.multimedia = this.post().content.multimedia;
      }

      this.#postsService.editPost(newPost, this.post().id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.#router.navigate(['/home/posts', this.post().id]);
          },
          error: () => {
            this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
            setTimeout(() => {
              this.error.set(null);
            }, 3000);
          }
        });
    }
    else {
      this.#postsService.addPost(newPost)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.#router.navigate(['/home/sections', this.section().id]);
          },
          error: () => {
            this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
            setTimeout(() => {
              this.error.set(null);
            }, 3000);
          }
        });
    }
  }

  dismiss() {
    if (this.section())
      this.#router.navigate(['/home/sections', this.section().id]);
    else
      this.#router.navigate(['/home/posts', this.post().id]);
  }
}
