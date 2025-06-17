<template>
  <div class="primary-container">
    <div class="secundary-container">
      <div class="items">
        <input class="buscador" type="text" v-model="busquedaGlobal" placeholder="Buscar cliente..."/>

        <button @click="exportarClientesXLSX" class="btn-accion btn-exportar">Exportar Clientes</button>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th v-for="col in columnasClientes" :key="col.key">{{ col.label }}</th>
            <th>SELECCIONE SU OPERARIO</th>
            <th></th>
          </tr>

          </thead>
          <tbody>
          <tr v-for="cliente in clientes" :key="cliente.idCliente">

            <CeldaEditable
                v-for="col in columnasClientes"
                :key="col.key"
                :cliente="cliente"
                :columna="col"
                :fila="cliente"
                :tiposContrato="tiposContrato"
            />

            <td>
              <select
                  v-if="cliente.esPrimeroGrupo"
                  :value="selectedTemporal[cliente.idCliente]"
                  @change="onCambioOperario($event, cliente)"
              >
                <option disabled value="">Seleccione un operario</option>
                <option v-for="op in operarios" :key="op.id" :value="op.usuario">
                  {{ op.nombre }}
                </option>
              </select>
            </td>

            <td>
              <button v-if="!cliente.editando" @click="activarEdicion(cliente)">Editar</button>
              <button v-else @click="guardarEdicion(cliente)">Guardar</button>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/tablas/Tablas.css";
import axios from "axios";
import * as XLSX from "xlsx";
import {operarios} from "@/data/operarios.js";
import {tiposContrato} from "@/data/tiposContrato.js";
import {computed, onMounted, reactive, ref} from "vue";
import {columnasClientes} from "@/data/columnasClientes.js";
import CeldaEditable from "@/components/tablas/CeldaEditable.vue";


const clientes = ref([]);
const selectedTemporal = reactive({});
const busquedaGlobal = ref("");

const filtros = reactive({
  nombresApellidos: "",
  direccion: "",
  correoElectronico: "",
  celularCliente: "",
  documentoIdentificacion: "",
  numeroIdentificacion: "",
  estadoCivil: "",
  ocupacion: "",
  residencia: "",
  prefijoPais: "",
  idTipoContrato: "",
});

const obtenerDatosCombinados = async () => {
  try {
    const response = await axios.get("https://backendcramirez.onrender.com/api/clientes/conlotes", {
      headers: {"Content-Type": "application/json"},
      withCredentials: true,
    });

    clientes.value = response.data.map((clienteLote) => {
      const cliente = clienteLote.cliente;
      const lote = clienteLote.lote;
      selectedTemporal[cliente.idCliente] = cliente.operario || "";

      return {
        ...cliente,
        ...cliente.cliente,
        lote: lote,
        editando: false,
      };
    });

    const gruposVistos = new Set();
    clientes.value.forEach((cliente) => {
      if (!gruposVistos.has(cliente.idCliente)) {
        cliente.esPrimeroGrupo = true;
        gruposVistos.add(cliente.idCliente);
      } else {
        cliente.esPrimeroGrupo = false;
      }
    });
  } catch (error) {
    console.error("Error al obtener datos combinados:", error);
    alert("Error al obtener datos de clientes y lotes.");
  }
};

const activarEdicion = (cliente) => {
  if (cliente) {
    cliente.editando = true;
  }
};

const guardarEdicion = async (cliente) => {
  if (!cliente || !cliente.lote) return;

  const clienteLimpio = { ...cliente };
  delete clienteLimpio.editando;

  const loteLimpio = { ...cliente.lote };
  delete loteLimpio.editando;

  const payload = {
    cliente: clienteLimpio,
    lote: loteLimpio,
  };

  console.log("Payload a enviar:", payload);

  try {
    const response = await axios.put("https://backendcramirez.onrender.com/api/clientes/editar", payload);
    console.log("Cliente y lote actualizados:", response.data);

    Object.assign(cliente, response.data.cliente || {});
    Object.assign(cliente.lote, response.data.lote || {});

    cliente.editando = false;
    if (cliente.lote) {
      cliente.lote.editando = false;
    }
  } catch (error) {
    console.error("Error al actualizar cliente y lote:", error.response?.data || error.message);
    alert("Hubo un error al guardar los cambios.");
  }
};


const formatearFecha = (event, tipo) => {
  let input = event.target.value;
  input = input.replace(/[^0-9]/g, '');

  if (input.length > 2) input = input.slice(0, 2) + '/' + input.slice(2);
  if (input.length > 5) input = input.slice(0, 5) + '/' + input.slice(5);
  if (input.length > 10) input = input.slice(0, 10);

  event.target.value = input;

};


onMounted(() => {
  obtenerDatosCombinados();
});

const onCambioOperario = async (event, cliente) => {
  const nuevoUsuario = event.target.value;
  const idCliente = cliente.idCliente;

  const operarioAnterior = selectedTemporal[idCliente];

  if (nuevoUsuario === operarioAnterior) {
    return;
  }

  const confirmacion = confirm(`¿Estás seguro que quieres cambiar el operario?`);
  if (!confirmacion) {
    selectedTemporal[idCliente] = operarioAnterior;
    return;
  }

  try {

    await axios.put(`https://backendcramirez.onrender.com/api/clientes/transferir/${idCliente}`, {
      nuevoUsuarioOperario: nuevoUsuario,
    }, {
      withCredentials: true,
    });

    alert("Cliente transferido correctamente");

    cliente.operario = nuevoUsuario;
    selectedTemporal[idCliente] = nuevoUsuario;

  } catch (error) {

    console.error("Error detallado:", error);
    alert("Error al transferir cliente: " + (error.response?.data?.message || error.message));

    selectedTemporal[idCliente] = operarioAnterior;
  }
};

const exportarClientesXLSX = () => {
  console.log("CLIENTES PARA EXPORTAR:", clientes.value);
  const encabezados = [
    "TIPO DE CONTRATO",
    "CLIENTE Nº",
    "CONTRATO Nº",
    "PROYECTO",
    "EMPRESA QUE VENDE",
    "RUC VENDEDOR",
    "DIRECCION VENDEDOR",
    "TIPO DE REPRESENTANTE",
    "REPRESENTANTE LEGAL - VENDEDOR",
    "DNI VENDEDOR",
    "Nº PARTIDA (PODER VENDEDOR)",
    "MONEDA",
    "NUM. CUENTA",
    "CCI",
    "FECHA DE ENTREGA DE PROYECTO",
    "FECHA DE FIRMA DE CONTRATO DEFINITIVO",
    "ÁREA MATRIZ HAS",
    "REGISTROS DE",
    "PARTIDA MATRIZ",
    "UBICACION DEL LOTE (PREDIO MATRIZ)",
    "UNIDAD CATASTRAL MATRIZ",
    "URBANIZACION DE MATRIZ",
    "DISTRITO MATRIZ",
    "PROVINCIA MATRIZ",
    "DEPARTAMENTO MATRIZ",
    "COMPRAVENTA MATRIZ",
    "SITUACIÓN LEGAL MATRIZ",
    "CONSTANCIA NO ADEUDO",
    "AVANCE DE PROYECTO MATRIZ",
    "CRONOGRAMA MATRIZ",
    "FECHA INICIO CONTRATO",
    "FECHA CANCELACIÓN CONTRATO",
    "MZ-LT (CLIENTE)",
    "MZ (CLIENTE)",
    "LT (CLIENTE)",
    "ÁREA DEL LOTE (LETRAS)",
    "ÁREA DEL LOTE (CLIENTE)",
    "CUOTA IDEAL EN LETRAS ",
    "CUOTA IDEAL (CLIENTE)",
    "POR EL FRENTE",
    "POR LA DERECHA",
    "POR LA IZQUIERDA",
    "POR EL FONDO",
    "Nº IDENTIF. (CLIENTE)",
    "TIPO DOC. (CLIENTE)",
    "NOMBRES Y APELLIDOS (CLIENTE)",
    "NACIONALIDAD (CLIENTE)",
    "ESTADO CIVIL (CLIENTE)",
    "ESTADO CIVIL (COMPRADORES)",
    "DIRECCION - COMPRADOR (CLIENTE)",
    "DISTRITO (CLIENTE)",
    "PROVINCIA (CLIENTE)",
    "DEPARTAMENTO (CLIENTE)",
    "OCUPACIÓN",
    "TIPO DE SOCIO_CÓNYUGE/CONVIVIENTE COPROPIEDAD",
    "NUMERO DE DOCUMENTO (CONYUGUE) (CLIENTE)",
    "TIPO DE DOCUMENTO (CONYUGUE) (CLIENTE)",
    "NOMBRE COMPLETO (CONYUGUE) (CLIENTE)",
    "ESTADO CIVIL (CONYUGUE) (CLIENTE)",
    "OCUPACIÓN (CONYUGE)",
    "DOMICILIO (CONYUGE)",
    "DISTRITO (CONYUGE)",
    "PROVINCIA (CONYUGE)",
    "DEPARTAMENTO (CONYUGE)",
    "COSTO DEL LOTE (CLIENTE) EN NUM",
    "COSTO DEL LOTE (CLIENTE) EN LETRAS",
    "PRECIO POR MT2",
    "PRECIO POR MT2 (EN LETRAS)",
    "CUOTA INICIAL (CLIENTE) INCLUYE SEPARACIÓN",
    "CUOTA INICIAL (CLIENTE) EN LETRAS",
    "CUOTA INICIAL (CLIENTE) FECHA DE PAGO",
    "CUOTA INICIAL (CLIENTE) CUENTA RECAUDADORA",
    "CUOTA INICIAL (CLIENTE)  BANCO",
    "SALDO DEL LOTE (CLIENTE)",
    "SALDO DEL LOTE (CLIENTE) EN LETRAS",
    "CANTIDAD DE CUOTAS (CLIENTE)",
    "CANTIDAD DE CUOTAS (CLIENTE) EN LETRAS",
    "CANTIDAD DE CUOTAS (CLIENTE) CUENTA RECAUDADORA",
    "CANTIDAD DE CUOTAS (CLIENTE) BANCO",
    "MONTO DE CUOTAS (CLIENTE)",
    "MONTO DE CUOTAS (CLIENTE) EN LETRAS",
    "CANTIDAD CUOTA EXTRAORDINARIA (CLIENTE)",
    "MONTO DE CUOTA EXTRAORDINARIA (CLIENTE)",
    "MANT.MENSUAL EN NUM (CLIENTE)",
    "MANT.MENSUAL EN LETRAS (CLIENTE)",
    "FECHA DE ENTREGA (CLIENTE)",
    "ESTADO DE CUENTA (CLIENTE) (DE TENER DEUDA PONER MONTO)",
    "MONTO DE DEUDA EN LETRAS (CLIENTE)",
    "CUOTAS PENDIENTES DE PAGO",
    "LETRAS PENDIENTES DE PAGO",
    "CARTA DE NO ADEUDO (CLIENTE) (SI/NO)",
    "CERTIFICADO DE LOTE (CLIENTE) (SI/NO)",
    "MEDIOS DE PAGO (CLIENTE) (SI/NO)",
    "PLANOS 1",
    "PLANOS 2",
    "ENVIO DE MINUTA (CLIENTE)",
    "CORREO ELECTRONICO (CLIENTE)",
    "CELULAR (CLIENTE)",
    "FECHA DE CITA (CLIENTE)",
    "HORA DE CITA (CLIENTE)",
    "Nº ATENCION INTRANET  (CLIENTE)",
    "MODIF. MINUTA  (CLIENTE) (SI/NO)",
    "MINUTA ESCANEADA  (CLIENTE) FIRMADO",
    "EXP. NOTARIA",
    "LLENO INFORMACION",
    "PERSONA QUE SACO CITA",
    "PERSONA QUE ATIENDE",
    "FIRMO",
  ];

  const filas = clientes.value.map((item) => {
    const cliente = item ?? {};
    const lote = item.lote ?? {};
    const matriz = lote.matriz?.[0]?? {};
    const lindero = lote.lindero ?? {};
    const copropietario = cliente.copropietarios?.[0]?? {};
    const conyuge = cliente.conyuge ?? {};
    const cuotaExtra = lote.cuotasExtraordinarias?.[0] ?? {};

    return [
      lote.contrato ?? '-',
      lote.codigoLoteCliente ?? '-',
      lote.idLote ?? '-',
      lote.tipoProyecto ?? '-',
      lote.empresaVende ?? '-',
      lote.rucVendedor ?? '-',
      lote.direccionVendedor ?? '-',
      lote.tipoRepresentante ?? '-',
      lote.representanteLegalVendedor ?? '-',
      lote.dniVendedor ?? '-',
      lote.numeroPartidaPoderVendedor ?? '-',
      lote.moneda ?? '-',
      lote.numCuenta ?? '-',
      lote.cci ?? '-',
      lote.fechaSale ?? '-',
      lote.fechaFirmaContratoDefinitivo ?? '-',
      matriz.areaMatrizHas ?? '-',
      matriz.registrosDE ?? '-',
      matriz.partidaMatriz ?? '-',
      matriz.ubicacion ?? '-',
      matriz.unidadCatastral ?? '-',
      matriz.urbanizacionMatriz ?? '-',
      matriz.distritoMatriz ?? '-',
      matriz.provinciaMatriz ?? '-',
      matriz.departamentoMatriz ?? '-',
      matriz.compraventaMatriz ?? '-',
      matriz.situacionLegal ?? '-',
      matriz.constancianoadeudo ?? '-',
      matriz.avanceproyectomatriz ?? '-',
      matriz.cronogramamatriz ?? '-',
      lote.fechaInicioContrato ?? '-',
      lote.fechaCancelacionContrato ?? '-',
      lote.manzana && lote.numeroLote ? `MZ ${lote.manzana} - LT ${lote.numeroLote}` : '-',
      lote.manzana ?? '-',
      lote.numeroLote ?? '-',
      lote.areaLoteLetras ?? '-',
      lote.areaLote ?? '-',
      matriz.alicuotaLetras ?? '-',
      matriz.alicuota ?? '-',
      lindero.porElFrente ?? '-',
      lindero.porLaDerecha ?? '-',
      lindero.porLaIzquierda ?? '-',
      lindero.porElFondo ?? '-',
      cliente.numeroIdentificacion ?? '-',
      cliente.documentoIdentificacion ?? '-',
      cliente.nombresApellidos ?? '-',
      cliente.nacionalidad ?? '-',
      cliente.estadoCivil ?? '-',
      copropietario.estadoCivilCopropietarios ?? '-',
      copropietario.direccionCopropietarios ?? '-',
      cliente.distrito ?? '-',
      cliente.provincia ?? '-',
      cliente.departamento ?? '-',
      cliente.ocupacion ?? '-',
      item.tipoSocio ?? '-',
      conyuge.numeroIdentificacionConyuge ?? '-',
      conyuge.documentoIdentificacionConyuge ?? '-',
      conyuge.nombresApellidosConyuge ?? '-',
      conyuge.estadoCivilConyuge ?? '-',
      conyuge.ocupacionConyuge ?? '-',
      conyuge.direccionConyuge ?? '-',
      conyuge.distritoConyuge ?? '-',
      conyuge.provinciaConyuge ?? '-',
      conyuge.departamentoConyuge ?? '-',
      lote.costoLote ?? '-',
      lote.costoLoteLetras ?? '-',
      lote.precioMetroCuadrado ?? '-',
      lote.precioMetroCuadradoLetras ?? '-',
      lote.cuotaInicialIncluyeSeparacion ?? '-',
      lote.cuotaInicialIncluyeSeparacionLetras ?? '-',
      lote.fechaPago ?? '-',
      lote.cuentaRecaudadora ?? '-',
      lote.cuotaInicialBanco ?? '-',
      lote.saldoLote ?? '-',
      lote.saldoLoteLetras ?? '-',
      lote.cantidadCuotas ?? '-',
      lote.cantidadCuotaLetras ?? '-',
      lote.cantidadCuotaCuentaRecaudadora ?? '-',
      lote.cantidadCuotaBanco ?? '-',
      lote.montoCuotas ?? '-',
      lote.montoCuotaLetras ?? '-',
      cuotaExtra.cantidadCuotaExtraordinaria ?? '-',
      cuotaExtra.montoCuotaExtraordinaria ?? '-',
      cuotaExtra.mantenimientoMensual ?? '-',
      cuotaExtra.mantenimientoMensualLetras ?? '-',
      cuotaExtra.fechaEntrega ?? '-',
      cuotaExtra.estadoCuenta ?? '-',
      cuotaExtra.montoDeudaLetra ?? '-',
      cuotaExtra.cuotaPendientePago ?? '-',
      cuotaExtra.letrasPendientePago ?? '-',
      cuotaExtra.cartaNoAdeudo ?? '-',
      cuotaExtra.certificadoLote ?? '-',
      cuotaExtra.mediosPago ?? '-',
      cuotaExtra.plano1 ?? '-',
      cuotaExtra.plano2 ?? '-',
      cuotaExtra.envioMinuta ?? '-',
      cliente.correoElectronico ?? '-',
      cliente.celularCliente ?? '-',
      cuotaExtra.fechaCita ?? '-',
      cuotaExtra.horaCita ?? '-',
      item.atencionIntranet ?? '-',
      cuotaExtra.modificarMinuta ?? '-',
      cuotaExtra.minutaEscaneada ?? '-',
      cuotaExtra.expNotaria ?? '-',
      item.llenoInformacion ?? '-',
      item.personaSacoCita ?? '-',
      item.personaAtiende ?? '-',
      item.firmo ?? '-',
    ];
  });

  const hoja = XLSX.utils.aoa_to_sheet([encabezados, ...filas]);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Clientes");
  XLSX.writeFile(libro, "clientes.xlsx");
};

</script>
