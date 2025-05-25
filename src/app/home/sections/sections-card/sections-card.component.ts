import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { SectionsService } from '../../services/sections.service';
import { Section } from '../../interfaces/sections';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SectionsFormComponent } from '../sections-form/sections-form.component';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'sections-card',
  imports: [Popover, ButtonModule, RouterLink, SectionsFormComponent],
  templateUrl: './sections-card.component.html',
  styleUrl: './sections-card.component.scss'
})
export class SectionsCardComponent {
  readonly #sectionsService = inject(SectionsService);
  readonly #destroyRef = inject(DestroyRef);

  section = input.required<Section>();
  actualUser = input.required<User | undefined>();
  topicTitle = '';

  edit = signal(false);
  deleted = output<void>();
  edited = output<void>();

  showEditForm() {
    this.edited.emit();
    this.edit.update((state) => !state);
  }

  deleteSection() {
    this.#sectionsService.deleteSection(this.section().id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.deleted.emit();
        },
        error: (error) => console.log(error.error.message)
      });
  }
}
