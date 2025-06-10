

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
        cuotaInicialIncluyeSeparacion: lote.cuotaInicialIncluyeSeparacion,
        cuotaInicialIncluyeSeparacionLetras: lote.cuotaInicialIncluyeSeparacionLetras,
        fechaPago: lote.fechaPago,
        cuentaRecaudadora: lote.cuentaRecaudadora,
        cuotaInicialBanco: lote.cuotaInicialBanco,
        saldoLote: lote.saldoLote,
        saldoLoteLetras: lote.saldoLoteLetras,
        cantidadCuotas: lote.cantidadCuotas,
        cantidadCuotaLetras: lote.cantidadCuotaLetras,
        cantidadCuotaCuentaRecaudadora: lote.cantidadCuotaCuentaRecaudadora,
        cantidadCuotaBanco: lote.cantidadCuotaBanco,
        montoCuotas: lote.montoCuotas,
        montoCuotaLetras: lote.montoCuotaLetras,
    };
}

export const buildCuotaExtraordinariaPayload = ({ idLote, cuotaextraordinaria }) => ({
    idLote,
    cantidadCuotaExtraordinaria: cuotaextraordinaria.cantidadCuotaExtraordinaria,
    montoCuotaExtraordinaria: cuotaextraordinaria.montoCuotaExtraordinaria,
    mantenimientoMensual: cuotaextraordinaria.mantenimientoMensual,
    mantenimientoMensualLetras: cuotaextraordinaria.mantenimientoMensualLetras,
    estadoCuenta: cuotaextraordinaria.estadoCuenta,
    montoDeudaLetra: cuotaextraordinaria.montoDeudaLetra ,
    cuotaPendientePago: cuotaextraordinaria.cuotaPendientePago,
    letrasPendientePago: cuotaextraordinaria.letrasPendientePago,
    fechaEntrega: cuotaextraordinaria.fechaEntrega,
    cartaNoAdeudo: cuotaextraordinaria.cartaNoAdeudo,
    certificadoLote: cuotaextraordinaria.certificadoLote,
    mediosPago: cuotaextraordinaria.mediosPago,
    plano1: cuotaextraordinaria.plano1,
    plano2: cuotaextraordinaria.plano2,
    envioMinuta: cuotaextraordinaria.envioMinuta,
    fechaCita: cuotaextraordinaria.fechaCita,
    horaCita: cuotaextraordinaria.horaCita,
    modificarMinuta: cuotaextraordinaria.modificarMinuta,
    minutaEscaneada: cuotaextraordinaria.minutaEscaneada,
    expNotaria: cuotaextraordinaria.expNotaria,
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

