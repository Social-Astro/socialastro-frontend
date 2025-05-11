import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

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
