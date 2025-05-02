import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { SectionsService } from '../services/sections.service';
import { Section } from '../interfaces/sections';

export const sectionsResolver: ResolveFn<Section> = (route) => {
    const sectionsService = inject(SectionsService);
    const router = inject(Router);

    return sectionsService.getSection(+route.params['id']).pipe(
        catchError(() => {
            router.navigate(['/home/sections']);
            return EMPTY;
        })
    );
};