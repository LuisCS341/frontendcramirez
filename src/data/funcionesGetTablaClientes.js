export const getLote = (fila) => fila.lote || {};

export const getMatriz = (fila) => {
    return Array.isArray(fila?.lote?.matriz) && fila.lote.matriz.length > 0
        ? fila.lote.matriz[0]
        : {};
};

export const getLindero = (fila) => {
    return fila?.lote?.lindero || {};
};

export const getCuotaExtraordinaria = (fila) => {
    return Array.isArray(fila?.lote?.cuotasExtraordinarias) && fila.lote.cuotasExtraordinarias.length > 0
        ? fila.lote.cuotasExtraordinarias[0]
        : {};
};

export const getConyuge = (fila) => {
    return fila?.cliente?.conyuge || {};
};

export const getCopropietario = (fila) => {
    const copro = fila?.cliente?.copropietarios;
    return Array.isArray(copro) && copro.length > 0 ? copro[0] : {};
};
