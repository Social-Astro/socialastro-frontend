import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./profile.component').then((m) => m.ProfileComponent),
        title: 'Profile'
    },

    {
        path: ':id',
        // canActivate: [numericIdGuard],
        loadComponent: () => import('./profile.component').then((m) => m.ProfileComponent),
        title: 'Profile'
    }
];
