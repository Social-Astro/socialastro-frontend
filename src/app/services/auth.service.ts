import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { SingleUserResponse, TokenResponse } from '../interfaces/response';
import { User, UserLogin } from '../interfaces/user';

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
        console.log(localStorage.getItem('token'), this.#logged());
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

    register(user: User): Observable<User> {
        return this.#http.post<SingleUserResponse>('auth/register', user).pipe(map((resp) => resp.user));
    }

    // TODO: #8 Implement from the backend to return the current logged in user
    getCurrentUser(): Observable<User> {
        return this.#http.get<SingleUserResponse>('users/me').pipe(map((response) => response.user));
    }
}
