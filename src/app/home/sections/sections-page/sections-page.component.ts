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

@Component({
    selector: 'sections-page',
    standalone: true,
    imports: [SectionsFormComponent, SectionsCardComponent],
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

    sections = signal<Section[] | undefined>(undefined);

    constructor() {
        effect(() => {
            this.initialize();
            //TODO: Necesita recargar para verse
            this.actualUser.set(this.#authService.currentUser.value());
            console.log('USER: ', this.actualUser());
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
                error: (error) => console.log(error.error.message)
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
                error: (error) => console.log(error.error.message)
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
