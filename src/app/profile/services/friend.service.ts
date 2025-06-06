import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FriendService {
    #http = inject(HttpClient);

    getAll(): Observable<any[]> {
        return this.#http.get<any[]>('friends');
    }

    getById(requester: number, requested: number): Observable<any> {
        return this.#http.get<any>(`friends/${requester}/${requested}`);
    }

    getUserWithFriends(userId: number): Observable<any> {
        return this.#http.get<any>(`friends/user/${userId}`);
    }

    create(friend: any): Observable<any> {
        return this.#http.post<any>('friends', friend);
    }

    delete(requester: number, requested: number): Observable<void> {
        return this.#http.delete<void>(`friends/${requester}/${requested}`);
    }
}
