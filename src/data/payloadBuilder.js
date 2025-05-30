

export function buildClientePayload(form) {
    return {
        nombresApellidos: form.nombreCliente,
        ocupacion: form.ocupacionCliente,
        idIdentificacion: form.tipoIdentificacion,
        numeroIdentificacion: form.numIdentificacionUsuario,
        idNacionalidad: form.paisOrigen,
        idResidencia: form.paisdeResidencia,
        idDepartamento: form.departamento,
        idProvincia: form.provincia,
        idDistrito: form.distrito,
        direccion: form.direccion,
        correoElectronico: form.correoUsuario,
        idPrefijo: form.prefijoTelefonico,
        celularCliente: form.numTelefonico,
        idEstadoCivil: form.estadoCivil
    };
}

export function buildClienteConyugePayload(form, idCliente) {
    return {
        idCliente,
        ocupacionConyuge: form.conyuge.ocupacionClienteConyuge,
        idIdentificacionConyuge: form.conyuge.tipoIdentificacionClienteConyuge,
        numeroIdentificacionConyuge: form.conyuge.numIdentificacionClienteConyuge,
        idNacionalidadConyuge: form.conyuge.paisOrigenClienteConyuge,
        idResidenciaConyuge: form.conyuge.paisResidenciaClienteConyuge,
        idDepartamentoConyuge: form.conyuge.departamentoClienteConyuge,
        idProvinciaConyuge: form.conyuge.provinciaClienteConyuge,
        idDistritoConyuge: form.conyuge.distritoClienteConyuge,
        direccionConyuge: form.conyuge.direccionClienteConyuge,
        correoElectronicoConyuge: form.conyuge.correoUsuarioCliente,
        idPrefijoConyuge: form.conyuge.prefijoTelefonicoClienteConyuge,
        celularConyuge: form.conyuge.numTelefonicoClienteConyuge,
        nombresApellidosConyuge: form.conyuge.nombreClienteConyuge
    };
}

export function buildCopropietarioPayload(idCliente, copropietario) {
    return {
        idClienteCopropietarios: idCliente,
        nombresApellidosCopropietarios: copropietario.nombreCopropietarios,
        idIdentificacionCopropietarios: copropietario.tipoIdentificacionCopropietarios,
        numeroIdentificacionCopropietarios: copropietario.numIdentificacionCopropietarios,
        idNacionalidadCopropietarios: copropietario.paisOrigenCopropietarios,
        idResidenciaCopropietarios: copropietario.paisResidenciaCopropietarios,
        ocupacionCopropietarios: copropietario.ocupacionCopropietario,
        idDepartamentoCopropietarios: copropietario.departamentoCopropietarios,
        idProvinciaCopropietarios: copropietario.provinciaCopropietarios,
        idDistritoCopropietarios: copropietario.distritoCopropietarios,
        direccionCopropietarios: copropietario.direccionCopropietariosHogar,
        correoElectronicoCopropietarios: copropietario.correoUsuarioCopropietarios,
        idPrefijoCopropietarios: copropietario.prefijoTelefonicoCopropietarios,
        celularCopropietarios: copropietario.numTelefonicoCopropietarios,
        idEstadoCivilCopropietarios: copropietario.estadoCivilCopropietarios,
    };
}

export function buildConyugePayload(idCliente, conyuge) {
    return {
        idClienteCopropietarioConyuge: idCliente,
        nombresApellidosCopropietarioConyuge: conyuge.nombreCopropietariosConyuge,
        ocupacionCopropietarioConyuge: conyuge.ocupacionCopropietarioConyuge,
        idIdentificacionCopropietarioConyuge: conyuge.tipoIdentificacionCopropietariosConyuge,
        numeroIdentificacionCopropietarioConyuge: conyuge.numIdentificacionCopropietariosConyuge,
        idDistritoCopropietarioConyuge: conyuge.distritoCopropietariosConyuge,
        idProvinciaCopropietarioConyuge: conyuge.provinciaCopropietariosConyuge,
        idDepartamentoCopropietarioConyuge: conyuge.departamentoCopropietariosConyuge,
        idNacionalidadCopropietarioConyuge: conyuge.paisOrigenCopropietariosConyuge,
        idResidenciaCopropietarioConyuge: conyuge.paisResidenciaCopropietariosConyuge,
        direccionCopropietarioConyuge: conyuge.direccionCopropietariosConyuge,
        correoElectronicoCopropietarioConyuge: conyuge.correoUsuarioCopropietariosConyuge,
        idPrefijoCopropietarioConyuge: conyuge.prefijoTelefonicoCopropietariosConyuge,
        celularCopropietarioConyuge: conyuge.numTelefonicoCopropietariosConyuge,
    };
}

export function buildLotePayload(idCliente, lote) {
    return {
        idClienteLote: idCliente,
        idTipoProyecto: lote.proyectolote,
        idUbicacion: lote.ubicacionLote,
        empresa: lote.empresa,
        empresaVende: lote.empresaVendedora,
        rucVendedor: lote.ruc,
        direccionVendedor: lote.direccion,
        representanteLegalVendedor: lote.representanteLegal,
        dniVendedor: lote.dniVendedor,
        numeroPartidaPoderVendedor: lote.partidaPoder,
        moneda: lote.moneda,
        numCuenta: lote.numCuenta,
        cci: lote.cci,
        fechaSale: lote.fechaSale,
        fechaFirmaContratoDefinitivo: lote.fechaFirma,
        areaMatrizHas: lote.areaMatriz,
        registroDe: lote.registrosDe,
        partidaMatriz: lote.partidaMatriz,
        ubicacionLote: lote.ubicacionPredio,
        unidadCatastralMatriz: lote.unidadCatastral,
        urbanizacionMatriz: lote.urbanizacionMatriz,
        distritoMatriz: lote.distritoMatriz,
        provinciaMatriz: lote.provinciaMatriz,
        departamentoMatriz: lote.departamentoMatriz,
        compraVentaMatriz: lote.compraventaMatriz,
        situacionLegalMatriz: lote.situacionLegalMatriz,
        manzana: lote.manzanalote,
        numeroLote: lote.numerolote,
        idTipoContrato: lote.tipoContratolote,
        areaLote: lote.areaLote,
        areaLoteLetras: lote.areaLoteLetras,
        costoLote: lote.costoLote,
        montoLetras: lote.montoLetras,
        pagoInicial: lote.pagoInicial,
        separacion: lote.separacion,
        montoCuotas: lote.montoCuotas,
        cantidadCuotas: lote.cantidadCuotas,
        mantenimientoMensual: lote.mantenimientoMensual,
        mantenimientoMensualLetras: lote.mantenimientoMensualLetras,
        fechaInicioContrato: lote.fechaInicioContrato,
        fechaCancelacionContrato: lote.fechaCancelacionContrato,
    };
}

export const buildCuotaExtraordinariaPayload = ({ idLote, cuotaextraordinaria }) => ({
    idLote,
    cantidadCuotaExtraordinaria: cuotaextraordinaria.cantidadCuotaExtraordinaria,
    montoCuotaExtraordinaria: cuotaextraordinaria.montoCuotaExtraordinaria,
    mantenimientoMensual: cuotaextraordinaria.mantenimientoMensual,
    mantenimientoMensualLetras: cuotaextraordinaria.mantenimientoMensualLetras,
    estadoCuenta: cuotaextraordinaria.estadoCuenta ,
    montoDeudaLetra: cuotaextraordinaria.montoDeudaLetra,
    cuotaPendientePago: cuotaextraordinaria.cuotaPendientePago
});


export const buildLinderoPayload = ({ idLote, lindero }) => ({
    idLote,
    porLaDerecha: lindero?.porLaDerechaLindero ,
    porLaIzquierda: lindero?.porLaIzquierdaLindero ,
    porElFrente: lindero?.porElFrenteLindero ,
    porElFondo: lindero?.porElFondoLindero ,
});

export function buildMatrizLotePayload(lote) {
    return {
        idLote: lote.idLote,
        idDistrito: lote.matriz.distritoMatriz,
        idProvincia: lote.matriz.provinciaMatriz,
        idDepartamento: lote.matriz.departamentoMatriz,
        idUbicacion: lote.matriz.ubicacionMatriz,
        areaMatrizHas: lote.matriz.areaMatrizHasMatriz,
        registrosDE: lote.matriz.registroDeMatriz,
        partidaMatriz: lote.matriz.partidaMatriz,
        unidadCatastral: lote.matriz.unidadCatastralMatriz,
        urbanizacionMatriz: lote.matriz.urbanizacionMatriz,
        compraventaMatriz: lote.matriz.compraventaMatriz,
        situacionLegal: lote.matriz.situacionLegalMatriz,
        alicuota: lote.matriz.alicuotaMatriz,
        alicuotaLetras: lote.matriz.alicuotaLetrasMatriz,
    };
}

