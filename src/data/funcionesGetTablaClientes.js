// Método para obtener el primer lote o un objeto vacío si no existe
export const getLote = (cliente) => {
    return Array.isArray(cliente.lotes) ? cliente.lotes[0] || {} : {};
};

// Método para obtener el primer elemento de la matriz o un objeto vacío
export const getMatriz = (lote) =>{
    return Array.isArray(lote.matriz) ? lote.matriz[0] || {} : {};
};
// Método para obtener el primer lindero o un objeto vacío
export const getLindero = (lote) => {
    return lote && lote.lindero ? lote.lindero : null;
};

export const getCuotaExtraordinaria = (lote) => {
    return Array.isArray(lote.cuotasExtraordinarias) && lote.cuotasExtraordinarias.length > 0
        ? lote.cuotasExtraordinarias[0]
        : null;
};

// Método para obtener el cónyuge o un objeto vacío si no existe
export const getConyuge =(cliente) =>  {
    return cliente && cliente.conyuge ? cliente.conyuge : {};
};

export const getCopropietario = (cliente) => {
    return Array.isArray(cliente.copropietarios) ? cliente.copropietarios[0] || {} : {};
};




