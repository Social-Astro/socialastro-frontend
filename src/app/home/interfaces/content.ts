import { User } from "../../interfaces/user";

export interface NewContent {
    description: string;
    createdAt: Date;
    user?: User; //TODO: Quitar el ? cuando esté todo
    multimedia: string; //TODO: Esto hay que hacerlo bien, actualizarlo en la BBDD para que recoja un array de Strings y así puedan guardarse muchos. 
    likes: number
}

export interface Content extends NewContent {
    id: number
}
