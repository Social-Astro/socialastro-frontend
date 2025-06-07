import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const serverUrl = isDevMode() ? 'https://api.socialastro.es/' : 'https://api.socialastro.es/';
    const clonedReq = req.clone({
        url: `${serverUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`
    });
    return next(clonedReq);
};
