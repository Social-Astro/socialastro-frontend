// ===================== DELAY =====================

/**
 * Espera asíncrona en segundos
 */
export const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms * 1000));
