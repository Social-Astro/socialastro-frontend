import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const numericIdGuard =
    (paramId: string): CanActivateFn =>
    (route) => {
        const id = +route.params[paramId];
        const router = inject(Router);
        if (isNaN(id) || id < 1) {
            return router.createUrlTree(['/']);
        }
        return true;
    };
