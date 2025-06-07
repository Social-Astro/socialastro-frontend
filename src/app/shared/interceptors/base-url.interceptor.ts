import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const serverUrl = isDevMode() ? 'http://localhost:3000/' : 'https://api.socialastro.es/';
    const clonedReq = req.clone({
        url: `${serverUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`
    });
    return next(clonedReq);
};
