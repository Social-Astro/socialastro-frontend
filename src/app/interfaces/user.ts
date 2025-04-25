export interface User {
    id?: number;
    username: string;
    password?: string;
    name: string;
    email: string;
    avatar?: string;
    header?: string;
    bio?: string;
    createdAt: Date;
    updatedAt?: Date;
    friend_ids?: number[];
    role: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserProfileEdit {
    name?: string;
    email?: string;
    avatar?: string;
    header?: string;
    bio?: string;
    updatedAt: Date;
}

export interface UserPasswordEdit {
    password: string;
}

export interface UserUsernameEdit {
    username: string;
}
