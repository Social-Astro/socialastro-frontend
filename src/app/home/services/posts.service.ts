import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { NewPost, Post, PostsResponse, SinglePostResponse } from '../interfaces/post';
import { rxResource } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    readonly #postsUrl = 'posts';
    readonly #http = inject(HttpClient);

    getPosts(): Observable<Post[]> {
        return this.#http.get<Post[]>(this.#postsUrl)
            .pipe(map((resp) => resp));
    }

    getPostsBySection(id: number, search: string, page: number = 1): Observable<PostsResponse> {
        let params = new URLSearchParams({ search, page: String(page) });

        return this.#http.get<PostsResponse>(`${this.#postsUrl}/${id}/section?${params.toString()}`)
            .pipe(map((resp) => resp));
    }

    getPostsByUser(id: number, page: number = 1) {
        let params = new URLSearchParams({ page: String(page) });

        return this.#http.get<PostsResponse>(`${this.#postsUrl}/user/${id}?${params.toString()}`)
            .pipe(map((resp) => resp));
    }

    getPostsByTag(tag: string) {
        let params = new URLSearchParams({ tag: tag });

        return this.#http.get<Post[]>(`${this.#postsUrl}/tag?${params.toString()}`)
            .pipe(map((resp) => resp));
    }

    getPost(id: number): Observable<Post> {
        return this.#http.get<Post>(`${this.#postsUrl}/${id}`)
            .pipe(map((resp) => resp));
    }

    addPost(post: NewPost): Observable<Post> {
        return this.#http.post<Post>(this.#postsUrl, post)
            .pipe(map((resp) => resp));
    }

    editPost(post: NewPost, id: number): Observable<Post> {
        return this.#http.put<Post>(`${this.#postsUrl}/${id}`, post)
            .pipe(map((resp) => resp));
    }

    deletePost(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#postsUrl}/${id}`);
    }
}