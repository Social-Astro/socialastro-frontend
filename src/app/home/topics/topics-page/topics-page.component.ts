import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { TopicsCardComponent } from '../topics-card/topics-card.component';
import { TopicsService } from '../../services/topics.service';
import { Topic } from '../../interfaces/topics';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'topics-page',
  imports: [TopicsCardComponent],
  templateUrl: './topics-page.component.html',
  styleUrl: './topics-page.component.scss'
})
export class TopicsPageComponent {
  readonly #topicsService = inject(TopicsService);
  readonly #destroyRef = inject(DestroyRef);

  topics = signal<Topic[]>([]);

  constructor() {
    this.getTopics(); //TODO: Hacerlo reactivo. Tendré que mover el form a dentro de este componente. Hacer más adelante cuanto tenga más claro el diseño
    console.log("Topics: ", this.topics());
  }

  getTopics() {
    this.#topicsService.getTopics()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((resp) => {
        this.topics.set(resp);
      });
  }

  deleteTopic(topic: Topic) {
    this.topics.update((topics) => topics.filter((t) => t !== topic));
  }

}
