<template>
  <div class="primary-container">
    <div class="secundary-container">
      <div class="items">
        <input class="buscador" type="text" v-model="busquedaGlobal" placeholder="Buscar cliente..."/>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>TIPO DE CONTRATO</th>
            <th>CLIENTE Nº</th>
            <th>CONTRATO Nº</th>
            <th>PROYECTO</th>
            <th>EMPRESA QUE VENDE</th>
            <th>RUC VENDEDOR</th>
            <th>DIRECCION VENDEDOR</th>
            <th>REPRESENTANTE LEGAL - VENDEDOR</th>
            <th>DNI VENDEDOR</th>
            <th>Nº PARTIDA (PODER VENDEDOR)</th>
            <th>MONEDA</th>
            <th>NUM. CUENTA</th>
            <th>CCI</th>
            <th>FECHA DE ENTREGA DE PROYECTO</th>
            <th>FECHA DE FIRMA DE CONTRATO DEFINITIVO</th>
            <th>AREA MATRIZ HAS.</th>
            <th>REGISTROS DE</th>
            <th>PARTIDA MATRIZ</th>
            <th>UBICACION DEL LOTE (PREDIO MATRIZ)</th>
            <th>UNIDAD CATASTRAL DE MATRIZ</th>
            <th>URBANIZACION DE MATRIZ</th>
            <th>DISTRITO DE MATRIZ</th>
            <th>PROVINCIA DE MATRIZ</th>
            <th>DEPARTAMENTO DE MATRIZ</th>
            <th>COMPRAVENTA DE MATRIZ</th>
            <th>SITUACION LEGAL DE MATRIZ</th>
            <th>FECHA DE INICIO DE CONTRATO</th>
            <th>FECHA CANCELACIÓN DEL CONTRATO</th>
            <th>MZ (CLIENTE)</th>
            <th>LT (CLIENTE)</th>
            <th>AREA EN LETRAS (CLIENTE)</th>
            <th>AREA DEL LOTE (CLIENTE)</th>
            <th>CUOTA IDEAL EN LETRAS </th>
            <th>CUOTA IDEAL (CLIENTE)</th>
            <th>POR EL FRENTE</th>
            <th>POR LA DERECHA</th>
            <th>POR LA IZQUIERDA</th>
            <th>POR EL FONDO</th>
            <th>Nº IDENTIF. (CLIENTE)</th>
            <th>TIPO DOC. (CLIENTE)</th>
            <th>NOMBRES Y APELLIDOS (CLIENTE)</th>
            <th>NACIONALIDAD (CLIENTE)</th>
            <th>ESTADO CIVIL (CLIENTE)</th>
            <th>ESTADO CIVIL (COMPRADORES)</th>
            <th>DIRECCION - COMPRADOR (CLIENTE)</th>
            <th>DISTRITO (CLIENTE)</th>
            <th>PROVINCIA (CLIENTE)</th>
            <th>DEPARTAMENTO (CLIENTE)</th>
            <th>OCUPACION</th>
            <th>NUMERO DE DOCUMENTO (CONYUGUE) (CLIENTE)</th>
            <th>TIPO DE DOCUMENTO (CONYUGUE) (CLIENTE)</th>
            <th>NOMBRE COMPLETO (CONYUGUE) (CLIENTE)</th>
            <th>OCUPACIÓN (CONYUGE)</th>
            <th>DOMICILIO (CONYUGE)</th>
            <th>DISTRITO (CONYUGE)</th>
            <th>PROVINCIA (CONYUGE)</th>
            <th>DEPARTAMENTO (CONYUGE)</th>
            <th>COSTO DEL LOTE (CLIENTE) EN NUM</th>
            <th>COSTO DEL LOTE (CLIENTE) EN LETRAS</th>
            <th>CANTIDAD DE CUOTAS (CLIENTE)</th>
            <th>MONTO DE CUOTAS (CLIENTE)</th>
            <th>CANTIDAD CUOTA EXTRAORDINARIA (CLIENTE)</th>
            <th>MONTO DE CUOTA EXTRAORDINARIA (CLIENTE)</th>
            <th>MANT.  MENSUAL EN NUM (CLIENTE)</th>
            <th>MANT.  MENSUAL EN LETRAS (CLIENTE)</th>
            <th>ESTADO DE CUENTA (CLIENTE) (DE TENER DEUDA PONER MONTO)</th>
            <th>MONTO DE DEUDA EN LETRAS (CLIENTE)</th>
            <th>CUOTAS PENDIENTES DE PAGO</th>
            <th>CORREO ELECTRONICO (CLIENTE)</th>
            <th>CELULAR (CLIENTE)</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(fila) in clientes" :key="fila.cliente.idCliente">
            <td>
              <button @click="descargarWordPorTipo(fila)" class="btn-descargar">Descargar</button>
            </td>
            <td>{{ getLote(fila)?.contrato ?? '-'}}</td>
            <td>{{ getLote(fila)?.codigoLoteCliente ?? '-'}}</td>
            <td>{{ getLote(fila)?.idLote ?? '-'}}</td>
            <td>{{ getLote(fila).tipoProyecto ?? '-' }}</td>
            <td>{{ getLote(fila).empresaVende ?? '-' }}</td>
            <td>{{ getLote(fila).rucVendedor ?? '-' }}</td>
            <td>{{ getLote(fila).direccionVendedor ?? '-' }}</td>
            <td>{{ getLote(fila).representanteLegalVendedor ?? '-' }}</td>
            <td>{{ getLote(fila).dniVendedor ?? '-' }}</td>
            <td>{{ getLote(fila).numeroPartidaPoderVendedor ?? '-' }}</td>
            <td>{{ getLote(fila).moneda ?? '-' }}</td>
            <td>{{ getLote(fila).numCuenta ?? '-' }}</td>
            <td>{{ getLote(fila).cci ?? '-' }}</td>
            <td>{{ getLote(fila).fechaSale ?? '-' }}</td>
            <td>{{ getLote(fila).fechaFirmaContratoDefinitivo ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.areaMatrizHas ?? '-'  }}</td>
            <td>{{ getMatriz(fila)?.registrosDE ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.partidaMatriz ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.ubicacion ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.unidadCatastral ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.urbanizacionMatriz ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.distritoMatriz ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.provinciaMatriz ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.departamentoMatriz ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.compraventaMatriz ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.situacionLegal ?? '-' }}</td>
            <td>{{ getLote(fila)?.fechaInicioContrato ?? '-' }}</td>
            <td>{{ getLote(fila)?.fechaCancelacionContrato ?? '-' }}</td>
            <td>{{ getLote(fila)?.manzana ?? '-' }}</td>
            <td>{{ getLote(fila)?.numeroLote ?? '-' }}</td>
            <td>{{ getLote(fila)?.areaLoteLetras ?? '-' }}</td>
            <td>{{ getLote(fila)?.areaLote ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.alicuotaLetras ?? '-' }}</td>
            <td>{{ getMatriz(fila)?.alicuota ?? '-' }}</td>
            <td>{{ getLindero(fila)?.porElFrente ?? '-'}}</td>
            <td>{{ getLindero(fila)?.porLaDerecha ?? '-' }}</td>
            <td>{{ getLindero(fila)?.porLaIzquierda ?? '-' }}</td>
            <td>{{ getLindero(fila)?.porElFondo ?? '-' }}</td>
            <td>{{ fila.cliente.numeroIdentificacion ?? '-'}}</td>
            <td>{{ fila.cliente.documentoIdentificacion ?? '-'}}</td>
            <td>{{ fila.cliente.nombresApellidos ?? '-'}}</td>
            <td>{{ fila.cliente.residencia ?? '-'}}</td>
            <td>{{ fila.cliente.estadoCivil ?? '-'}}</td>
            <td>{{ getCopropietario(fila.cliente).estadoCivilCopropietarios ?? '-'}}</td>
            <td>{{ getCopropietario(fila.cliente).direccionCopropietarios ?? '-'}}</td>
            <td>{{ getConyuge(fila.cliente).distritoConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).provinciaConyuge ?? '-'}}</td>
            <td>{{ getConyuge(fila.cliente).departamentoConyuge ?? '-'}}</td>
            <td>{{ fila.cliente.ocupacion ?? '-'}}</td>
            <td>{{ getConyuge(fila.cliente).numeroIdentificacionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).documentoIdentificacionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).nombresApellidosConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).ocupacionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).direccionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).distritoConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).provinciaConyuge ?? '-' }}</td>
            <td>{{ getConyuge(fila.cliente).departamentoConyuge ?? '-' }}</td>
            <td>{{ getLote(fila).costoLote ?? '-' }}</td>
            <td>{{ getLote(fila).costoLoteLetras ?? '-' }}</td>
            <td>{{ getLote(fila).cantidadCuotas ?? '-' }}</td>
            <td>{{ getLote(fila).montoCuotas ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(fila)?.cantidadCuotaExtraordinaria ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(fila)?.montoCuotaExtraordinaria ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(fila)?.mantenimientoMensual ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(fila)?.mantenimientoMensualLetras ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(fila)?.estadoCuenta ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(fila)?.montoDeudaLetra ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(fila)?.cuotaPendientePago ?? '-' }}</td>
            <td>{{ fila.cliente.correoElectronico ?? '-' }}</td>
            <td>{{ fila.cliente.celularCliente ?? '-' }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/tablas/Tablas.css";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import axios from "axios";
import { ref, onMounted } from "vue";
import { numeroATexto } from "@/data/numeroLetrasConNumeros.js";
import {
  getLote,
  getMatriz,
  getLindero,
  getCuotaExtraordinaria,
  getConyuge,
  getCopropietario,
} from "@/data/funcionesGetTablaClientes.js";

const clientes = ref([]);
const busquedaGlobal = ref("");
const filtros = ref({
  idCliente: "",
  nombresApellidos: "",
  numeroIdentificacion: "",
});

onMounted(async () => {
  await obtenerDatosCombinados();
});

const obtenerDatosCombinados = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/clientes/conlotes", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log(response.data);
    clientes.value = response.data;
  } catch (error) {
    console.error("Error al obtener datos combinados:", error);
    alert("Error al obtener datos de clientes y lotes.");
  }
};

const descargarWordPorTipo = (cliente) => {
  const lote = getLote(cliente);
  const tipoContrato = lote?.contrato ?? "-";

  if (tipoContrato === "T1") {
    descargarWordT1(cliente, lote);
  } else if (tipoContrato === "T2") {
    descargarWordT2(cliente, lote);
  } else if (tipoContrato === "T3") {
    descargarWordT3(cliente, lote);
  } else {
    alert("Tipo de contrato no válido o no definido");
  }
};

const descargarWordT1 = async (cliente) => {
  try {
    const response = await axios.get("/plantillas/plantilla_T1.docx", {
      responseType: "arraybuffer",
    });

    const zip = new PizZip(response.data);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = fecha.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    const anio = fecha.getFullYear();
    const diaTexto = numeroATexto(fecha.getDate()).toUpperCase();
    const anioTexto = numeroATexto(anio).toUpperCase();

    const lote = getLote(cliente);
    const matriz = getMatriz(cliente);
    const conyuge = getConyuge(cliente.cliente);
    const copropietario = getCopropietario(cliente.cliente);
    const lindero = getLindero(cliente);
    const cuotaExtra = getCuotaExtraordinaria(cliente);

    const datos = {
      idCliente: cliente.cliente.idCliente.toString().padStart(5, '0'),
      documentoIdentificacion: (cliente.cliente.documentoIdentificacion ?? '-').toUpperCase(),
      numeroIdentificacion: cliente.cliente.numeroIdentificacion ?? '-',
      correoElectronico: cliente.cliente.correoElectronico ?? '-' ,
      nombresApellidos: (cliente.cliente.nombresApellidos ?? '-').replace(/\s+/g, ' ') .replace(/\r?\n|\r/g, ' ') .toUpperCase().trim(),
      nacionalidad: (cliente.cliente.nacionalidad ?? '-').toUpperCase(),
      estadoCivil: (cliente.cliente.estadoCivil ?? '-').toUpperCase(),
      direccion: (cliente.cliente.direccion ?? '-').toUpperCase(),
      ocupacion: (cliente.cliente.ocupacion ?? '-').toUpperCase(),
      distrito: (cliente.cliente.distrito ?? '-').toUpperCase(),
      provincia: (cliente.cliente.provincia ?? '-').toUpperCase(),
      departamento: (cliente.cliente.departamento ?? '-').toUpperCase(),
      idLote: lote?.idLote ?? '-',
      contrato: (lote?.contrato ?? '-').toUpperCase(),
      tipoProyecto: (lote?.tipoProyecto ?? '-').toUpperCase(),
      manzana: (lote?.manzana ?? '-').toUpperCase(),
      representanteLegal: (lote?.representanteLegalVendedor ?? '-').toUpperCase(),
      empresaVende: (lote?.empresaVende ?? '-').toUpperCase(),
      rucVendedor: lote?.rucVendedor ?? '-',
      numCuenta: lote?.numCuenta ?? '-',
      cci: lote?.cci ?? '-',
      mantenimientoMensual: lote?.mantenimientoMensual ?? '-',
      mantenimientoMensualLetras: (lote?.mantenimientoMensualLetras ?? '-').toUpperCase(),
      cantidadCuotas: lote?.cantidadCuotas ?? '-',
      montoCuotas: lote?.montoCuotas ?? '-',
      pagoInicial: lote?.pagoInicial ?? '-',
      dniVendedor: lote?.dniVendedor ?? '-',
      fechaSale: lote?.fechaSale ?? '-',
      costoLote: lote?.costoLote ?? '-',
      montoLetras: (lote?.montoLetras ?? '-' ).toUpperCase() ,
      areaLote: lote?.areaLote ?? '-',
      areaLoteLetras: (lote?.areaLoteLetras ?? '-' ).toUpperCase() ,
      provinciaMatriz: (lote?.provinciaMatriz ?? '-' ).toUpperCase() ,
      numeroPartidaPoderVendedor: lote?.numeroPartidaPoderVendedor ?? '-',
      direccionVendedor: (lote?.direccionVendedor ?? '-').toUpperCase(),
      alicuota: matriz?.alicuota ?? '-',
      alicuotaLetras: (matriz?.alicuotaLetras ?? '-').toUpperCase(),
      unidadCatastral: (matriz?.unidadCatastral ?? '-' ).toUpperCase(),
      urbanizacionMatriz: (matriz?.urbanizacionMatriz ?? '-' ).toUpperCase(),
      provinciamatriz: (matriz?.provincia ?? '-' ).toUpperCase(),
      distritoMatriz: (matriz?.distrito ?? '-' ).toUpperCase(),
      departamentoMatriz: (matriz?.departamento ?? '-' ).toUpperCase(),
      areaMatrizHas: matriz?.areaMatrizHas ?? '-' ,
      partidaMatriz: matriz?.partidaMatriz ?? '-' ,
      compraventaMatriz: (matriz?.compraventaMatriz ?? '-').toUpperCase() ,
      situacionLegal: (matriz?.situacionLegal ?? '-' ).toUpperCase() ,
      ubicacion: (matriz?.ubicacion ?? '-').toUpperCase(),
      fechaFormatoLegal: `LIMA, A LOS ${dia} (${diaTexto}) DÍAS DEL MES DE ${mes} DEL AÑO ${anio} (${anioTexto}).`,
      idClienteConyuge: conyuge?.idClienteConyuge ?? '-' ,
      nombresApellidosConyuge: (conyuge?.nombresApellidosConyuge ?? '-').toUpperCase() ,
      documentoIdentificacionConyuge: (conyuge?.documentoIdentificacionConyuge ?? '-').toUpperCase() ,
      numeroIdentificacionConyuge: conyuge?.numeroIdentificacionConyuge ?? '-' ,
      ocupacionConyuge: (conyuge?.ocupacionConyuge ?? '-').toUpperCase() ,
      direccionConyuge: (conyuge?.direccionConyuge ?? '-').toUpperCase() ,
      distritoConyuge: (conyuge?.distritoConyuge ?? '-' ).toUpperCase(),
      provinciaConyuge: (conyuge?.provinciaConyuge ?? '-' ).toUpperCase(),
      departamentoConyuge: (conyuge?.departamentoConyuge ?? '-').toUpperCase() ,
      idClienteCopropietarios: copropietario?.idClienteCopropietarios ?? '-' ,
      nombresApellidosCopropietarios: (copropietario?.nombresApellidosCopropietarios ?? '-').toUpperCase() ,
      numeroIdentificacionCopropietarios: (copropietario?.numeroIdentificacionCopropietarios ?? '-').toUpperCase() ,
      ocupacionCopropietarios: (copropietario?.ocupacionCopropietarios ?? '-').toUpperCase() ,
      documentoIdentificacionCopropietarios: (copropietario?.documentoIdentificacionCopropietarios ?? '-').toUpperCase() ,
      direccionCopropietarios: (copropietario?.direccionCopropietarios ?? '-').toUpperCase() ,
      distritoCopropietarios: (copropietario?.distritoCopropietarios ?? '-').toUpperCase() ,
      provinciaCopropietarios: (copropietario?.provinciaCopropietarios ?? '-').toUpperCase() ,
      departamentoCopropietarios: (copropietario?.departamentoCopropietarios ?? '-').toUpperCase() ,
      estadoCivilCopropietarios: (copropietario?.estadoCivilCopropietarios ?? '-').toUpperCase() ,
      porElFrente: lindero?.porElFrente ?? '-' ,
      porLaDerecha: lindero?.porLaDerecha ?? '-' ,
      porLaIzquierda: lindero?.porLaIzquierda ?? '-' ,
      porElFondo: lindero?.porElFondo ?? '-' ,
      cantidadCuotaExtraordinaria: cuotaExtra?.cantidadCuotaExtraordinaria ?? '-' ,
      montoCuotaExtraordinaria: cuotaExtra?.montoCuotaExtraordinaria ?? '-' ,
    };

    doc.setData(datos);

    try {
      doc.render();
    } catch (error) {
      console.error("Error al renderizar el documento:", error);
      alert("Error al generar el documento Word");
      return;
    }

    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, `Contrato_T1_${cliente.cliente.nombresApellidos}.docx`);
  } catch (error) {
    console.error("Error al descargar plantilla:", error);
    alert("No se pudo descargar o procesar la plantilla");
  }
};

const descargarWordT2 = async (cliente) => {
  try {
    const response = await axios.get("/plantillas/plantilla_T2.docx", {
      responseType: "arraybuffer",
    });

    const zip = new PizZip(response.data);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = fecha.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    const anio = fecha.getFullYear();
    const diaTexto = numeroATexto(fecha.getDate()).toUpperCase();
    const anioTexto = numeroATexto(anio).toUpperCase();

    const lote = getLote(cliente);
    const matriz = getMatriz(cliente);
    const conyuge = getConyuge(cliente.cliente);
    const copropietario = getCopropietario(cliente.cliente);
    const lindero = getLindero(cliente);
    const cuotaExtra = getCuotaExtraordinaria(cliente);

    const datos = {
      idCliente: cliente.cliente.idCliente.toString().padStart(5, '0'),
      documentoIdentificacion: (cliente.cliente.documentoIdentificacion ?? '-').toUpperCase(),
      numeroIdentificacion: cliente.cliente.numeroIdentificacion ?? '-',
      correoElectronico: cliente.cliente.correoElectronico ?? '-' ,
      nombresApellidos: (cliente.cliente.nombresApellidos ?? '-').replace(/\s+/g, ' ') .replace(/\r?\n|\r/g, ' ') .toUpperCase().trim(),
      nacionalidad: (cliente.cliente.nacionalidad ?? '-').toUpperCase(),
      estadoCivil: (cliente.cliente.estadoCivil ?? '-').toUpperCase(),
      direccion: (cliente.cliente.direccion ?? '-').toUpperCase(),
      ocupacion: (cliente.cliente.ocupacion ?? '-').toUpperCase(),
      distrito: (cliente.cliente.distrito ?? '-').toUpperCase(),
      provincia: (cliente.cliente.provincia ?? '-').toUpperCase(),
      departamento: (cliente.cliente.departamento ?? '-').toUpperCase(),
      idLote: lote?.idLote ?? '-',
      contrato: (lote?.contrato ?? '-').toUpperCase(),
      tipoProyecto: (lote?.tipoProyecto ?? '-').toUpperCase(),
      manzana: (lote?.manzana ?? '-').toUpperCase(),
      representanteLegal: (lote?.representanteLegalVendedor ?? '-').toUpperCase(),
      empresaVende: (lote?.empresaVende ?? '-').toUpperCase(),
      rucVendedor: lote?.rucVendedor ?? '-',
      numCuenta: lote?.numCuenta ?? '-',
      cci: lote?.cci ?? '-',
      mantenimientoMensual: lote?.mantenimientoMensual ?? '-',
      mantenimientoMensualLetras: (lote?.mantenimientoMensualLetras ?? '-').toUpperCase(),
      cantidadCuotas: lote?.cantidadCuotas ?? '-',
      montoCuotas: lote?.montoCuotas ?? '-',
      pagoInicial: lote?.pagoInicial ?? '-',
      dniVendedor: lote?.dniVendedor ?? '-',
      fechaSale: lote?.fechaSale ?? '-',
      costoLote: lote?.costoLote ?? '-',
      montoLetras: (lote?.montoLetras ?? '-' ).toUpperCase() ,
      areaLote: lote?.areaLote ?? '-',
      areaLoteLetras: (lote?.areaLoteLetras ?? '-' ).toUpperCase() ,
      provinciaMatriz: (lote?.provinciaMatriz ?? '-' ).toUpperCase() ,
      numeroPartidaPoderVendedor: lote?.numeroPartidaPoderVendedor ?? '-',
      direccionVendedor: (lote?.direccionVendedor ?? '-').toUpperCase(),
      alicuota: matriz?.alicuota ?? '-',
      alicuotaLetras: (matriz?.alicuotaLetras ?? '-').toUpperCase(),
      unidadCatastral: (matriz?.unidadCatastral ?? '-' ).toUpperCase(),
      urbanizacionMatriz: (matriz?.urbanizacionMatriz ?? '-' ).toUpperCase(),
      provinciamatriz: (matriz?.provincia ?? '-' ).toUpperCase(),
      distritoMatriz: (matriz?.distrito ?? '-' ).toUpperCase(),
      departamentoMatriz: (matriz?.departamento ?? '-' ).toUpperCase(),
      areaMatrizHas: matriz?.areaMatrizHas ?? '-' ,
      partidaMatriz: matriz?.partidaMatriz ?? '-' ,
      compraventaMatriz: (matriz?.compraventaMatriz ?? '-').toUpperCase() ,
      situacionLegal: (matriz?.situacionLegal ?? '-' ).toUpperCase() ,
      ubicacion: (matriz?.ubicacion ?? '-').toUpperCase(),
      fechaFormatoLegal: `LIMA, A LOS ${dia} (${diaTexto}) DÍAS DEL MES DE ${mes} DEL AÑO ${anio} (${anioTexto}).`,
      idClienteConyuge: conyuge?.idClienteConyuge ?? '-' ,
      nombresApellidosConyuge: (conyuge?.nombresApellidosConyuge ?? '-').toUpperCase() ,
      documentoIdentificacionConyuge: (conyuge?.documentoIdentificacionConyuge ?? '-').toUpperCase() ,
      numeroIdentificacionConyuge: conyuge?.numeroIdentificacionConyuge ?? '-' ,
      ocupacionConyuge: (conyuge?.ocupacionConyuge ?? '-').toUpperCase() ,
      direccionConyuge: (conyuge?.direccionConyuge ?? '-').toUpperCase() ,
      distritoConyuge: (conyuge?.distritoConyuge ?? '-' ).toUpperCase(),
      provinciaConyuge: (conyuge?.provinciaConyuge ?? '-' ).toUpperCase(),
      departamentoConyuge: (conyuge?.departamentoConyuge ?? '-').toUpperCase() ,
      idClienteCopropietarios: copropietario?.idClienteCopropietarios ?? '-' ,
      nombresApellidosCopropietarios: (copropietario?.nombresApellidosCopropietarios ?? '-').toUpperCase() ,
      numeroIdentificacionCopropietarios: (copropietario?.numeroIdentificacionCopropietarios ?? '-').toUpperCase() ,
      ocupacionCopropietarios: (copropietario?.ocupacionCopropietarios ?? '-').toUpperCase() ,
      documentoIdentificacionCopropietarios: (copropietario?.documentoIdentificacionCopropietarios ?? '-').toUpperCase() ,
      direccionCopropietarios: (copropietario?.direccionCopropietarios ?? '-').toUpperCase() ,
      distritoCopropietarios: (copropietario?.distritoCopropietarios ?? '-').toUpperCase() ,
      provinciaCopropietarios: (copropietario?.provinciaCopropietarios ?? '-').toUpperCase() ,
      departamentoCopropietarios: (copropietario?.departamentoCopropietarios ?? '-').toUpperCase() ,
      estadoCivilCopropietarios: (copropietario?.estadoCivilCopropietarios ?? '-').toUpperCase() ,
      porElFrente: lindero?.porElFrente ?? '-' ,
      porLaDerecha: lindero?.porLaDerecha ?? '-' ,
      porLaIzquierda: lindero?.porLaIzquierda ?? '-' ,
      porElFondo: lindero?.porElFondo ?? '-' ,
      cantidadCuotaExtraordinaria: cuotaExtra?.cantidadCuotaExtraordinaria ?? '-' ,
      montoCuotaExtraordinaria: cuotaExtra?.montoCuotaExtraordinaria ?? '-' ,
    };

    doc.setData(datos);

    try {
      doc.render();
    } catch (error) {
      console.error("Error al renderizar el documento:", error);
      alert("Error al generar el documento Word");
      return;
    }

    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, `Contrato_T2_${cliente.cliente.nombresApellidos}.docx`);
  } catch (error) {
    console.error("Error al descargar plantilla:", error);
    alert("No se pudo descargar o procesar la plantilla");
  }
};


const descargarWordT3 = async (cliente) => {
  try {
    const response = await axios.get("/plantillas/plantilla_T3.docx", {
      responseType: "arraybuffer",
    });

    const zip = new PizZip(response.data);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = fecha.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    const anio = fecha.getFullYear();
    const diaTexto = numeroATexto(fecha.getDate()).toUpperCase();
    const anioTexto = numeroATexto(anio).toUpperCase();

    const lote = getLote(cliente);
    const matriz = getMatriz(cliente);
    const conyuge = getConyuge(cliente.cliente);
    const copropietario = getCopropietario(cliente.cliente);
    const lindero = getLindero(cliente);
    const cuotaExtra = getCuotaExtraordinaria(cliente);

    const datos = {
      idCliente: cliente.cliente.idCliente.toString().padStart(5, '0'),
      documentoIdentificacion: (cliente.cliente.documentoIdentificacion ?? '-').toUpperCase(),
      numeroIdentificacion: cliente.cliente.numeroIdentificacion ?? '-',
      correoElectronico: cliente.cliente.correoElectronico ?? '-' ,
      nombresApellidos: (cliente.cliente.nombresApellidos ?? '-').replace(/\s+/g, ' ') .replace(/\r?\n|\r/g, ' ') .toUpperCase().trim(),
      nacionalidad: (cliente.cliente.nacionalidad ?? '-').toUpperCase(),
      estadoCivil: (cliente.cliente.estadoCivil ?? '-').toUpperCase(),
      direccion: (cliente.cliente.direccion ?? '-').toUpperCase(),
      ocupacion: (cliente.cliente.ocupacion ?? '-').toUpperCase(),
      distrito: (cliente.cliente.distrito ?? '-').toUpperCase(),
      provincia: (cliente.cliente.provincia ?? '-').toUpperCase(),
      departamento: (cliente.cliente.departamento ?? '-').toUpperCase(),
      idLote: lote?.idLote ?? '-',
      contrato: (lote?.contrato ?? '-').toUpperCase(),
      tipoProyecto: (lote?.tipoProyecto ?? '-').toUpperCase(),
      manzana: (lote?.manzana ?? '-').toUpperCase(),
      representanteLegal: (lote?.representanteLegalVendedor ?? '-').toUpperCase(),
      empresaVende: (lote?.empresaVende ?? '-').toUpperCase(),
      rucVendedor: lote?.rucVendedor ?? '-',
      numCuenta: lote?.numCuenta ?? '-',
      cci: lote?.cci ?? '-',
      mantenimientoMensual: lote?.mantenimientoMensual ?? '-',
      mantenimientoMensualLetras: (lote?.mantenimientoMensualLetras ?? '-').toUpperCase(),
      cantidadCuotas: lote?.cantidadCuotas ?? '-',
      montoCuotas: lote?.montoCuotas ?? '-',
      pagoInicial: lote?.pagoInicial ?? '-',
      dniVendedor: lote?.dniVendedor ?? '-',
      fechaSale: lote?.fechaSale ?? '-',
      costoLote: lote?.costoLote ?? '-',
      montoLetras: (lote?.montoLetras ?? '-' ).toUpperCase() ,
      areaLote: lote?.areaLote ?? '-',
      areaLoteLetras: (lote?.areaLoteLetras ?? '-' ).toUpperCase() ,
      provinciaMatriz: (lote?.provinciaMatriz ?? '-' ).toUpperCase() ,
      numeroPartidaPoderVendedor: lote?.numeroPartidaPoderVendedor ?? '-',
      direccionVendedor: (lote?.direccionVendedor ?? '-').toUpperCase(),
      alicuota: matriz?.alicuota ?? '-',
      alicuotaLetras: (matriz?.alicuotaLetras ?? '-').toUpperCase(),
      unidadCatastral: (matriz?.unidadCatastral ?? '-' ).toUpperCase(),
      urbanizacionMatriz: (matriz?.urbanizacionMatriz ?? '-' ).toUpperCase(),
      provinciamatriz: (matriz?.provincia ?? '-' ).toUpperCase(),
      distritoMatriz: (matriz?.distrito ?? '-' ).toUpperCase(),
      departamentoMatriz: (matriz?.departamento ?? '-' ).toUpperCase(),
      areaMatrizHas: matriz?.areaMatrizHas ?? '-' ,
      partidaMatriz: matriz?.partidaMatriz ?? '-' ,
      compraventaMatriz: (matriz?.compraventaMatriz ?? '-').toUpperCase() ,
      situacionLegal: (matriz?.situacionLegal ?? '-' ).toUpperCase() ,
      ubicacion: (matriz?.ubicacion ?? '-').toUpperCase(),
      fechaFormatoLegal: `LIMA, A LOS ${dia} (${diaTexto}) DÍAS DEL MES DE ${mes} DEL AÑO ${anio} (${anioTexto}).`,
      idClienteConyuge: conyuge?.idClienteConyuge ?? '-' ,
      nombresApellidosConyuge: (conyuge?.nombresApellidosConyuge ?? '-').toUpperCase() ,
      documentoIdentificacionConyuge: (conyuge?.documentoIdentificacionConyuge ?? '-').toUpperCase() ,
      numeroIdentificacionConyuge: conyuge?.numeroIdentificacionConyuge ?? '-' ,
      ocupacionConyuge: (conyuge?.ocupacionConyuge ?? '-').toUpperCase() ,
      direccionConyuge: (conyuge?.direccionConyuge ?? '-').toUpperCase() ,
      distritoConyuge: (conyuge?.distritoConyuge ?? '-' ).toUpperCase(),
      provinciaConyuge: (conyuge?.provinciaConyuge ?? '-' ).toUpperCase(),
      departamentoConyuge: (conyuge?.departamentoConyuge ?? '-').toUpperCase() ,
      idClienteCopropietarios: copropietario?.idClienteCopropietarios ?? '-' ,
      nombresApellidosCopropietarios: (copropietario?.nombresApellidosCopropietarios ?? '-').toUpperCase() ,
      numeroIdentificacionCopropietarios: (copropietario?.numeroIdentificacionCopropietarios ?? '-').toUpperCase() ,
      ocupacionCopropietarios: (copropietario?.ocupacionCopropietarios ?? '-').toUpperCase() ,
      documentoIdentificacionCopropietarios: (copropietario?.documentoIdentificacionCopropietarios ?? '-').toUpperCase() ,
      direccionCopropietarios: (copropietario?.direccionCopropietarios ?? '-').toUpperCase() ,
      distritoCopropietarios: (copropietario?.distritoCopropietarios ?? '-').toUpperCase() ,
      provinciaCopropietarios: (copropietario?.provinciaCopropietarios ?? '-').toUpperCase() ,
      departamentoCopropietarios: (copropietario?.departamentoCopropietarios ?? '-').toUpperCase() ,
      estadoCivilCopropietarios: (copropietario?.estadoCivilCopropietarios ?? '-').toUpperCase() ,
      porElFrente: lindero?.porElFrente ?? '-' ,
      porLaDerecha: lindero?.porLaDerecha ?? '-' ,
      porLaIzquierda: lindero?.porLaIzquierda ?? '-' ,
      porElFondo: lindero?.porElFondo ?? '-' ,
      cantidadCuotaExtraordinaria: cuotaExtra?.cantidadCuotaExtraordinaria ?? '-' ,
      montoCuotaExtraordinaria: cuotaExtra?.montoCuotaExtraordinaria ?? '-' ,
    };

    doc.setData(datos);

    try {
      doc.render();
    } catch (error) {
      console.error("Error al renderizar el documento:", error);
      alert("Error al generar el documento Word");
      return;
    }

    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, `Contrato_T3_${cliente.cliente.nombresApellidos}.docx`);
  } catch (error) {
    console.error("Error al descargar plantilla:", error);
    alert("No se pudo descargar o procesar la plantilla");
  }
};

</script>
