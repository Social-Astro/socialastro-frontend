import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewTopic, Topic } from '../interfaces/topics';

@Injectable({
    providedIn: 'root'
})
export class TopicsService {
    readonly #topicsUrl = 'topics';
    readonly #http = inject(HttpClient);

    getTopics(): Observable<Topic[]> {
        return this.#http.get<Topic[]>(this.#topicsUrl)
            .pipe(map((resp) => resp));
    }

    getTopic(id: number): Observable<Topic> {
        return this.#http.get<Topic>(`${this.#topicsUrl}/${id}`)
            .pipe(map((resp) => resp));
    }

    addTopic(topic: NewTopic): Observable<Topic> {
        return this.#http.post<Topic>(this.#topicsUrl, topic)
            .pipe(map((resp) => resp));
    }

    editTopic(topic: NewTopic, id: number): Observable<Topic> {
        return this.#http.put<Topic>(`${this.#topicsUrl}/${id}`, topic)
            .pipe(map((resp) => resp));
    }

    deleteTopic(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#topicsUrl}/${id}`);
    }
}
