import { Content } from "./content"
import { Post } from "./post"

export interface NewComment {
    post: Post
    content: Content
}

export interface Comment extends NewComment {
    id: number
}

export interface CommentsResponse {
    comments: Comment[],
    page: number
}

export interface SingleCommentResponse {
    comment: Comment
}