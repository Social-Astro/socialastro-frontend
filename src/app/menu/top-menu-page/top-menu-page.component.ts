import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'top-menu-page',
    imports: [RouterLink],
    templateUrl: './top-menu-page.component.html',
    styleUrl: './top-menu-page.component.scss'
})
export class TopMenuPageComponent {
    private readonly authService = inject(AuthService);

    isLoggedin = this.authService.logged;

    // REVIEW: Comunicación con el menú lateral (quiero ponerle botones más bonitos, pero tengo sueño)
    openLeftMenu() {
        const leftMenu = document.querySelector('left-menu-page') as any;
        if (leftMenu && typeof leftMenu.openMenu === 'function') {
            leftMenu.openMenu();
        }
    }

    logout() {
        this.authService.logout();
    }
}
