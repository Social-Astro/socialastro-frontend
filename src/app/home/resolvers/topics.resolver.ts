import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Topic } from '../interfaces/topics';
import { TopicsService } from '../services/topics.service';

export const topicsResolver: ResolveFn<Topic> = (route) => {
    const topicsService = inject(TopicsService);
    const router = inject(Router);

    return topicsService.getTopic(+route.params['id']).pipe(
        catchError(() => {
            router.navigate(['/home/topics']);
            return EMPTY;
        })
    );
};
