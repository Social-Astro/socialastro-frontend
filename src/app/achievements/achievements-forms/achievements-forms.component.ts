import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AchievementService } from '../services/achievements.service';

@Component({
    selector: 'app-achievements-forms',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './achievements-forms.component.html',
    styleUrl: './achievements-forms.component.scss'
})
export class AchievementsFormsComponent {
    #achievementService = inject(AchievementService);
    imageBase64Arr = [] as string[];
    imagePreview: string | ArrayBuffer | null = null;
    achievementForm = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(50)]
        }),
        requisite: new FormControl<number | null>(null, {
            nonNullable: true,
            validators: [Validators.required, Validators.min(1)]
        }),
        image: new FormControl<File | null>(null, {
            validators: [Validators.required]
        })
    });
    #saved = false;
    submitError: string | null = null;

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }
        const file = input.files[0];
        this.achievementForm.get('image')!.setValue(file);
        this.achievementForm.get('image')!.updateValueAndValidity();
        this.fileToBase64(file).then((base64) => {
            this.imageBase64Arr = [base64 as string];
            this.imagePreview = base64;
        });
    }

    private fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    // REVIEW: Vue me ha fallado el subconsciente, mañana lo hago con el (click).
    onSubmit() {
        this.submitError = null;
        if (!this.achievementForm.valid) return;
        const formData = new FormData();
        formData.append('title', this.achievementForm.get('title')?.value!);
        const requisiteValue = this.achievementForm.get('requisite')?.value;
        if (requisiteValue !== null && requisiteValue !== undefined) {
            formData.append('requisite', requisiteValue.toString());
        }
        if (this.achievementForm.get('image')?.value) {
            formData.append('image', this.achievementForm.get('image')?.value!);
        }
        this.#achievementService.create(formData).subscribe({
            next: () => {
                this.#saved = true;
                this.achievementForm.reset();
                this.imageBase64Arr = [];
                this.imagePreview = null;
            },
            error: (err) => {
                this.submitError = 'Error al crear el achievement.';
            }
        });
    }

    resetForm() {
        this.achievementForm.reset();
        this.imageBase64Arr = [];
        this.imagePreview = null;
    }

    canDeactivate() {
        return this.#saved || this.achievementForm.pristine || confirm('¿Deseas salir de la página? Los cambios se perderán.');
    }
}
