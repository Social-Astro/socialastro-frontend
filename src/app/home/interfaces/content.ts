import { User } from "../../interfaces/user";
import { Multimedia } from "./multimedia";

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
