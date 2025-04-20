import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login-page/login-page.component').then((m) => m.LoginPageComponent),
        title: 'Login'
    },

    {
        path: 'register',
        loadComponent: () => import('./register-page/register-page.component').then((m) => m.RegisterPageComponent),
        title: 'Register'
    }
];
