import { Component, DestroyRef, inject, output } from '@angular/core';
import { TopicsService } from '../../services/topics.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NewTopic } from '../../interfaces/topics';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';

@Component({
  selector: 'topics-form',
  imports: [ReactiveFormsModule, ValidationClassesDirective],
  templateUrl: './topics-form.component.html',
  styleUrl: './topics-form.component.scss'
})
export class TopicsFormComponent {
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(NonNullableFormBuilder);

  saved = output<void>();
  hide = output<void>();

  topicForm = this.#fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  addTopic() {
    const newTopic: NewTopic = {
      ...this.topicForm.getRawValue(),
      image: ''
    };

    this.#topicsService.addTopic(newTopic)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error) => console.log(error.error.message)
      });
  }

  hideForm() {
    this.hide.emit();
  }
}
