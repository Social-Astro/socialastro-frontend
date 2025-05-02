import { Routes } from '@angular/router';
// import { numericIdGuard } from '../shared/guards/numeric-id-guard.guard';
// import { UserService } from './services/user.service';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
        title: 'Profile'
    },

    {
        path: ':id',
        // canActivate: [numericIdGuard],
        loadComponent: () => import('./profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
        title: 'Profile'
    }
];
