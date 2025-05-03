import { Component, computed, effect, inject, input } from "@angular/core";
import { Section } from "../../interfaces/sections";
import { Title } from "@angular/platform-browser";
import { rxResource, toSignal } from "@angular/core/rxjs-interop";
import { PostsService } from "../../services/posts.service";
import { PostsCardComponent } from "../posts-card/posts-card.component";
import { Router, RouterLink } from "@angular/router";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs";

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

  section = input.required<Section>();

  postsResource = rxResource({
    request: () => this.section().id,
    loader: ({ request: id }) => this.#postsService.getPostsBySection(id)
  });

  posts = computed(() => this.postsResource.value());

  //TODO: Añadir el parámetro de búsqueda directamente en el back, e incluirlo arriba en el método que recupera los datos
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
      }
    })
  }

  goAddPost() {
    this.#router.navigate(['/home/sections', this.section().id, 'add']);
  }

  deletePost() {
    this.postsResource.reload();
  }
}