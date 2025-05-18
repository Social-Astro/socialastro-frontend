// ===================== FECHAS =====================

/**
 * Fecha del back a -> dd-mm-yyyy HH:mm
 */
export const formatDateTime = (fechaStr: string): string => {
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return `${dia}-${mes}-${anio} ${horas}:${minutos}`;
};

/**
 * Devuelve true si es menor de edad
 */
export const isMinor = (dateBirthday: string | Date): boolean => {
    if (!dateBirthday) return false;
    const birthDate = new Date(dateBirthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    return age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
};

/**
 * Devuelve la edad a partir de la fecha de nacimiento
 */
export const getAge = (dateBirthday: string | Date): number => {
    const birthDate = new Date(dateBirthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

/**
 * Devuelve la diferencia en días entre dos fechas
 */
export const daysBetween = (date1: string | Date, date2: string | Date): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.abs(Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
};
