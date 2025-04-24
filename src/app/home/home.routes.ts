import { Routes } from "@angular/router";

export const homeRoutes: Routes = [
    {
        path: 'topics',
        loadChildren: () =>
            import('./topics/topics.routes').then((r) => r.topicsRoutes),
        title: 'Temas * Social Astro'
    },
    {
        path: 'sections',
        loadChildren: () =>
            import('./sections/section.routes').then((s) => s.sectionRoutes),
        // TODO: Modificar al ir haciendo. Añadir título en componente
    },
    {
        path: 'posts',
        loadComponent: () =>
            import('./posts/posts.component').then((p) => p.PostsComponent),
        // TODO: Modificar al ir haciendo. Añadir título en componente
    },
    { path: '', redirectTo: '/home/topics', pathMatch: 'full' }
]