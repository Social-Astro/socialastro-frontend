// ===================== NÚMEROS Y ARRAYS =====================

/**
 * Limita un número entre un mínimo y un máximo
 */
export const clamp = (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
};

/**
 * Devuelve un número aleatorio entre min y max (incluidos)
 */
export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Mezcla aleatoriamente los elementos de un array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
