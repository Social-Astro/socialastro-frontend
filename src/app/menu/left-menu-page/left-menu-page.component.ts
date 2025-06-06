import { Component, effect, inject, input, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'left-menu-page',
    imports: [RouterLink],
    templateUrl: './left-menu-page.component.html',
    styleUrl: './left-menu-page.component.scss'
})
export class LeftMenuPageComponent {
    private readonly authService = inject(AuthService);

    isLoggedin = this.authService.logged;
    openInput = input(false);
    isMenuOpen = signal(false);

    constructor() {
        effect(() => {
            console.debug("Bienvenido a Social Astro", this.openInput());
            this.isMenuOpen.update((value) => !value);
        })
    }

    openMenu() {
        this.isMenuOpen.set(true);
    }
    closeMenu() {
        this.isMenuOpen.set(false);
    }

    logout() {
        this.authService.logout();
    }

    get isAdmin() {
        const user = this.authService.currentUser.value();
        return user && user.role === 'ADMIN';
    }
}
