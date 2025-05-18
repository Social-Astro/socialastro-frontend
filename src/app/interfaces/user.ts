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
    numLikes?: number;
    numPosts?: number;
    numFriends?: number;
    numComments?: number;
    numAchievements?: number;
    role: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserProfileEdit {
    name?: string;
    bio?: string;
    updatedAt: Date;
}

export interface UserUsernameEdit {
    username: string;
}

export interface UserPasswordEdit {
    password: string;
}

export interface UserEmailEdit {
    email: string;
}

export interface UserAvatarEdit {
    avatar: string;
}

export interface UserHeaderEdit {
    header: string;
}
