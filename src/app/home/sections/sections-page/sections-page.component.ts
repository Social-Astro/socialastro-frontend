import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { Topic } from '../../interfaces/topics';
import { SectionsService } from '../../services/sections.service';
import { Section } from '../../interfaces/sections';
import { SectionsFormComponent } from '../sections-form/sections-form.component';
import { SectionsCardComponent } from '../sections-card/sections-card.component';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../auth/services/auth.service';
import { ModalErrorComponent } from '../../../shared/modal-error/modal-error.component';

@Component({
    selector: 'sections-page',
    standalone: true,
    imports: [SectionsFormComponent, SectionsCardComponent, ModalErrorComponent],
    templateUrl: './sections-page.component.html',
    styleUrl: './sections-page.component.scss'
})
export class SectionsPageComponent {
    readonly #title = inject(Title);
    readonly #sectionsService = inject(SectionsService);
    readonly #destroyRef = inject(DestroyRef);
    readonly #authService = inject(AuthService);

    actualUser = signal<User | undefined>(undefined);

    topic = input<Topic>();
    showForm = signal(false);

    error = signal<string | null>(null);

    sections = signal<Section[] | undefined>(undefined);

    constructor() {
        effect(() => {
            this.initialize();
            this.actualUser.set(this.#authService.currentUser.value());
        });
    }

    initialize() {
        if (!this.topic()) {
            this.getAllSections();
        } else {
            this.#title.setTitle(this.topic()!.title + ' ** Social Astro');
            this.getSectionsByTopic();
        }
    }

    getAllSections() {
        this.#sectionsService
            .getSections()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
                next: (resp) => {
                    this.sections.set(resp);
                },
                error: () => {
                    this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
                    setTimeout(() => {
                        this.error.set(null);
                    }, 3000);
                }
            });
    }

    getSectionsByTopic() {
        this.#sectionsService
            .getSectionsByTopic(this.topic()!.id)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
                next: (resp) => {
                    this.sections.set(resp);
                },
                error: (error) => {
                    this.error.set("Problema en las comunicaciones, vuélvelo a intentar más tarde...");
                    setTimeout(() => {
                        this.error.set(null);
                    }, 3000);
                }
            });
    }

    showSectionForm() {
        if (this.showForm() === true) this.initialize();
        this.showForm.update((state) => !state);
    }

    deleteSection() {
        this.initialize();
    }
}
