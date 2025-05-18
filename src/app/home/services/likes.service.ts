import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { NewPost, Post, PostsResponse, SinglePostResponse } from '../interfaces/post';
import { Likes } from "../interfaces/Likes";

@Injectable({
    providedIn: 'root'
})
export class LikesService {
    readonly #likesUrl = 'likes';
    readonly #http = inject(HttpClient);

    getLikes(): Observable<Likes[]> {
        return this.#http.get<Likes[]>(this.#likesUrl)
            .pipe(map((resp) => resp));
    }

    getLikesByUser(id: number): Observable<Likes[]> {
        return this.#http.get<Likes[]>(`${this.#likesUrl}/${id}/user`)
            .pipe(map((resp) => resp));
    }

    getLikesByPost(id: number): Observable<Likes[]> {
        return this.#http.get<Likes[]>(`${this.#likesUrl}/${id}/post`)
            .pipe(map((resp) => resp));
    }

    addLike(post: Post): Observable<Likes> {
        return this.#http.post<Likes>(this.#likesUrl, post)
            .pipe(map((resp) => resp));
    }

    deleteLike(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#likesUrl}/${id}`);
    }
}