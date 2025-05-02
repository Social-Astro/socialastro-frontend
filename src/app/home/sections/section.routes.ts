import { Routes } from "@angular/router";
import { sectionsResolver } from "../resolvers/sections.resolver";

export const sectionRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./sections-page/sections-page.component').then((t) => t.SectionsPageComponent),
        title: 'Secciones ** Social Astro **'
    },
    {
        path: ':id/add',
        resolve: {
            section: sectionsResolver
        },
        loadComponent: () =>
            import('../posts/posts-form/posts-form.component').then((p) => p.PostsFormComponent),
        title: 'Terraformar ** Social Astro'
    },
    {
        path: ':id',
        resolve: {
            section: sectionsResolver
        },
        loadComponent: () =>
            import('../posts/posts-page/posts-page.component').then((p) => p.PostsPageComponent)
    }
]