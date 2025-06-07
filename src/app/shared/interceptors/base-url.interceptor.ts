import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const serverUrl = environment.apiBaseUrl;
    const clonedReq = req.clone({
        url: `${serverUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`
    });
    return next(clonedReq);
};
