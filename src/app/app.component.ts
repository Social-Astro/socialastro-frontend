import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterPageComponent } from './footer/footer-page/footer-page.component';
import { TopMenuPageComponent } from './top-menu/top-menu-page/top-menu-page.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterPageComponent, TopMenuPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'socialastro-frontend';
}
