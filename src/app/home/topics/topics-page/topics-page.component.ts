import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { TopicsCardComponent } from '../topics-card/topics-card.component';
import { TopicsService } from '../../services/topics.service';
import { Topic } from '../../interfaces/topics';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TopicsFormComponent } from '../topics-form/topics-form.component';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../auth/services/auth.service';
import { ModalErrorComponent } from '../../../shared/modal-error/modal-error.component';

@Component({
    selector: 'topics-page',
    standalone: true,
    imports: [TopicsCardComponent, TopicsFormComponent, ModalErrorComponent],
    templateUrl: './topics-page.component.html',
    styleUrl: './topics-page.component.scss'
})
export class TopicsPageComponent {
    readonly #topicsService = inject(TopicsService);
    readonly #destroyRef = inject(DestroyRef);
    readonly #authService = inject(AuthService);

    actualUser = signal<User | undefined>(undefined);
    error = signal<string | null>(null);

    topics = signal<Topic[]>([]);
    showForm = signal(false);

    constructor() {
        this.getTopics();
        effect(() => {
            this.actualUser.set(this.#authService.currentUser.value());
        });
    }

    showTopicsForm() {
        if (this.showForm()) this.getTopics();
        this.showForm.update((state) => !state);
    }

    getTopics() {
        this.#topicsService
            .getTopics()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
                next: (resp) => {
                    this.topics.set(resp);
                },
                error: () => {
                    this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
                    setTimeout(() => {
                        this.error.set(null);
                    }, 3000);
                }
            });
    }

    deleteTopic(topic: Topic) {
        this.topics.update((topics) => topics.filter((t) => t !== topic));
    }
}
