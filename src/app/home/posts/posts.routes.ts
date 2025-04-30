import { Routes } from "@angular/router";
import { postsResolver } from '../resolvers/posts.resolver';

export const postsRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./posts-page/posts-page.component').then((t) => t.PostsPageComponent),
        title: 'Posts ** Social Astro'
    },
    {
        path: ':id/edit',
        resolve: {
            post: postsResolver
        },
        loadComponent: () =>
            import('./posts-form/posts-form.component').then((p) => p.PostsFormComponent)
    },
    {
        path: ':id',
        resolve: {
            post: postsResolver
        },
        loadComponent: () =>
            import('./posts-detail/posts-detail.component').then((p) => p.PostsDetailComponent)
    }
]