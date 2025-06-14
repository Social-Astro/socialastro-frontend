import { Routes } from '@angular/router';
import { topicsResolver } from '../resolvers/topics.resolver';

export const topicsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./topics-page/topics-page.component').then((t) => t.TopicsPageComponent),
        title: 'Temas ** Social Astro **'
    },
    {
        path: ':id',
        resolve: {
            topic: topicsResolver
        },
        loadComponent: () => import('../sections/sections-page/sections-page.component').then((s) => s.SectionsPageComponent),
    }
];
