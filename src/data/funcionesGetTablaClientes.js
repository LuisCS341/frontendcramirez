export const getLote = (fila) => fila.lote || {};

export const getMatriz = (fila) => {
    return Array.isArray(fila?.lote?.matriz) && fila?.lote?.matriz.length > 0
        ? fila.lote.matriz
        : [{}];
};


export const getLindero = (fila) => {
    return fila?.lote?.lindero || {}; // nunca null
};

export const getCuotaExtraordinaria = (fila) => {
    return Array.isArray(fila?.lote?.cuotasExtraordinarias) && fila?.lote?.cuotasExtraordinarias.length > 0
        ? fila?.lote?.cuotasExtraordinarias[0]
        : [{}];
};


export function getConyuge(fila) {
    return fila?.conyuge || {};
}

export const getCopropietario = (fila) => {
    const copro = fila.cliente?.copropietarios;
    return Array.isArray(copro) && copro.length > 0 ? copro[0] : {};
};
