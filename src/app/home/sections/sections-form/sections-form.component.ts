import { Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { NgModel, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { SectionsService } from '../../services/sections.service';
import { NewSection } from '../../interfaces/sections';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Topic } from '../../interfaces/topics';
import { TopicsService } from '../../services/topics.service';

@Component({
  selector: 'sections-form',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationClassesDirective],
  templateUrl: './sections-form.component.html',
  styleUrl: './sections-form.component.scss'
})
export class SectionsFormComponent {
  readonly #sectionsService = inject(SectionsService);
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(NonNullableFormBuilder);

  topic = input.required<Topic>();
  allTopics: Topic[] = [];

  saved = output<void>();
  hide = output<void>();

  sectionForm = this.#fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  addSection() {
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
