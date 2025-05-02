import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { EditPost, NewPost, Post, SinglePostResponse } from '../interfaces/post';

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

    getPostsBySection(id: number) {
        return this.#http.get<Post[]>(`${this.#postsUrl}/${id}/section`)
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