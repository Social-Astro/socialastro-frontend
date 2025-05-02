import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { SectionsService } from '../../services/sections.service';
import { NewSection } from '../../interfaces/sections';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Topic } from '../../interfaces/topics';
import { TopicsService } from '../../services/topics.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sections-form',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationClassesDirective, NgClass],
  templateUrl: './sections-form.component.html',
  styleUrl: './sections-form.component.scss'
})
export class SectionsFormComponent {
  readonly #sectionsService = inject(SectionsService);
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(NonNullableFormBuilder);

  topic = input.required<Topic>();
  topicAux = signal<Topic | null>(null);
  allTopics: Topic[] = [];

  showSelect = signal(false);
  saved = output<void>();
  hide = output<void>();

  sectionForm = this.#fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    topic: ['']
  })

  constructor() {
    effect(() => {
      if (!this.topic()) {
        this.#topicsService.getTopics()
          .pipe(takeUntilDestroyed(this.#destroyRef))
          .subscribe((resp) => this.allTopics = resp);

        this.showSelect.set(true);
      }
    })
  }

  async addSection() {
    const newSection: NewSection = {
      title: this.sectionForm.get('title')!.getRawValue(),
      description: this.sectionForm.get('description')!.getRawValue(),
      image: '',
      topic: this.topic()
    };

    this.#sectionsService.addSection(newSection)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error) => console.log(error.error.message)
      })
  }

  hideForm() {
    this.hide.emit();
  }
}
