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
        image: new FormControl<string | null>(null, {
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
        this.fileToBase64(file).then((base64) => {
            this.achievementForm.get('image')!.setValue(base64 as string);
            this.achievementForm.get('image')!.updateValueAndValidity();
            this.imageBase64Arr = [base64 as string];
            this.imagePreview = base64;
        });
    }

    async onAvatarFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }
        const file = input.files[0];
        const base64 = await this.fileToBase64(file);
        this.achievementForm.get('image')!.setValue(base64 as string);
        this.achievementForm.get('image')!.updateValueAndValidity();
        this.imageBase64Arr = [base64 as string];
        this.imagePreview = base64;
    }

    onSubmit() {
        this.submitError = null;
        if (!this.achievementForm.valid) return;
        const title = this.achievementForm.get('title')?.value!;
        const requisite = this.achievementForm.get('requisite')?.value!;
        const imageBase64 = this.achievementForm.get('image')?.value!;
        const achievement = {
            title,
            requisite,
            image: imageBase64
        };
        this.#achievementService.create(achievement).subscribe({
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

    private fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}
