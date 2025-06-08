import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { signal } from '@angular/core';
import { ModalErrorComponent } from '../../shared/modal-error/modal-error.component';

@Component({
    selector: 'login-page',
    imports: [RouterLink, FormsModule, ReactiveFormsModule, ValidationClassesDirective, ModalErrorComponent],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
    #authService = inject(AuthService);
    #router = inject(Router);

    loginForm = new FormGroup({
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    loginError = signal<string | null>(null);

    login() {
        this.loginError.set(null);
        const newLoggin = {
            username: this.loginForm.value.username!,
            password: this.loginForm.value.password!
        };

        if (this.loginForm.valid) {
            this.#authService.login(newLoggin).subscribe({
                next: () => {
                    this.saved = true;
                    this.#router.navigate(['/home']);
                },
                error: (err) => {
                    console.error('Login error:', err);
                    if (err.status === 401) {
                        this.loginError.set('¿Estás seguro de que te has montado en tu nave...?');
                    } else {
                        this.loginError.set('Woops, esto es embarazoso. Es culpa nuestra..');
                    }
                }
            });
        } else {
            this.loginError.set('Escribe bien... es humano no extraterrestre.');
            console.error('Formulario inválido');
        }
    }

    private saved = false;

    resetForm() {
        this.loginForm.reset();
        this.saved = false;
    }

    canDeactivate() {
        return this.saved || this.loginForm.pristine || confirm('¿De verdad quieres salir? Vas a perder los datos.');
    }
}
