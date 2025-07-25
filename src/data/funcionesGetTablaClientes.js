export const getLote = (fila) => fila.lote || {};

export const getLindero = (fila) => {
    return fila?.lote?.lindero || {};
};

export const getCuota = (fila) => {
    return fila?.lote?.cuota || {};
};

export const getMatriz = (fila) => {
    return fila?.lote?.matriz || {};
};

export const getCuotaExtraordinaria = (fila) => {
    return fila?.lote?.cuotaextraordinaria || {};
};

export const getConyuge = (fila) => {
    return fila?.conyuge || {};
};

export const getCopropietarioLista = (fila) => {
    return Array.isArray(fila?.copropietarios) ? fila.copropietarios : [];
};


export const getCopropietario = (fila) => {
    const copro = fila?.copropietarios;
    return Array.isArray(copro) && copro.length > 0 ? copro[0] : {};
};
