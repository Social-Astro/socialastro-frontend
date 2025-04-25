import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((h) => h.HomeComponent),
        loadChildren: () => import('./home/home.routes').then((h) => h.homeRoutes)
    },
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
/* { path: '', redirectTo: '/home/topics', pathMatch: 'full' },
{ path: '**', redirectTo: '/home/topics' }, */
