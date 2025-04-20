import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        // canActivate: [logoutActivateGuard],
        loadChildren: () => import('./auth/auth.routes').then((m) => m.routes)
    },

    {
        path: 'profile',
        // canActivate: [loginActivateGuard],
        loadChildren: () => import('./profile/profile.routes').then((m) => m.routes)
    },

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: '/home'
    }
];
