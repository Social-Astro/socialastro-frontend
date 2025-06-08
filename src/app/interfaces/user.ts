// TODO: crear una interfaz para el usuario real (lo que devuelve el back) y otra para el resigter
export interface User {
    id?: number;
    username: string;
    password?: string;
    name: string;
    email: string;
    avatar?: string;
    heading?: string;
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
    heading: string;
}

export interface CreateFriendNotificationDto {
    owner: number;
}

export interface CreateRelation {
    requester: User;
    requested: User;
}

export interface FriendsByUser {
    friendId: string;
    friendName: string;
}
