import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export const loginActivateGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLogged().pipe(
        map((isLogged) => {
            if (!isLogged) return router.createUrlTree(['auth/login']);
            return true;
        })
    );
};
