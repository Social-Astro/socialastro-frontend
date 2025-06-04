import { User } from "../../interfaces/user";

export interface Notification {
    id: number;
    message: string;
    type: string;
    ref: number;
    user: User
}