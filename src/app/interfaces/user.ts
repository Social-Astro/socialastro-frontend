export interface User {
    id?: number;
    username: string;
    password?: string;
    name: string;
    email: string;
    avatar: string;
    header: string;
    bio: string;
    createdAt: Date;
    friend_ids: number[];
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserProfileEdit {
    name: string;
    email: string;
    avatar: string;
    header: string;
    bio: string;
    createdAt: Date;
    friend_ids: number[];
}

export interface UserPasswordEdit {
    password: string;
}

export interface UserUsernameEdit {
    username: string;
}
