import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TopMenuComponent } from './app/top-menu/top-menu.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { AppComponent } from './app/app.component';

// Comento esto para que no se rompa
/* export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } }
        })
    ]
}; */

// Dejo esto así para que no se rompa, luego lo volvemos a cambiar a lo que tenías tú AppComponent > TopMenuComponent
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
