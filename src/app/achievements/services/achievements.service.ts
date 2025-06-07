import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AchievementService {
    #http = inject(HttpClient);

    getAll(): Observable<any[]> {
        return this.#http.get<any[]>('achievements');
    }

    getById(requester: number, requested: number): Observable<any> {
        return this.#http.get<any>(`achievements/${requester}/${requested}`);
    }

    getUserWithAchievements(userId: number): Observable<any> {
        return this.#http.get<any>(`achievements/user/${userId}`);
    }

    create(achievement: any): Observable<any> {
        return this.#http.post<any>('achievements', achievement);
    }

    delete(requester: number, requested: number): Observable<void> {
        return this.#http.delete<void>(`achievements/${requester}/${requested}`);
    }
}
