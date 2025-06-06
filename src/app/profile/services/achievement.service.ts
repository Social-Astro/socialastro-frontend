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

    getByUser(userId: number): Observable<any> {
        return this.#http.get<any>(`achievements/user/${userId}`);
    }

    getByAchievement(achievementId: number): Observable<any> {
        return this.#http.get<any>(`achievements/${achievementId}/users`);
    }

    create(userAchievement: any): Observable<any> {
        return this.#http.post<any>('achievements', userAchievement);
    }

    delete(userId: number, achievementId: number): Observable<void> {
        return this.#http.delete<void>(`achievements/${userId}/${achievementId}`);
    }
}
