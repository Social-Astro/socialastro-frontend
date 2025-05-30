import { User } from "../../interfaces/user";
import { Post } from "./post";

export interface NewSaved {
    post: Post;
}

export interface Saved extends NewSaved {
    id: number
    post: Post
    user: User
}

export interface SavedByUser {
    postId: number;
    postTitle: string;
    postTag: string;
}