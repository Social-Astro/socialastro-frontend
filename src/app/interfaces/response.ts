import { User } from './user';

export interface TokenResponse {
    accessToken: string;
}

export type SingleUserResponse = User;

export interface AvatarResponse {
    avatar: string;
}

export interface UsersResponse {
    users: User[];
}
