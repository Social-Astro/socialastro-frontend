import { Content } from "./content";
import { Section } from "./sections";

export interface NewPost {
    title: string;
    section: Section
    content: Content
}

export interface EditPost {
    id: number
    title: string;
    section: Section
    content: Content
}

export interface Post extends NewPost {
    id: number,
    comments: Comment[],
    numComments: number,
    numLikes: number,
    numSaved: number,
    alreadyLikes?: boolean;
    alreadySaved?: boolean;
}

export interface PostsResponse {
    posts: Post[],
    page: number
}

export interface SinglePostResponse {
    post: Post
}