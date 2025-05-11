import { Component, DestroyRef, effect, inject, input, signal } from "@angular/core";
import { Section } from "../../interfaces/sections";
import { Title } from "@angular/platform-browser";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { PostsService } from "../../services/posts.service";
import { PostsCardComponent } from "../posts-card/posts-card.component";
import { Router, RouterLink } from "@angular/router";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { Post } from "../../interfaces/post";

@Component({
  selector: 'posts-page',
  standalone: true,
  imports: [PostsCardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})
export class PostsPageComponent {
  readonly #title = inject(Title);
  readonly #postsService = inject(PostsService);
  readonly #router = inject(Router);
  readonly #destroyRed = inject(DestroyRef);

  section = input.required<Section>();
  posts = signal<Post[]>([]);


  searchControl = new FormControl('');
  search = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    ),
    { initialValue: '' }
  )


  constructor() {
    effect(() => {
      if (this.section()) {
        this.#title.setTitle(this.section().title + ' ** Social Astro');
        this.getPosts();
      }
    })
  }

  getPosts() {
    this.#postsService.getPostsBySection(this.section().id, this.search()!)
      .pipe(takeUntilDestroyed(this.#destroyRed))
      .subscribe({
        next: (resp) => {
          this.posts.set(resp.posts)
        }
      })
  }

  goAddPost() {
    this.#router.navigate(['/home/sections', this.section().id, 'add']);
  }

  deletePost() {
    this.getPosts();
  }
}