import { User } from "../../interfaces/user";
import { Multimedia } from "./Multimedia";

export interface NewContent {
    description: string;
    updatedAt: Date;
    user: User;
    multimedia?: Multimedia[];
}

export interface Content extends NewContent {
    id?: number
}
