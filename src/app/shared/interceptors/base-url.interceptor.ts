import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const serverUrl = isDevMode() ? 'http://localhost:3000/' : 'https://vps-94333546.vps.ovh.net:8080/socialastroapi';
    const clonedReq = req.clone({
        url: `${serverUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`
    });
    return next(clonedReq);
};
