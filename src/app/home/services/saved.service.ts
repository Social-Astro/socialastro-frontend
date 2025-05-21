import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Post } from '../interfaces/post';
import { Saved } from "../interfaces/saved";

@Injectable({
    providedIn: 'root'
})
export class SavedService {
    readonly #savedUrl = 'saved';
    readonly #http = inject(HttpClient);

    getSaved(): Observable<Saved[]> {
        return this.#http.get<Saved[]>(this.#savedUrl)
            .pipe(map((resp) => resp));
    }

    getSavedByUser(id: number): Observable<Saved[]> {
        return this.#http.get<Saved[]>(`${this.#savedUrl}/${id}/user`)
            .pipe(map((resp) => resp));
    }

    getSavedByPost(id: number): Observable<Saved[]> {
        return this.#http.get<Saved[]>(`${this.#savedUrl}/${id}/post`)
            .pipe(map((resp) => resp));
    }

    addSaved(post: Post): Observable<Saved> {
        return this.#http.post<Saved>(this.#savedUrl, post)
            .pipe(map((resp) => resp));
    }

    deleteSaved(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#savedUrl}/${id}`);
    }
}