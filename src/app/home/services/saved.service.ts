import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { NewPost, Post, PostsResponse, SinglePostResponse } from '../interfaces/post';

@Injectable({
    providedIn: 'root'
})
export class SavedService {
    readonly #postsUrl = 'posts';
    readonly #savedUrl = 'saved';
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
        return this.#http.get<Post>(`${this.#postsUrl}/${id}`)
            .pipe(map((resp) => resp));
    }

    getUserLikes(postId: number) {
        //TODO: Método para recuperar si lo tiene en like o no, devuelve booleano. Hacer lo mismo para los guardados.
    }

    addPost(post: NewPost): Observable<Post> {
        return this.#http.post<Post>(this.#postsUrl, post)
            .pipe(map((resp) => resp));
    }

    editPost(post: NewPost, id: number): Observable<Post> {
        return this.#http.put<Post>(`${this.#postsUrl}/${id}`, post)
            .pipe(map((resp) => resp));
    }

    delete(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#postsUrl}/${id}`);
    }
}