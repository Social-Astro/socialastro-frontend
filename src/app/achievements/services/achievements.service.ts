import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Achievement } from '../interfaces/achievements';
@Injectable({
    providedIn: 'root'
})
export class AchievementService {
    readonly #AchievementUrl = 'achievements';
    readonly #http = inject(HttpClient);

    getSaved(): Observable<Achievement[]> {
        return this.#http.get<Achievement[]>(this.#AchievementUrl).pipe(map((resp) => resp));
    }

    getAchievementByPost(id: number): Observable<Achievement[]> {
        return this.#http.get<Achievement[]>(`${this.#AchievementUrl}/${id}/post`).pipe(map((resp) => resp));
    }

    create(achievement: any): Observable<Achievement> {
        return this.#http.post<Achievement>(this.#AchievementUrl, achievement).pipe(map((resp) => resp));
    }

    deleteAchievement(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#AchievementUrl}/${id}`);
    }

    getAll(): Observable<Achievement[]> {
        return this.#http.get<Achievement[]>(this.#AchievementUrl).pipe(map((resp) => resp));
    }
}
