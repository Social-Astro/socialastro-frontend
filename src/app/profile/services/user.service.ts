import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';
import { empty, firstValueFrom, map, Observable } from 'rxjs';
import { User, UserAvatarEdit, UserEmailEdit, UserHeaderEdit, UserPasswordEdit, UserProfileEdit } from './../../interfaces/user';
import { SingleUserResponse } from './../../interfaces/response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    #http = inject(HttpClient);

    #currentUser = signal<number | undefined>(undefined);

    userSelected = resource({
        request: () => ({ currentUser: this.#currentUser() }),
        loader: ({ request }) => {
            return firstValueFrom(this.#http.get<SingleUserResponse>(`users/${request.currentUser ? request.currentUser : 'me'}`));
        }
    });

    setCurrentUser(id?: number) {
        this.#currentUser.set(id);
    }

    saveUserProfile(user: UserProfileEdit): Observable<void> {
        return this.#http.put<void>('users/me', user);
    }

    saveUserPassword(password: UserPasswordEdit): Observable<void> {
        return this.#http.put<void>('users/me/password', password);
    }
    // TODO: implementar en el back los endpoints para el email, el avatar y el header
    saveUserEmail(email: UserEmailEdit): Observable<void> {
        return this.#http.put<void>('users/me/email', email);
    }

    saveUserAvatar(avatar: UserAvatarEdit): Observable<void> {
        return this.#http.put<void>('users/me/avatar', avatar);
    }
    saveUserHeader(header: UserHeaderEdit): Observable<void> {
        return this.#http.put<void>('users/me/header', header);
    }
}
