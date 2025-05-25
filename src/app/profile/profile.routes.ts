import { Routes } from '@angular/router';
import { numericIdGuard } from '../shared/guards/numeric-id.guard';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./profile.component').then((m) => m.ProfileComponent),
        title: 'Profile'
    },

    {
        path: ':userId',
        canActivate: [numericIdGuard('userId')],
        loadComponent: () => import('./profile.component').then((m) => m.ProfileComponent),
        title: 'Profile'
    }
];
