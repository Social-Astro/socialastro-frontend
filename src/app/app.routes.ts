import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.routes').then((h) => h.homeRoutes),
    },
    /* { path: '', redirectTo: '/home/topics', pathMatch: 'full' },
    { path: '**', redirectTo: '/home/topics' }, */
];
