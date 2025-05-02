import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'left-menu-page',
    imports: [],
    templateUrl: './left-menu-page.component.html',
    styleUrl: './left-menu-page.component.scss'
})
export class LeftMenuPageComponent {
    private readonly authService = inject(AuthService);

    isLoggedin = this.authService.logged;

    logout() {
        this.authService.logout();
    }
}
