import { User } from "../../interfaces/user";
import { Post } from "./post";

export interface NewLike {
    post: Post;
}

export interface Likes extends NewLike {
    id: number
    post: Post
    user: User
}