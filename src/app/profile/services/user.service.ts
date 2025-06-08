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

    saveUserProfile(user: UserProfileEdit, id: number): Observable<void> {
        return this.#http.put<void>(`users/${id}`, user);
    }

    saveUserPassword(password: UserPasswordEdit, id: number): Observable<void> {
        return this.#http.put<void>(`users/${id}/password`, password);
    }

    saveUserEmail(email: UserEmailEdit, id: number): Observable<void> {
        return this.#http.put<void>(`users/${id}/email`, email);
    }

    saveUserAvatar(avatar: UserAvatarEdit, id: number): Observable<void> {
        return this.#http.put<void>(`users/${id}/avatar`, avatar);
    }
    saveUserHeader(heading: UserHeaderEdit, id: number): Observable<void> {
        return this.#http.put<void>(`users/${id}/header`, heading);
    }
}
