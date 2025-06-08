export const obtenerNombreResidencia = (id, residencias) => {
    const item = residencias.find(n => n.id === id);
    return item ? item.nombre : 'Desconocido';
};

export const obtenerNombrePais = (id, paises) => {
    const item = paises.find(p => p.id === id);
    return item ? item.nombre : 'Desconocido';
};

export const obtenerNombreDepartamento = (id, departamentos) => {
    const item = departamentos.find(d => d.id === id);
    return item ? item.nombre : 'Desconocido';
};

export const obtenerNombreProvincia = (id, provincias) => {
    const item = provincias.find(p => p.id === id);
    return item ? item.nombre : 'Desconocido';
};

export const obtenerNombreDistrito = (id, distritos) => {
    const item = distritos.find(d => d.id === id);
    return item ? item.nombre : 'Desconocido';
};

export const obtenerNombreProyecto = (id, proyectos) => {
    const proyecto = proyectos.find(p => p.id === id);
    return proyecto ? proyecto.nombre : 'Desconocido';
};
