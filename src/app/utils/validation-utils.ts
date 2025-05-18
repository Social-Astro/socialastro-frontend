// ===================== VALIDACIONES =====================

/**
 * Valida email
 */
export const validEmail = (email: string): boolean => {
    const re = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))\]$/;
    return re.test(email);
};

/**
 * Valida si es URL
 */
export const validWeb = (web: string): boolean => {
    const re = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[\-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[a-z\d_]*)?$/;
    return re.test(web);
};

/**
 * Valida si es un móvil español
 */
export const validSpanishMobile = (phone: string): boolean => {
    const re = /^\s*(\+34)?\s*[67]\d{2}\s*\d{3}\s*\d{3}\s*$/;
    return re.test(phone);
};

/**
 * Valida si es un nombre de usuario válido (letras, números, guion bajo, 3-20 caracteres)
 */
export const validUsername = (username: string): boolean => {
    const re = /^[a-zA-Z0-9_]{5,20}$/;
    return re.test(username);
};

/**
 * Devuelve true si el string es JSON válido
 */
export const isValidJSON = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};
