import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { SectionsService } from '../../services/sections.service';
import { NewSection, Section } from '../../interfaces/sections';
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

  topic = input<Topic>();
  allTopics: Topic[] = [];

  section = input<Section>();

  showSelect = signal(false);
  saved = output<void>();
  hide = output<void>();

  partial = false;

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

      if (this.section()) {
        this.sectionForm.get('title')!.setValue(this.section()!.title);
        this.sectionForm.get('description')!.setValue(this.section()!.description);
        this.partial = true;
      }
    })
  }

  async sendSection() {
    const actualTopic = this.topic() ? this.topic() : this.allTopics.find((f) => f.id === +this.sectionForm.get('topic')!.getRawValue());

    const newSection: NewSection = {
      title: this.sectionForm.get('title')!.getRawValue(),
      description: this.sectionForm.get('description')!.getRawValue(),
      image: '',
      topic: actualTopic!
    };

    if (this.partial) {
      this.#sectionsService.editSection(newSection, this.section()!.id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.saved.emit();
          },
          error: (error) => console.log(error.error.message)
        })
    } else {
      this.#sectionsService.addSection(newSection)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.saved.emit();
          },
          error: (error) => console.log(error.error.message)
        });
    }
  }

  hideForm() {
    this.hide.emit();
  }
}
