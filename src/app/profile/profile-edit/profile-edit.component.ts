import { Component, inject, computed, effect, input, numberAttribute, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { sameValue } from '../../utils/same-value.validator';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'profile-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
    private readonly profileService = inject(UserService);
    userResource = this.profileService.userSelected;
    readonly user = this.userResource.value;
    id = input.required({ transform: numberAttribute });

    avatarBase64: string | null = null;
    headerBase64: string | null = null;

    changeUserForm = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        bio: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    changeEmailForm = new FormGroup({
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        }),
        email2: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email, sameValue('email', 'email2')]
        })
    });

    changePasswordForm = new FormGroup({
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(4)]
        }),
        password2: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(4), sameValue('password', 'password2')]
        })
    });

    changeAvatarForm = new FormGroup({
        avatar: new FormControl<File | null>(null, {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    changeHeaderForm = new FormGroup({
        header: new FormControl<File | null>(null, {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    showUserForm = false;
    showEmailForm = false;
    showPasswordForm = false;
    showAvatarForm = false;
    showHeaderForm = false;

    changeUser() {
        if (!this.changeUserForm.valid) return;
        const updatedAt = new Date();
        const user = {
            ...this.changeUserForm.getRawValue(),
            updatedAt
        };
        this.profileService.saveUserProfile(user).subscribe({
            next: () => {
                this.userResource.reload();
            },
            error: (err) => console.error('Edit error:', err)
        });
    }

    changeEmail() {
        if (!this.changeEmailForm.valid) return;
        const dto = {
            email: this.changeEmailForm.value.email!
        };
        this.profileService.saveUserEmail(dto).subscribe({
            next: () => {
                this.userResource.reload();
            },
            error: (err) => console.error('Email error:', err)
        });
    }

    changePassword() {
        if (!this.changePasswordForm.valid) return;
        const dto = {
            password: this.changePasswordForm.value.password!
        };
        this.profileService.saveUserPassword(dto).subscribe({
            next: () => {},
            error: (err) => console.error('Password error:', err)
        });
    }

    onAvatarFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.changeAvatarForm.get('avatar')!.setValue(file);
            this.fileToBase64(file).then((base64) => {
                this.avatarBase64 = base64 as string;
            });
        }
    }

    onHeaderFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.changeHeaderForm.get('header')!.setValue(file);
            this.fileToBase64(file).then((base64) => {
                this.headerBase64 = base64 as string;
            });
        }
    }

    private fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    changeAvatar() {
        if (!this.changeAvatarForm.valid || !this.avatarBase64) return;
        const dto = { avatar: this.avatarBase64 };
        this.profileService.saveUserAvatar(dto).subscribe({
            next: () => {
                this.userResource.reload();
                this.avatarBase64 = null;
                this.changeAvatarForm.reset();
            },
            error: (err) => console.error('Avatar error:', err)
        });
    }

    changeHeader() {
        if (!this.changeHeaderForm.valid || !this.headerBase64) return;
        const dto = { header: this.headerBase64 };
        this.profileService.saveUserHeader(dto).subscribe({
            next: () => {
                this.userResource.reload();
                this.headerBase64 = null;
                this.changeHeaderForm.reset();
            },
            error: (err) => console.error('Header error:', err)
        });
    }

    preloadEditFields() {
        const user = this.userResource.value();
        if (user) {
            this.changeUserForm.patchValue({
                name: user.name || '',
                bio: user.bio || ''
            });
            this.changeEmailForm.patchValue({
                email: user.email || '',
                email2: user.email || ''
            });
        }
    }
}
