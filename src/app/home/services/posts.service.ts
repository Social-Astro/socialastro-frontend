import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { NewPost, Post, PostsResponse, SinglePostResponse } from '../interfaces/post';

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

    getPost(id: number): Observable<Post> {
        return this.#http.get<SinglePostResponse>(`${this.#postsUrl}/${id}`)
            .pipe(map((resp) => resp.post));
    }

    addPost(post: NewPost): Observable<Post> {
        return this.#http.post<SinglePostResponse>(this.#postsUrl, post)
            .pipe(map((resp) => resp.post));
    }

    editPost(post: NewPost, id: number): Observable<Post> {
        return this.#http.put<SinglePostResponse>(`${this.#postsUrl}/${id}`, post)
            .pipe(map((resp) => resp.post));
    }

    deletePost(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#postsUrl}/${id}`);
    }
}