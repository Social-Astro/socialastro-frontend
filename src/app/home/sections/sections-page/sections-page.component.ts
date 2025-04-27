import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Topic } from '../../interfaces/topics';
import { SectionsService } from '../../services/sections.service';
import { Section } from '../../interfaces/sections';
import { SectionsFormComponent } from '../sections-form/sections-form.component';

import { SectionsCardComponent } from '../sections-card/sections-card.component';

@Component({
  selector: 'sections-page',
  standalone: true,
  imports: [SectionsFormComponent, SectionsCardComponent],
  templateUrl: './sections-page.component.html',
  styleUrl: './sections-page.component.scss'
})
export class SectionsPageComponent {
  readonly #title = inject(Title);
  readonly #sectionsService = inject(SectionsService);
  readonly #destroyRef = inject(DestroyRef);

  topic = input.required<Topic>();
  showForm = signal(false);
  edit = signal(false);

  sectionsResource = rxResource({
    request: () => this.topic().id,
    loader: ({ request: id }) => this.#sectionsService.getSectionsByTopic(id)
  });

  sectionsByTopic = computed(() => this.sectionsResource.value());
  allSections = signal<Section[] | undefined>(undefined);

  sections = signal<Section[] | undefined>(undefined);

  constructor() {
    // TODO: Repasar
    effect(() => {
      if (!this.topic()) {
        this.getAllSections();
        this.sections.set(this.allSections());
      } else {
        this.#title.setTitle(this.topic().title + ' ** Social Astro');
        this.sections.set(this.sectionsByTopic());
      }
    });
  }

  getAllSections() {
    this.#sectionsService.getSections()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (resp) => {
          this.allSections.set(resp)
        },
        error: (error) => console.log(error.error.message)
      });
  }

  showSectionForm() {
    if (this.showForm() === true)
      this.sectionsResource.reload();
    this.showForm.update((state) => !state);
  }

  deleteSection() {
    this.sectionsResource.reload();
  }

}
