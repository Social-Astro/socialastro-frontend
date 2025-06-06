import { Routes } from '@angular/router';
import { loginActivateGuard } from './shared/guards/login-activate.guard';
import { logoutActivateGuard } from './shared/guards/logout-activate.guard';

export const routes: Routes = [
    {
        path: 'home',
        canActivate: [loginActivateGuard],
        loadComponent: () => import('./home/home.component').then((h) => h.HomeComponent),
        loadChildren: () => import('./home/home.routes').then((h) => h.homeRoutes)
    },
    {
        path: 'auth',
        canActivate: [logoutActivateGuard],
        loadChildren: () => import('./auth/auth.routes').then((m) => m.routes)
    },

    {
        path: 'profile',
        canActivate: [loginActivateGuard],
        loadChildren: () => import('./profile/profile.routes').then((m) => m.routes)
    },
    {
        path: 'about-us',
        canActivate: [loginActivateGuard],
        loadComponent: () => import('./about-us/about-us.component').then((m) => m.AboutUsComponent),
        title: 'Salu2 terrícola'
    },

    {
        path: 'explorer',
        canActivate: [loginActivateGuard],
        loadComponent: () => import('./explore/explore.component').then((m) => m.ExploreComponent),
        title: 'Explorar hiperespacio'
    },

    {
        path: 'saved',
        canActivate: [loginActivateGuard],
        loadComponent: () => import('./saved/saved.component').then((m) => m.SavedComponent),
        title: 'Estaciones guardadas'
    },

    {
        path: 'chat',
        canActivate: [loginActivateGuard],
        loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
        title: 'Radio Comunicación'
    },

    {
        path: 'achievements',
        canActivate: [loginActivateGuard],
        loadComponent: () => import('./achievements/achievements.component').then((m) => m.AchievementsComponent),
        title: 'Logros galácticos'
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
