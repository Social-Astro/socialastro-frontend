import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { FooterPageComponent } from './footer/footer-page/footer-page.component';
import { LeftMenuPageComponent } from './menu/left-menu-page/left-menu-page.component';
import { TopMenuPageComponent } from './menu/top-menu-page/top-menu-page.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterPageComponent, TopMenuPageComponent, LeftMenuPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'socialastro-frontend';

    private readonly authService = inject(AuthService);

    isLoggedin = this.authService.logged;

    logout() {
        this.authService.logout();
    }
}
