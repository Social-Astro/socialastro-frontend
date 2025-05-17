// ===================== TEXTO =====================

/**
 * Devuelve la primera letra de cada palabra en mayúscula
 */
export const initials = (name: string): string => {
    return name
        .split(/\s+/)
        .map((w) => w[0]?.toUpperCase() || '')
        .join('');
};

/**
 * Capitaliza la primera letra
 */
export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * Resalta coincidencias en un texto
 */
export const highlightSearch = (text: string, query: string): string => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<strong style="color: var(--p-primary-color);">$1</strong>`);
};

/**
 * Genera un slug URL-friendly
 */
export const slugify = (text: string): string => {
    return text
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

/**
 * Acorta texto y añade '...'
 */
export const truncate = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
};

/**
 * Elimina etiquetas HTML de un string
 */
export const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Devuelve true si el string contiene solo emojis
 */
export const isOnlyEmojis = (str: string): boolean => {
    return /^([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])+$/u.test(str.replace(/\s/g, ''));
};

/**
 * Elimina los acentos de un string
 */
export const removeAccents = (str: string): string => {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
};
