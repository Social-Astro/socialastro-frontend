// ===================== LOCAL STORAGE =====================

/**
 * Obtiene un objeto del localStorage
 */
export const getObjectFromlocalStorage = (localStorageKey: string): object | undefined => {
    try {
        const valor = localStorage.getItem(localStorageKey);
        if (!valor) {
            console.log(`No existe la clave "${localStorageKey}" en localStorage.`);
            return undefined;
        }
        const objeto = JSON.parse(valor);
        if (typeof objeto === 'object' && objeto !== null && !Array.isArray(objeto)) {
            return objeto;
        } else {
            console.log(`La clave "${localStorageKey}" no es un objeto válido.`);
            return undefined;
        }
    } catch (error: any) {
        console.error(error.message);
        throw error;
    }
};

/**
 * Guarda un objeto en localStorage
 */
export const saveObjectToLocalStorage = (localStorageKey: string, objeto: object): void => {
    try {
        if (typeof objeto !== 'object' || objeto === null || Array.isArray(objeto)) {
            throw new Error('El valor no es un objeto válido.');
        }
        const valor = JSON.stringify(objeto);
        localStorage.setItem(localStorageKey, valor);
    } catch (error: any) {
        console.error(error.message);
        throw error;
    }
};
