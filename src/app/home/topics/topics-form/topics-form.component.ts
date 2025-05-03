import { Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { TopicsService } from '../../services/topics.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NewTopic, Topic } from '../../interfaces/topics';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'topics-form',
  imports: [ReactiveFormsModule, ValidationClassesDirective, NgClass],
  templateUrl: './topics-form.component.html',
  styleUrl: './topics-form.component.scss'
})
export class TopicsFormComponent {
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(NonNullableFormBuilder);

  topic = input<Topic>();

  saved = output<void>();
  hide = output<void>();

  partial = false;

  topicForm = this.#fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  constructor() {
    effect(() => {
      if (this.topic()) {
        this.topicForm.get('title')!.setValue(this.topic()!.title);
        this.topicForm.get('description')!.setValue(this.topic()!.description);
        this.partial = true;
        console.log(this.partial);
      }
    })
  }

  sendTopic() {
    const newTopic: NewTopic = {
      ...this.topicForm.getRawValue(),
      image: ''
    };

    if (this.partial) {
      this.#topicsService.editTopic(newTopic, this.topic()!.id)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.saved.emit();
          },
          error: (error) => console.log(error.error.message)
        });
    } else {
      this.#topicsService.addTopic(newTopic)
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
