import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'right-menu-page',
    imports: [],
    templateUrl: './right-menu-page.component.html',
    styleUrl: './right-menu-page.component.scss'
})
export class RightMenuPageComponent {
    private readonly authService = inject(AuthService);

    isLoggedin = this.authService.logged;

    logout() {
        this.authService.logout();
    }
}
