import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: 'topics',
        loadChildren: () => import('./topics/topics.routes').then((r) => r.topicsRoutes),
        title: 'Temas ** Social Astro'
    },
    {
        path: 'sections',
        loadChildren: () => import('./sections/section.routes').then((s) => s.sectionRoutes)
    },
    {
        path: 'posts',
        loadChildren: () => import('./posts/posts.routes').then((p) => p.postsRoutes)
    },
    { path: '', redirectTo: '/home/topics', pathMatch: 'full' }
];
