import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User, UserLogin } from '../../interfaces/user';
import { SingleUserResponse, TokenResponse } from '../../interfaces/response';
import { mapUser } from '../../profile/services/mappers/user.mapper';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    #http = inject(HttpClient);
    #logged = signal(false);
    #currentUser: User | null = null;

    get logged() {
        return this.#logged.asReadonly();
    }

    constructor() {
        this.isLogged();
    }

    login(data: UserLogin): Observable<void> {
        return this.#http.post<TokenResponse>('auth/login', data).pipe(
            map((resp) => {
                localStorage.setItem('token', resp.accessToken);
                this.#logged.set(true);
            })
        );
    }

    logout(): void {
        this.#logged.set(false);
        localStorage.clear();
    }

    isLogged(): Observable<boolean> {
        if (!this.#logged() && !localStorage.getItem('token')) return of(false);
        if (this.#logged() && localStorage.getItem('token')) return of(true);
        if (!localStorage.getItem('token')) return of(false);
        if (!this.#logged() && localStorage.getItem('token')) {
            return this.#http.get('auth/validate').pipe(
                map(() => {
                    this.#logged.set(true);
                    return true;
                }),
                catchError(() => {
                    localStorage.removeItem('token');
                    return of(false);
                })
            );
        }
        return of(true);
    }

    currentUser = httpResource(() => (this.#logged() ? 'users/me' : undefined), {
        parse: mapUser
    });

    register(user: User): Observable<User> {
        return this.#http.post<SingleUserResponse>('auth/register', user);
    }
}
