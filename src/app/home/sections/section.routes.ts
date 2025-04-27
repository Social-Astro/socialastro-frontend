import { Routes } from "@angular/router";

export const sectionRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./sections-page/sections-page.component').then((t) => t.SectionsPageComponent),
        title: 'Secciones ** Social Astro **'
    },
]