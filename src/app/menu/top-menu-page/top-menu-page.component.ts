import { Component, inject, output } from '@angular/core';
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
    openMenuMobile = output<void>();

    openLeftMenu() {
        const leftMenu = document.querySelector('left-menu-page');

        if (leftMenu) {
            this.openMenuMobile.emit();
        }
    }

    logout() {
        this.authService.logout();
    }
}
