export interface NewTopic {
    title: string;
    description: string;
    image: string;
}

export interface Topic extends NewTopic {
    id: number
}

export interface TopicsResponse {
    topics: Topic[]
}

export interface SingleTopicResponse {
    topic: Topic
}