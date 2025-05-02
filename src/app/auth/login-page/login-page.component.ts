import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';

@Component({
    selector: 'login-page',
    imports: [RouterLink, FormsModule, ReactiveFormsModule, ValidationClassesDirective],
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

    login() {
        const newLoggin = {
            username: this.loginForm.value.username!,
            password: this.loginForm.value.password!
        };
        console.log('Login:', newLoggin);
        `
        `;
        if (this.loginForm.valid) {
            this.#authService.login(newLoggin).subscribe({
                next: () => {
                    this.saved = true;
                    console.log('%cLogin exitoso', 'color: green;');
                    this.#router.navigate(['/home']);
                },
                error: (err) => console.error('Login error:', err)
            });
        } else {
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
