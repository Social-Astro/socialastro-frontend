import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { PostsService } from '../home/services/posts.service';
import { Post } from '../home/interfaces/post';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { Avatar } from 'primeng/avatar';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../interfaces/user';
import { ModalErrorComponent } from '../shared/modal-error/modal-error.component';

@Component({
  selector: 'explore',
  imports: [Carousel, NgStyle, Tag, RouterLink, Avatar, ModalErrorComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  readonly #postsService = inject(PostsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  actualUser = signal<User | undefined>(undefined);

  posts = signal<Post[]>([]);
  postsUsuario = signal<Post[]>([]);
  ordenadosTag1 = signal<Post[]>([]);
  ordenadosTag2 = signal<Post[]>([]);

  numAleatorio = 0;
  postAleatorio = signal<Post | null>(null);

  error = signal<string | null>(null);

  responsiveOptions: any[] | undefined;

  constructor() {
    this.getPosts();

    effect(() => {
      this.actualUser.set(this.#authService.currentUser.value());
      this.getPostsUsuario();
    })

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getPosts() {
    this.#postsService.getPosts()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (resp) => {
          this.posts.set(resp);
          this.numAleatorio = Math.ceil(Math.random() * this.posts().length);
          this.postAleatorio.set(resp[this.numAleatorio]);
        },
        error: (error) => {
          this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
          setTimeout(() => {
            this.error.set(null);
          }, 3000);
        }
      });
  }

  getPostsUsuario() {
    if (this.actualUser()) {
      this.#postsService.getPostsByUser(this.actualUser()!.id!)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: (resp) => {
            this.postsUsuario.set(resp.posts);
            this.getPostsByTags();
          },
          error: (error) => {
            this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
            setTimeout(() => {
              this.error.set(null);
            }, 3000);
          }
        });
    }
  }

  getPostsByTags() {
    this.#postsService.getPostsByTag(this.postsUsuario()[0].tag)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (resp) => {
          this.ordenadosTag1.set(resp);
        },
        error: (error) => {
          this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
          setTimeout(() => {
            this.error.set(null);
          }, 3000);
        }
      });
  }
}
