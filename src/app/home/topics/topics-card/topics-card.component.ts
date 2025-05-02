import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { Topic } from '../../interfaces/topics';
import { TopicsService } from '../../services/topics.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';

@Component({
  selector: 'topics-card',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, Popover, ButtonModule, ValidationClassesDirective],
  templateUrl: './topics-card.component.html',
  styleUrl: './topics-card.component.scss'
})
export class TopicsCardComponent {
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(NonNullableFormBuilder);

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
    });
  }

  showEditForm() {
    this.edit.update((state) => !state);
  }

  editTitle() {
    this.topic().title = this.editForm.get('title')!.getRawValue();
    console.log(this.topic());

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
