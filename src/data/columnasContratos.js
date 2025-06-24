
export const columnasClientes = [
    { key: 'contrato', label: 'TIPO DE CONTRATO', editable: false , nested: 'lote' },
    { key: 'codigoLoteCliente', label: 'CLIENTE Nº', editable: false, nested: 'lote' },
    { key: 'idLote', label: 'CONTRATO Nº', editable: false,nested: 'lote' },
    { key: 'tipoProyecto', label: 'PROYECTO',editable: false, nested: 'lote' },
    { key: 'empresaVende', label: 'EMPRESA QUE VENDE', editable: true, nested: 'lote' },
    { key: 'rucVendedor', label: 'RUC VENDEDOR', editable: true, nested: 'lote' },
    { key: 'direccionVendedor', label: 'DIRECCION VENDEDOR', editable: true, nested: 'lote' },
    { key: 'tipoRepresentante', label: 'TIPO DE REPRESENTANTE', editable: true, nested: 'lote' },
]