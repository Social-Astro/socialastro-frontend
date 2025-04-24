import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { Topic } from '../../interfaces/topics';
import { TopicsService } from '../../services/topics.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'topics-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './topics-card.component.html',
  styleUrl: './topics-card.component.scss'
})
export class TopicsCardComponent {
  #topicsService = inject(TopicsService);
  #destroyRef = inject(DestroyRef);
  #fb = inject(NonNullableFormBuilder);

  topic = input.required<Topic>();
  edit = signal(false);
  deleted = output<void>();

  editForm = this.#fb.group({
    title: ['', [Validators.required]]
  });

  constructor() {
    effect(() => {
      if (this.edit()) {
        this.editForm.get('title')!.setValue(this.topic().title);
      }
    })
  }

  showEditForm() {
    this.edit.update((state) => !state);
  }

  editTitle() {
    this.topic().title = this.editForm.get('title')?.getRawValue();

    this.#topicsService.editTopic(this.topic(), this.topic().id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.showEditForm();
        },
        error: (error) => console.log(error.error.message)
      });
  }

  deleteTopic() {
    this.#topicsService.deleteTopic(this.topic().id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.deleted.emit();
        },
        error: (error) => console.log(error.error.message)
      });
  }
}
