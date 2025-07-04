export const getLote = (fila) => fila.lote || {};

export const getLindero = (fila) => {
    return fila?.lote?.lindero || {};
};

export const getCuota = (fila) => {
    return fila?.lote?.cuota || {};
};

export const getCuotaExtraordinaria = (fila) => {
    return Array.isArray(fila?.lote?.cuotasExtraordinarias) && fila.lote.cuotasExtraordinarias.length > 0
        ? fila.lote.cuotasExtraordinarias[0]
        : {};
};

export const getConyuge = (fila) => {
    return fila?.conyuge || {};
};

export const getCopropietario = (fila) => {
    const copro = fila?.copropietarios;
    return Array.isArray(copro) && copro.length > 0 ? copro[0] : {};
};
