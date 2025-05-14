import { Content } from "./content";

export interface NewMultimedia {
    filename: string;
}

export interface Multimedia extends NewMultimedia {
    id?: number
    content?: Content
}
