import { Multimedia } from '../../home/interfaces/multimedia';

export interface NewAchievement {
    title: string;
    requisite: number;
    image: Multimedia;
}

export interface Achievement extends NewAchievement {
    id?: number;
    title: string;
    requisite: number;
    image: Multimedia;
}
