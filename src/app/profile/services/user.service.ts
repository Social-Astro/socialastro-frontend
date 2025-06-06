import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAvatarEdit, UserEmailEdit, UserHeaderEdit, UserPasswordEdit, UserProfileEdit } from './../../interfaces/user';
import { mapUser } from './mappers/user.mapper';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    #http = inject(HttpClient);

    #currentUser = signal<number | undefined>(undefined);

    userSelected = httpResource(() => `users/${this.#currentUser() || 'me'}`, { parse: mapUser });

    setCurrentUser(id?: number) {
        this.#currentUser.set(id);
    }

    saveUserProfile(user: UserProfileEdit): Observable<void> {
        return this.#http.put<void>('users/me', user);
    }

    saveUserPassword(password: UserPasswordEdit): Observable<void> {
        return this.#http.put<void>('users/me/password', password);
    }
    // DONE: implementar en el back los endpoints para el email, el avatar y el header
    saveUserEmail(email: UserEmailEdit): Observable<void> {
        return this.#http.put<void>('users/me/email', email);
    }

    saveUserAvatar(avatar: UserAvatarEdit): Observable<void> {
        return this.#http.put<void>('users/me/avatar', avatar);
    }
    saveUserHeader(heading: UserHeaderEdit): Observable<void> {
        return this.#http.put<void>('users/me/header', heading);
    }
}
