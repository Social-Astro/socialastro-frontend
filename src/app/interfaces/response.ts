import { User } from './user';

export interface TokenResponse {
    accessToken: string;
}

export interface SingleUserResponse {
    user: User;
}

export interface AvatarResponse {
    avatar: string;
}

export interface UsersResponse {
    users: User[];
}
