import { User } from '../../../interfaces/user';

const isUserDto = (obj: unknown): obj is User => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const dto = obj as Record<string, unknown>;

    return typeof dto['id'] === 'number' && typeof dto['name'] === 'string' && (typeof dto['avatar'] === 'string' || dto['avatar'] === null) && (typeof dto['heading'] === 'string' || dto['heading'] === null) && (typeof dto['bio'] === 'string' || dto['bio'] === null) && (typeof dto['numLikes'] === 'number' || dto['numLikes'] === null) && (typeof dto['numPosts'] === 'number' || dto['numPosts'] === null) && (typeof dto['numFriends'] === 'number' || dto['numFriends'] === null) && (typeof dto['numComments'] === 'number' || dto['numComments'] === null) && (typeof dto['numAchievements'] === 'number' || dto['numAchievements'] === null) && typeof dto['role'] === 'string';
};

export const mapUser = (user: unknown): User => {
    if (!isUserDto(user)) {
        console.error('Invalid user data:', user);
        throw new TypeError('Invalid user data');
    }

    return {
        id: user.id !== null ? Number(user.id) : null,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        heading: user.heading,
        bio: user.bio,
        numLikes: user.numLikes !== null ? Number(user.numLikes) : null,
        numPosts: user.numPosts !== null ? Number(user.numPosts) : null,
        numFriends: user.numFriends !== null ? Number(user.numFriends) : null,
        numComments: user.numComments !== null ? Number(user.numComments) : null,
        numAchievements: user.numAchievements !== null ? Number(user.numAchievements) : null,
        role: user.role
    } as User;
};
