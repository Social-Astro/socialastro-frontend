import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Notification } from "../interfaces/notification";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    readonly #notifsUrl = 'notifications';
    readonly #http = inject(HttpClient);

    getAll(): Observable<Notification[]> {
        return this.#http.get<Notification[]>(this.#notifsUrl)
            .pipe(map((resp) => resp));
    }
}