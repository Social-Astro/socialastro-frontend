import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { TopicsService } from '../../services/topics.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NewTopic, Topic } from '../../interfaces/topics';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { NgClass } from '@angular/common';
import { ModalErrorComponent } from '../../../shared/modal-error/modal-error.component';

@Component({
  selector: 'topics-form',
  imports: [ReactiveFormsModule, ValidationClassesDirective, NgClass, ModalErrorComponent],
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

  error = signal<string | null>(null);

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
          error: () => {
            this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
            setTimeout(() => {
              this.error.set(null);
            }, 3000);
          }
        });
    } else {
      this.#topicsService.addTopic(newTopic)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.saved.emit();
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

  hideForm() {
    this.hide.emit();
  }
}
