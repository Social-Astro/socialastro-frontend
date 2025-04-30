import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { NewComment, SingleCommentResponse, Comment } from "../interfaces/comment";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    readonly #commentsUrl = 'comments';
    readonly #http = inject(HttpClient);

    getComments(): Observable<Comment[]> {
        return this.#http.get<Comment[]>(this.#commentsUrl)
            .pipe(map((resp) => resp));
    }

    getCommentsByPost(id: number) {
        return this.#http.get<Comment[]>(`${this.#commentsUrl}/${id}/post`)
            .pipe(map((resp) => resp));
    }

    getComment(id: number): Observable<Comment> {
        return this.#http.get<SingleCommentResponse>(`${this.#commentsUrl}/${id}`)
            .pipe(map((resp) => resp.comment));
    }

    addComment(comment: NewComment): Observable<Comment> {
        return this.#http.post<SingleCommentResponse>(this.#commentsUrl, comment)
            .pipe(map((resp) => resp.comment));
    }

    editComment(comment: NewComment, id: number): Observable<Comment> {
        return this.#http.put<SingleCommentResponse>(`${this.#commentsUrl}/${id}`, comment)
            .pipe(map((resp) => resp.comment));
    }

    deleteComment(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#commentsUrl}/${id}`);
    }
}