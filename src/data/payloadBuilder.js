

export function buildClientePayload(form) {
    return {
        nombresApellidos: form.nombreCliente,
        ocupacion: form.ocupacionCliente,
        idIdentificacion: form.tipoIdentificacion,
        numeroIdentificacion: form.numIdentificacionUsuario,
        idNacionalidad: form.nacionalidad,
        idResidencia: form.paisdeResidencia,
        idDepartamento: form.departamento,
        idProvincia: form.provincia,
        idDistrito: form.distrito,
        direccion: form.direccion,
        correoElectronico: form.correoUsuario,
        idPrefijo: form.prefijoTelefonico,
        celularCliente: form.numTelefonico,
        idEstadoCivil: form.estadoCivil,
        descripcionEstadoCivil: form.descripcionEstadoCivil
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
        numeroIdentificacionCopropietarios: copropietario.numeroIdentificacionCopropietarios,
        idNacionalidadCopropietarios: copropietario.paisOrigenCopropietarios,
        idResidenciaCopropietarios: copropietario.paisResidenciaCopropietarios,
        ocupacionCopropietarios: copropietario.ocupacionCopropietario,
        idDepartamentoCopropietarios: copropietario.departamentoCopropietarios,
        idProvinciaCopropietarios: copropietario.provinciaCopropietarios,
        idDistritoCopropietarios: copropietario.distritoCopropietarios,
        direccionCopropietarios: copropietario.direccionCopropietariosHogar,
        correoElectronicoCopropietarios: copropietario.correoUsuarioCopropietarios,
        idPrefijoCopropietarios: copropietario.prefijoTelefonicoCopropietarios,
        celularCopropietarios: copropietario.numeroTelefonicoCopropietarios,
        idEstadoCivilCopropietarios: copropietario.estadoCivilCopropietarios,
        descripcionEstadoCivilCopropietarios: copropietario.descripcionEstadoCivilCopropietarios,
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
        tipoRepresentante: lote.tipoRepresentante,
        representanteLegalVendedor: lote.representanteLegal,
        dniVendedor: lote.dniVendedor,
        numeroPartidaPoderVendedor: lote.partidaPoder,
        moneda: lote.moneda,
        numCuenta: lote.numCuenta,
        cci: lote.cci,
        fechaSale: lote.fechaSale,
        fechaFirmaContratoDefinitivo: lote.fechaFirma,
        ubicacionLote: lote.ubicacionPredio,
        manzana: lote.manzanalote,
        numeroLote: lote.numerolote,
        idTipoContrato: lote.tipoContratolote,
        fechaInicioContrato: lote.fechaInicioContrato,
        fechaCancelacionContrato: lote.fechaCancelacionContrato,
        areaLote: lote.areaLote,
        areaLoteLetras: lote.areaLoteLetras,
        costoLote: lote.costoLote,
        costoLoteLetras: lote.costoLoteLetras,
        precioMetroCuadrado: lote.precioMetroCuadrado,
        precioMetroCuadradoLetras: lote.precioMetroCuadradoLetras,
        mantenimientoMensual: lote.mantenimientoMensual,
        mantenimientoMensualLetras: lote.mantenimientoMensualLetras,
        estadoCuenta: lote.estadoCuenta,
        montoDeudaLetra: lote.montoDeudaLetra ,
        fechaEntrega: lote.fechaEntrega,
        cantidadCuotaCuentaRecaudadora: lote.cantidadCuotaCuentaRecaudadora,
        saldoLote: lote.saldoLote,
        saldoLoteLetras: lote.saldoLoteLetras,
        alicuota: lote.alicuota,
        alicuotaLetras: lote.alicuotaLetras,
    };
}

export const buildCuotaExtraordinariaPayload = ({ idLote, cuotaextraordinaria }) => ({
    idLote,
    cantidadCuotaExtraordinaria: cuotaextraordinaria.cantidadCuotaExtraordinaria,
    montoCuotaExtraordinaria: cuotaextraordinaria.montoCuotaExtraordinaria,
    mediosPago: cuotaextraordinaria.mediosPago,
});


export const buildLinderoPayload = ({ idLote, lindero }) => ({
    idLote,
    porLaDerecha: lindero?.porLaDerechaLindero ,
    porLaIzquierda: lindero?.porLaIzquierdaLindero ,
    porElFrente: lindero?.porElFrenteLindero ,
    porElFondo: lindero?.porElFondoLindero ,
});

export const buildDocumentoPayload=({idCuotaExtraordinaria,documento}) => ({
    idCuotaExtraordinaria,
    cartaNoAdeudo: documento.cartaNoAdeudo,
    certificadoLote: documento.certificadoLote,
    plano1: documento.plano1,
    plano2: documento.plano2,
    envioMinuta: documento.envioMinuta,
    fechaCita: documento.fechaCita,
    horaCita: documento.horaCita,
    modificarMinuta: documento.modificarMinuta,
    minutaEscaneada: documento.minutaEscaneada,
    expNotaria: documento.expNotaria,
});

export const buildCuotaPayload=({idLote,cuota}) => ({
    idLote,
    letrasPendientePago:cuota.letrasPendientePago,
    cuentaRecaudadora : cuota.cuentaRecaudadora,
    cuotaInicialIncluyeSeparacion: cuota.cuotaInicialIncluyeSeparacion,
    cuotaInicialIncluyeSeparacionLetras: cuota.cuotaInicialIncluyeSeparacionLetras,
    montoCuotas: cuota.montoCuotas,
    montoCuotaLetras: cuota.montoCuotaLetras,
    fechaPago: cuota.fechaPago,
    cuotaInicialBanco: cuota.cuotaInicialBanco,
    cantidadCuotas: cuota.cantidadCuotas,
    cantidadCuotaLetras: cuota.cantidadCuotaLetras,
    cantidadCuotaCuentaRecaudadora: cuota.cantidadCuotaCuentaRecaudadora,
    cantidadCuotaBanco: cuota.cantidadCuotaBanco,
    cuotaPendientePago: cuota.cuotaPendientePago,
});
