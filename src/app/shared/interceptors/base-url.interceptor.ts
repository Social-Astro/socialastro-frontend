import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    /* const serverUrl = process.env['URL_BACKEND']; */
    const serverUrl = 'http://localhost:3000';
    const clonedReq = req.clone({
        url: `${serverUrl}/${req.url}`
    });
    return next(clonedReq);
};
