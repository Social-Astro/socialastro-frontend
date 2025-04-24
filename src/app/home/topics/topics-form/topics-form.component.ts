import { Component, DestroyRef, inject, output } from '@angular/core';
import { TopicsService } from '../../services/topics.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NewTopic } from '../../interfaces/topics';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'topics-form',
  imports: [ReactiveFormsModule],
  templateUrl: './topics-form.component.html',
  styleUrl: './topics-form.component.scss'
})
export class TopicsFormComponent {
  #topicsService = inject(TopicsService);
  #destroyRef = inject(DestroyRef);
  #fb = inject(NonNullableFormBuilder);

  saved = output<boolean>();

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
          this.saved.emit(true);
        },
        error: (error) => console.log(error.error.message)
      });
  }
}
