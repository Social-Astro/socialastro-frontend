import { Component, inject, computed, effect, input, numberAttribute, signal, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { sameValue } from '../../utils/same-value.validator';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'profile-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
    private readonly profileService = inject(UserService);
    userResource = this.profileService.userSelected;
    readonly user = this.userResource.value;
    id = input.required({ transform: numberAttribute });

    readonly avatarBase64Arr = signal<string[]>([]);
    readonly headerBase64Arr = signal<string[]>([]);

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
        heading: new FormControl<File | null>(null, {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    showUserForm = false;
    showEmailForm = false;
    showPasswordForm = false;
    showAvatarForm = false;
    showHeaderForm = false;

    private cdr = inject(ChangeDetectorRef);

    changeUser() {
        if (!this.changeUserForm.valid) return;
        const dto = {
            name: this.changeUserForm.value.name!,
            bio: this.changeUserForm.value.bio!,
            updatedAt: new Date()
        };
        this.profileService.saveUserProfile(dto, this.id()).subscribe({
            next: () => {
                this.userResource.reload();
                this.showUserForm = false;
                this.cdr.detectChanges();
            },
            error: (err) => console.error('User error:', err)
        });
    }

    changeEmail() {
        if (!this.changeEmailForm.valid) return;
        const dto = {
            email: this.changeEmailForm.value.email!
        };
        this.profileService.saveUserEmail(dto, this.id()).subscribe({
            next: () => {
                this.userResource.reload();
                this.showEmailForm = false;
                this.cdr.detectChanges();
            },
            error: (err) => console.error('Email error:', err)
        });
    }

    changePassword() {
        if (!this.changePasswordForm.valid) return;
        const dto = {
            password: this.changePasswordForm.value.password!
        };
        this.profileService.saveUserPassword(dto, this.id()).subscribe({
            next: () => {
                console.log('Password changed successfully');
                this.showPasswordForm = false;
                this.cdr.detectChanges();
            },
            error: (err) => console.error('Password error:', err)
        });
    }

    async onAvatarFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }

        const avatarBase64Arr: string[] = [];

        for (const file of Array.from(input.files)) {
            this.changeAvatarForm.get('avatar')!.setValue(file);
            const base64 = await this.fileToBase64(file);
            console.log('Base64:', base64?.slice(0, 30));
            avatarBase64Arr.push(base64 as string);
        }

        this.avatarBase64Arr.set(avatarBase64Arr);
    }

    async onHeaderFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }

        const headerBase64Arr: string[] = [];

        for (const file of Array.from(input.files)) {
            this.changeHeaderForm.get('heading')!.setValue(file);
            const base64 = await this.fileToBase64(file);
            console.log('Header Base64:', base64?.slice(0, 30));
            headerBase64Arr.push(base64 as string);
        }

        this.headerBase64Arr.set(headerBase64Arr);
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
        if (!this.changeAvatarForm.valid || !this.avatarBase64Arr().length) return;
        const dto = { avatar: this.avatarBase64Arr()[0] };
        this.profileService.saveUserAvatar(dto, this.id()).subscribe({
            next: () => {
                this.userResource.reload();
                this.avatarBase64Arr.set([]);
                this.changeAvatarForm.reset();
                this.showAvatarForm = false;
                this.cdr.detectChanges();
            },
            error: (err) => console.error('Avatar error:', err)
        });
    }

    changeHeader() {
        if (!this.changeHeaderForm.valid || !this.headerBase64Arr().length) return;
        const dto = { heading: this.headerBase64Arr()[0] };
        this.profileService.saveUserHeader(dto, this.id()).subscribe({
            next: () => {
                this.userResource.reload();
                this.headerBase64Arr.set([]);
                this.changeHeaderForm.reset();
                this.showHeaderForm = false;
                this.cdr.detectChanges();
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
