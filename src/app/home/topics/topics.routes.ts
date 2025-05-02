import { Routes } from '@angular/router';

export const topicsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./topics-page/topics-page.component').then((t) => t.TopicsPageComponent),
        title: 'Temas ** Social Astro **'
    }
    /*    {
            path: 'add',
            loadComponent: () =>
                import('./topics-form/topics-form.component').then((t) => t.TopicsFormComponent),
            title: 'Nuevo tema ** Social Astro **'
            // TODO: Guard de admin/mod
        },
        {
            path: ':id/edit',
            loadComponent: () =>
                import('./topics-form/topics-form.component').then((t) => t.TopicsFormComponent),
            title: 'Editar tema ** Social Astro **'
            // TODO: Guard de admin/mod. Añadir resolver
        }, */
    // {
    //     path: ':id',
    //     loadComponent: () =>
    //         import('../sections/sections-page/sections-page.component').then((s) => s.SectionsPageComponent),
    //     // TODO: Se le tendrá que pasar el id del topic para que cargue esos elementos de la sección. Title dinámico
    // }
];
