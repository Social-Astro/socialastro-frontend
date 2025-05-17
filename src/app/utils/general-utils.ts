// ===================== UTILIDADES GENERALES =====================

/**
 * Extrae dominio de una URL
 */
export const formatWeb = (url: string): string => {
    if (!url) return '';
    let domain = url.replace(/^https?:\/\//, '');
    domain = domain.replace(/^www\./, '');
    domain = domain.split('/')[0].split('?')[0].split('#')[0];
    return domain.toLowerCase();
};

/**
 * Limpia y minúscula un email
 */
export const formatEmail = (email: string): string => {
    return email.replace(/[^a-zA-Z0-9@._+-]/g, '').toLowerCase();
};

/**
 * Descarga un archivo por URL
 */
export const downloadFile = (file: string): void => {
    const element = document.createElement('a');
    element.setAttribute('href', file);
    element.setAttribute('target', '_blank');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

/**
 * Busca un objeto por propiedad y valor
 */
export const findPropertyValue = <T>(objects: T[], property: keyof T, value: any): T | null => {
    const object = objects.find((object) => object?.[property] === value);
    return object || null;
};

/**
 * Copia texto al portapapeles
 */
export const copyToClipboard = async (text: string): Promise<void> => {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
};

/**
 * Detecta si el usuario está en móvil
 */
export const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Devuelve true si el navegador está en modo oscuro
 */
export const isDarkMode = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};
