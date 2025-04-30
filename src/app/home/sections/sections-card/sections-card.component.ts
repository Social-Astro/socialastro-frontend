import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationClassesDirective } from '../../../shared/directives/validation-classes.directive';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { SectionsService } from '../../services/sections.service';
import { NewSection, Section } from '../../interfaces/sections';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sections-card',
  imports: [ReactiveFormsModule, ValidationClassesDirective, Popover, ButtonModule, RouterLink],
  templateUrl: './sections-card.component.html',
  styleUrl: './sections-card.component.scss'
})
export class SectionsCardComponent {
  readonly #sectionsService = inject(SectionsService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #fb = inject(FormBuilder);

  section = input.required<Section>();
  topicTitle = '';

  edit = signal(false);
  deleted = output<void>();
  edited = output<void>();

  editForm = this.#fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  constructor() {
    effect(() => {
      if (this.edit()) {
        this.editForm.get('title')!.setValue(this.section().title);
        this.editForm.get('description')!.setValue(this.section().description);
      }
    });
  }

  showEditForm() {
    this.edit.update((state) => !state);
  }

  editSection() {
    const updatedSection: NewSection = {
      title: this.editForm.get('title')?.getRawValue(),
      description: this.editForm.get('description')?.getRawValue(),
      image: '',
      topic: this.section().topic
    };

    this.#sectionsService.editSection(updatedSection, this.section().id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (resp) => {
          this.edited.emit();
          this.showEditForm();
          console.log(resp);
        },
        error: (error) => console.log(error.error.message)
      })
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
