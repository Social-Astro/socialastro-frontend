import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Post } from '../interfaces/post';
import { PostsService } from '../services/posts.service';

export const postsResolver: ResolveFn<Post> = (route) => {
    const postsService = inject(PostsService);
    const router = inject(Router);

    return postsService.getPost(+route.params['id']).pipe(
        catchError(() => {
            router.navigate(['/home/sections']);
            return EMPTY;
        })
    );
};