import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { sameValue } from '../../utils/same-value.validator';
import { AuthService } from '../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-register-page',
    imports: [FormsModule, ReactiveFormsModule, ValidationClassesDirective],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
    #authService = inject(AuthService);
    #router = inject(Router);
    declare imageBase64: string;

    newUserForm = new FormGroup({
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(5)]
        }),
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        }),
        confirmEmail: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email, sameValue('email', 'confirmEmail')]
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(4)]
        })
    });

    #saved = false;

    register() {
        if (!this.newUserForm.valid) return;
        const user: User = {
            ...this.newUserForm.getRawValue(),
            createdAt: new Date(),
            role: 'USER'
        };
        this.#authService.register(user).subscribe({
            next: () => {
                this.#saved = true;
                this.#router.navigate(['/auth/login']);
            },
            error: (err) => console.error('Registration error:', err)
        });
    }

    resetForm() {
        this.newUserForm.reset();
    }

    canDeactivate() {
        return this.#saved || this.newUserForm.pristine || confirm('Do you want to leave the page? Changes will be lost.');
    }
}
