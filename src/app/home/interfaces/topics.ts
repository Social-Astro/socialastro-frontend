export interface NewTopic {
    title: string;
    description: string;
    image: string;
}

export interface Topic extends NewTopic {
    id: number
    sections: []
}

export interface TopicsResponse {
    topics: Topic[]
}

export interface SingleTopicResponse {
    topic: Topic
}