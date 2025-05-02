import { Topic } from "./topics";

export interface NewSection {
    title: string;
    description: string;
    image: string;
    topic: Topic
}

export interface Section extends NewSection {
    id: number
}

export interface SectionsResponse {
    sections: Section[]
}

export interface SingleSectionResponse {
    section: Section
}