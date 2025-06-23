export const getLote = (fila) => fila.lotes || {};

export const getMatriz = (fila) => {
    return Array.isArray(fila?.lotes?.matriz) && fila.lotes.matriz.length > 0
        ? fila.lotes.matriz[0]
        : {};
};

export const getLindero = (fila) => {
    return fila?.lotes?.lindero || {};
};

export const getCuotaExtraordinaria = (fila) => {
    return Array.isArray(fila?.lotes?.cuotasExtraordinarias) && fila.lotes.cuotasExtraordinarias.length > 0
        ? fila.lotes.cuotasExtraordinarias[0]
        : {};
};

export function getConyuge(fila) {
    return fila?.conyuge || {};
}

export const getCopropietario = (fila) => {
    const copro = fila.cliente?.copropietarios;
    return Array.isArray(copro) && copro.length > 0 ? copro[0] : {};
};
