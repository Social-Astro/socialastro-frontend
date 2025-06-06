import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'left-menu-page',
    imports: [],
    templateUrl: './left-menu-page.component.html',
    styleUrl: './left-menu-page.component.scss'
})
export class LeftMenuPageComponent {
    private readonly authService = inject(AuthService);

    isLoggedin = this.authService.logged;

    // REVIEW: Controla la visibilidad del menú en móviles
    isMenuOpen = false;

    openMenu() {
        this.isMenuOpen = true;
    }
    closeMenu() {
        this.isMenuOpen = false;
    }

    logout() {
        this.authService.logout();
    }

    get isAdmin() {
        const user = this.authService.currentUser.value();
        return user && user.role === 'ADMIN';
    }
}
