import { User } from "../../interfaces/user";
import { Multimedia } from "./Multimedia";

export interface NewContent {
    description: string;
    updatedAt: Date;
    multimedia?: Multimedia[];
}

export interface Content extends NewContent {
    id?: number;
    user?: User;
    mine?: boolean;
}
