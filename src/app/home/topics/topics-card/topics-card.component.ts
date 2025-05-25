import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { Topic } from '../../interfaces/topics';
import { TopicsService } from '../../services/topics.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { TopicsFormComponent } from '../topics-form/topics-form.component';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'topics-card',
  standalone: true,
  imports: [RouterLink, Popover, ButtonModule, TopicsFormComponent],
  templateUrl: './topics-card.component.html',
  styleUrl: './topics-card.component.scss'
})
export class TopicsCardComponent {
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);

  topic = input.required<Topic>();
  actualUser = input.required<User | undefined>();

  edit = signal(false);
  deleted = output<void>();
  edited = output<void>();

  showEditForm() {
    this.edited.emit();
    this.edit.update((state) => !state);
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
