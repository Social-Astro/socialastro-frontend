import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { TopicsCardComponent } from '../topics-card/topics-card.component';
import { TopicsService } from '../../services/topics.service';
import { Topic } from '../../interfaces/topics';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TopicsFormComponent } from '../topics-form/topics-form.component';
import { UserService } from '../../../profile/services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'topics-page',
  imports: [TopicsCardComponent, TopicsFormComponent],
  templateUrl: './topics-page.component.html',
  styleUrl: './topics-page.component.scss'
})
export class TopicsPageComponent {
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #userService = inject(UserService);

  actualUser = signal<User | undefined>(undefined);

  topics = signal<Topic[]>([]);
  showForm = signal(false);

  constructor() {
    this.getTopics();
    // TODO: No lo pilla al momento
    effect(() => {
      this.actualUser.set(this.#userService.userSelected.value());
      console.log('USER: ', this.actualUser());
    })
  }

  showTopicsForm() {
    if (this.showForm())
      this.getTopics();
    this.showForm.update((state) => !state);
  }

  getTopics() {
    this.#topicsService.getTopics()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (resp) => {
          this.topics.set(resp);
        },
        error: (error) => {
          console.log(error.error.message);
        }
      });
  }

  deleteTopic(topic: Topic) {
    this.topics.update((topics) => topics.filter((t) => t !== topic));
  }

}
