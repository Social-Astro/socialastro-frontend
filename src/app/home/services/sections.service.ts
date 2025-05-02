import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewSection, Section, SingleSectionResponse } from '../interfaces/sections';

@Injectable({
    providedIn: 'root'
})
export class SectionsService {
    readonly #sectionsUrl = 'sections';
    readonly #http = inject(HttpClient);

    getSections(): Observable<Section[]> {
        return this.#http.get<Section[]>(this.#sectionsUrl)
            .pipe(map((resp) => resp));
    }

    getSectionsByTopic(id: number) {
        return this.#http.get<Section[]>(`${this.#sectionsUrl}/${id}/topic`)
            .pipe(map((resp) => resp));
    }

    getSection(id: number): Observable<Section> {
        return this.#http.get<Section>(`${this.#sectionsUrl}/${id}`)
            .pipe(map((resp) => resp));
    }

    addSection(section: NewSection): Observable<Section> {
        return this.#http.post<SingleSectionResponse>(this.#sectionsUrl, section)
            .pipe(map((resp) => resp.section));
    }

    editSection(section: NewSection, id: number): Observable<Section> {
        return this.#http.put<SingleSectionResponse>(`${this.#sectionsUrl}/${id}`, section)
            .pipe(map((resp) => resp.section));
    }

    deleteSection(id: number): Observable<void> {
        return this.#http.delete<void>(`${this.#sectionsUrl}/${id}`);
    }
}
