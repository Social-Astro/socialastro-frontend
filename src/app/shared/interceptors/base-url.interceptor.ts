import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    // const serverUrl = 'http://localhost:3000';
    const serverUrl = 'http://vps-94333546.vps.ovh.net:8080/socialastroapi';
    const clonedReq = req.clone({
        url: `${serverUrl}/${req.url}`
    });
    return next(clonedReq);
};
