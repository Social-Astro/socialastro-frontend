// ===================== COLORES Y AVATARES =====================

/**
 * Valida si es un color hexadecimal
 */
export const validHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * Genera un color aleatorio en formato hexadecimal
 */
export const randomHexColor = (): string => {
    return (
        '#' +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')
    );
};
