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
            <th>PAGO INICIAL (CLIENTE) INCLUIDO SEPARACION</th>
            <th>SEPARACIÓN (CLIENTE)</th>
            <th>CANTIDAD DE CUOTAS (CLIENTE)</th>
            <th>MONTO DE CUOTAS (CLIENTE)</th>
            <th>CANTIDAD CUOTA EXTRAORDINARIA (CLIENTE)</th>
            <th>MONTO DE CUOTA EXTRAORDINARIA (CLIENTE)</th>
            <th>MANT.  MENSUAL EN NUM (CLIENTE)</th>
            <th>MANT.  MENSUAL EN LETRAS (CLIENTE)</th>
            <th>ESTADO DE CUENTA (CLIENTE) (DE TENER DEUDA PONER MONTO)</th>
            <th>MONTO DE DEUDA EN LETRAS (CLIENTE)</th>
            <th>CUOTAS PENDIENTES DE PAGO</th>
            <th>DIA DE PAGO EN NUMERO Y LETRAS</th>
            <th>CORREO ELECTRONICO (CLIENTE)</th>
            <th>CELULAR (CLIENTE)</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(cliente) in clientes" :key="cliente.idCliente">
            <td>
              <button @click="descargarWordPorTipo(cliente)" class="btn-descargar">Descargar</button>
            </td>
            <td>{{ getLote(cliente)?.contrato ?? '-'}}</td>
            <td>{{ getLote(cliente)?.codigoLoteCliente ?? '-'}}</td>
            <td>{{ getLote(cliente)?.idLote ?? '-'}}</td>
            <td>{{ getLote(cliente).tipoProyecto ?? '-' }}</td>
            <td>{{ getLote(cliente).empresaVende ?? '-' }}</td>
            <td>{{ getLote(cliente).rucVendedor ?? '-' }}</td>
            <td>{{ getLote(cliente).direccionVendedor ?? '-' }}</td>
            <td>{{ getLote(cliente).representanteLegalVendedor ?? '-' }}</td>
            <td>{{ getLote(cliente).dniVendedor ?? '-' }}</td>
            <td>{{ getLote(cliente).numeroPartidaPoderVendedor ?? '-' }}</td>
            <td>{{ getLote(cliente).moneda ?? '-' }}</td>
            <td>{{ getLote(cliente).numCuenta ?? '-' }}</td>
            <td>{{ getLote(cliente).cci ?? '-' }}</td>
            <td>{{ getLote(cliente).fechaSale ?? '-' }}</td>
            <td>{{ getLote(cliente).fechaFirmaContratoDefinitivo ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.areaMatrizHas ?? '-'  }}</td>
            <td>{{ getMatriz(getLote(cliente))?.registrosDE ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.partidaMatriz ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.ubicacion ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.unidadCatastral ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.urbanizacionMatriz ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.distrito ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.provincia ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.departamento ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.compraventaMatriz ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.situacionLegal ?? '-' }}</td>
            <td>{{ getLote(cliente)?.fechaInicioContrato ?? '-' }}</td>
            <td>{{ getLote(cliente)?.fechaCancelacionContrato ?? '-' }}</td>
            <td>{{ getLote(cliente)?.manzana ?? '-' }}</td>
            <td>{{ getLote(cliente)?.numeroLote ?? '-' }}</td>
            <td>{{ getLote(cliente)?.areaLoteLetras ?? '-' }}</td>
            <td>{{ getLote(cliente)?.areaLote ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.alicuotaLetras ?? '-' }}</td>
            <td>{{ getMatriz(getLote(cliente))?.alicuota ?? '-' }}</td>
            <td>{{ getLindero(getLote(cliente))?.porElFrente ?? '-'}}</td>
            <td>{{ getLindero(getLote(cliente))?.porLaDerecha ?? '-' }}</td>
            <td>{{ getLindero(getLote(cliente))?.porLaIzquierda ?? '-' }}</td>
            <td>{{ getLindero(getLote(cliente))?.porElFondo ?? '-' }}</td>
            <td>{{ cliente.cliente.numeroIdentificacion ?? '-'}}</td>
            <td>{{ cliente.cliente.documentoIdentificacion ?? '-'}}</td>
            <td>{{ cliente.cliente.nombresApellidos ?? '-'}}</td>
            <td>{{ cliente.cliente.residencia ?? '-'}}</td>
            <td>{{ cliente.cliente.estadoCivil ?? '-'}}</td>
            <td>{{ getCopropietario(cliente.cliente).estadoCivilCopropietarios ?? '-'}}</td>
            <td>{{ getCopropietario(cliente.cliente).direccionCopropietarios ?? '-'}}</td>
            <td>{{ getConyuge(cliente.cliente).distritoConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).provinciaConyuge ?? '-'}}</td>
            <td>{{ getConyuge(cliente.cliente).departamentoConyuge ?? '-'}}</td>
            <td>{{ cliente.cliente.ocupacion ?? '-'}}</td>
            <td>{{ getConyuge(cliente.cliente).numeroIdentificacionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).documentoIdentificacionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).nombresApellidosConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).ocupacionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).direccionConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).distritoConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).provinciaConyuge ?? '-' }}</td>
            <td>{{ getConyuge(cliente.cliente).departamentoConyuge ?? '-' }}</td>
            <td>{{ getLote(cliente).costoLote ?? '-' }}</td>
            <td>{{ getLote(cliente).montoLetras ?? '-' }}</td>
            <td>{{ getLote(cliente).pagoInicial ?? '-' }}</td>
            <td>{{ getLote(cliente).separacion ?? '-' }}</td>
            <td>{{ getLote(cliente).cantidadCuotas ?? '-' }}</td>
            <td>{{ getLote(cliente).montoCuotas ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(getLote(cliente))?.cantidadCuotaExtraordinaria ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(getLote(cliente))?.montoCuotaExtraordinaria ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(getLote(cliente))?.mantenimientoMensual ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(getLote(cliente))?.mantenimientoMensualLetras ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(getLote(cliente))?.estadoCuenta ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(getLote(cliente))?.montoDeudaLetra ?? '-' }}</td>
            <td>{{ getCuotaExtraordinaria(getLote(cliente))?.cuotaPendientePago ?? '-' }}</td>
            <td>{{ cliente.cliente.diaPagoNumero ?? '-' }} </td>
            <td>{{ cliente.cliente.correoElectronico ?? '-' }}</td>
            <td>{{ cliente.cliente.celularCliente ?? '-' }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script >
import "@/assets/tablas/Tablas.css";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import axios from "axios";
import {numeroATexto} from "@/data/numeroLetrasConNumeros.js";

export default {
  data() {
    return {
      clientes: [],
      lotes: [],
      ubicaciones: [],
      busquedaGlobal: "",
      filtros: {
        idCliente: "",
        nombresApellidos: "",
        numeroIdentificacion: ""
      },
    };
  },
  mounted() {
    this.obtenerDatosCombinados();
  },

  methods: {

    async obtenerDatosCombinados() {
      try {
        const response = await axios.get("https://backendcramirez.onrender.com/api/clientes/conlotes", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        console.log(response.data);
        this.clientes = response.data;
      } catch (error) {
        console.error("Error al obtener datos combinados:", error);
        alert("Error al obtener datos de clientes y lotes.");
      }
    },

    // Método para obtener el primer lote o un objeto vacío si no existe
    getLote(cliente) {
      return Array.isArray(cliente.lotes) ? cliente.lotes[0] || {} : {};
    },
    // Método para obtener el primer elemento de la matriz o un objeto vacío
    getMatriz(lote) {
      return Array.isArray(lote.matriz) ? lote.matriz[0] || {} : {};
    },
    // Método para obtener el primer lindero o un objeto vacío
    getLindero(lote) {
      return lote && lote.lindero ? lote.lindero : null;
    },

    getCuotaExtraordinaria(lote) {
      return Array.isArray(lote.cuotasExtraordinarias) && lote.cuotasExtraordinarias.length > 0
          ? lote.cuotasExtraordinarias[0]
          : null;
    },

    // Método para obtener el cónyuge o un objeto vacío si no existe
    getConyuge(cliente) {
      return cliente && cliente.conyuge ? cliente.conyuge : {};
    },

    getCopropietario(cliente) {
      return Array.isArray(cliente.copropietarios) ? cliente.copropietarios[0] || {} : {};
    },


    descargarWordPorTipo(cliente) {
      const lote = this.getLote(cliente);
      const tipoContrato = lote?.contrato ?? "-";

      if (tipoContrato === "T1") {
        this.descargarWordT1(cliente, lote);
      } else if (tipoContrato === "T2") {
        this.descargarWordT2(cliente, lote);
      } else if (tipoContrato === "T3") {
        this.descargarWordT3(cliente, lote);
      } else {
        alert("Tipo de contrato no válido o no definido");
      }
    },

    async descargarWordT1(cliente, lote) {
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
          idLote: this.getLote(cliente)?.idLote ?? '-',
          contrato: (this.getLote(cliente)?.contrato ?? '-').toUpperCase(),
          tipoProyecto: (this.getLote(cliente).tipoProyecto ?? '-').toUpperCase(),
          manzana: (this.getLote(cliente)?.manzana ?? '-').toUpperCase(),
          representanteLegal: (this.getLote(cliente).representanteLegalVendedor ?? '-').toUpperCase(),
          empresaVende: (this.getLote(cliente).empresaVende ?? '-').toUpperCase(),
          rucVendedor: this.getLote(cliente).rucVendedor ?? '-',
          numCuenta: this.getLote(cliente).numCuenta ?? '-',
          cci: this.getLote(cliente).cci ?? '-',
          mantenimientoMensual: this.getLote(cliente).mantenimientoMensual ?? '-',
          mantenimientoMensualLetras: (this.getLote(cliente).mantenimientoMensualLetras ?? '-').toUpperCase(),
          cantidadCuotas: this.getLote(cliente).cantidadCuotas ?? '-',
          montoCuotas: this.getLote(cliente).montoCuotas ?? '-',
          pagoInicial: this.getLote(cliente).pagoInicial ?? '-',
          dniVendedor: this.getLote(cliente).dniVendedor ?? '-',
          fechaSale: this.getLote(cliente).fechaSale ?? '-',
          costoLote: this.getLote(cliente).costoLote ?? '-',
          montoLetras: (this.getLote(cliente).montoLetras ?? '-' ).toUpperCase() ,
          areaLote: this.getLote(cliente)?.areaLote ?? '-',
          areaLoteLetras: (this.getLote(cliente)?.areaLoteLetras ?? '-' ).toUpperCase() ,
          provinciaMatriz: (this.getLote(cliente)?.provinciaMatriz ?? '-' ).toUpperCase() ,
          numeroPartidaPoderVendedor: this.getLote(cliente).numeroPartidaPoderVendedor ?? '-',
          direccionVendedor: (this.getLote(cliente).direccionVendedor ?? '-').toUpperCase(),
          alicuota: this.getMatriz(this.getLote(cliente))?.alicuota ?? '-',
          alicuotaLetras: (this.getMatriz(this.getLote(cliente))?.alicuotaLetras ?? '-').toUpperCase(),
          unidadCatastral: (this.getMatriz(this.getLote(cliente))?.unidadCatastral ?? '-' ).toUpperCase(),
          urbanizacionMatriz: (this.getMatriz(this.getLote(cliente))?.urbanizacionMatriz ?? '-' ).toUpperCase(),
          provinciamatriz: (this.getMatriz(this.getLote(cliente))?.provincia ?? '-' ).toUpperCase(),
          distritoMatriz: (this.getMatriz(this.getLote(cliente))?.distrito ?? '-' ).toUpperCase(),
          departamentoMatriz: (this.getMatriz(this.getLote(cliente))?.departamento ?? '-' ).toUpperCase(),
          areaMatrizHas:this.getMatriz(this.getLote(cliente))?.areaMatrizHas ?? '-' ,
          partidaMatriz:this.getMatriz(this.getLote(cliente))?.partidaMatriz ?? '-' ,
          compraventaMatriz:(this.getMatriz(this.getLote(cliente))?.compraventaMatriz ?? '-').toUpperCase() ,
          situacionLegal:(this.getMatriz(this.getLote(cliente))?.situacionLegal ?? '-' ).toUpperCase() ,
          ubicacion: (this.getMatriz(this.getLote(cliente))?.ubicacion ?? '-').toUpperCase(),
          fechaFormatoLegal: `LIMA, A LOS ${dia} (${diaTexto}) DÍAS DEL MES DE ${mes} DEL AÑO ${anio} (${anioTexto}).`,
          idClienteConyuge: this.getConyuge(cliente.cliente).idClienteConyuge ?? '-' ,
          nombresApellidosConyuge: (this.getConyuge(cliente.cliente).nombresApellidosConyuge ?? '-').toUpperCase() ,
          documentoIdentificacionConyuge: (this.getConyuge(cliente.cliente).documentoIdentificacionConyuge ?? '-').toUpperCase() ,
          numeroIdentificacionConyuge: this.getConyuge(cliente.cliente).numeroIdentificacionConyuge ?? '-' ,
          ocupacionConyuge: (this.getConyuge(cliente.cliente).ocupacionConyuge ?? '-').toUpperCase() ,
          direccionConyuge: (this.getConyuge(cliente.cliente).direccionConyuge ?? '-').toUpperCase() ,
          distritoConyuge: (this.getConyuge(cliente.cliente).distritoConyuge ?? '-' ).toUpperCase(),
          provinciaConyuge: (this.getConyuge(cliente.cliente).provinciaConyuge ?? '-' ).toUpperCase(),
          departamentoConyuge: (this.getConyuge(cliente.cliente).departamentoConyuge ?? '-').toUpperCase() ,
          idClienteCopropietarios: this.getCopropietario(cliente.cliente).idClienteCopropietarios ?? '-' ,
          nombresApellidosCopropietarios: (this.getCopropietario(cliente.cliente).nombresApellidosCopropietarios ?? '-').toUpperCase() ,
          numeroIdentificacionCopropietarios: (this.getCopropietario(cliente.cliente).numeroIdentificacionCopropietarios ?? '-').toUpperCase() ,
          ocupacionCopropietarios: (this.getCopropietario(cliente.cliente).ocupacionCopropietarios ?? '-').toUpperCase() ,
          documentoIdentificacionCopropietarios: (this.getCopropietario(cliente.cliente).documentoIdentificacionCopropietarios ?? '-').toUpperCase() ,
          direccionCopropietarios: (this.getCopropietario(cliente.cliente).direccionCopropietarios ?? '-').toUpperCase() ,
          distritoCopropietarios: (this.getCopropietario(cliente.cliente).distritoCopropietarios ?? '-').toUpperCase() ,
          provinciaCopropietarios: (this.getCopropietario(cliente.cliente).provinciaCopropietarios ?? '-').toUpperCase() ,
          departamentoCopropietarios: (this.getCopropietario(cliente.cliente).departamentoCopropietarios ?? '-').toUpperCase() ,
          estadoCivilCopropietarios: (this.getCopropietario(cliente.cliente).estadoCivilCopropietarios ?? '-').toUpperCase() ,
          porElFrente: this.getLindero(this.getLote(cliente))?.porElFrente ?? '-' ,
          porLaDerecha: this.getLindero(this.getLote(cliente))?.porLaDerecha ?? '-' ,
          porLaIzquierda: this.getLindero(this.getLote(cliente))?.porLaIzquierda ?? '-' ,
          porElFondo: this.getLindero(this.getLote(cliente))?.porElFondo ?? '-' ,
          cantidadCuotaExtraordinaria: this.getCuotaExtraordinaria(this.getLote(cliente))?.cantidadCuotaExtraordinaria ?? '-' ,
          montoCuotaExtraordinaria: this.getCuotaExtraordinaria(this.getLote(cliente))?.montoCuotaExtraordinaria ?? '-' ,
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
          mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(out, `Contrato_T1_${cliente.cliente.nombresApellidos}.docx`);
      } catch (error) {
        console.error("Error al descargar plantilla:", error);
        alert("No se pudo descargar o procesar la plantilla");
      }
    },

    async descargarWordT2(cliente, lote) {
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
          idLote: this.getLote(cliente)?.idLote ?? '-',
          contrato: (this.getLote(cliente)?.contrato ?? '-').toUpperCase(),
          tipoProyecto: (this.getLote(cliente).tipoProyecto ?? '-').toUpperCase(),
          manzana: (this.getLote(cliente)?.manzana ?? '-').toUpperCase(),
          representanteLegal: (this.getLote(cliente).representanteLegalVendedor ?? '-').toUpperCase(),
          empresaVende: (this.getLote(cliente).empresaVende ?? '-').toUpperCase(),
          rucVendedor: this.getLote(cliente).rucVendedor ?? '-',
          numCuenta: this.getLote(cliente).numCuenta ?? '-',
          cci: this.getLote(cliente).cci ?? '-',
          mantenimientoMensual: this.getLote(cliente).mantenimientoMensual ?? '-',
          mantenimientoMensualLetras: (this.getLote(cliente).mantenimientoMensualLetras ?? '-').toUpperCase(),
          cantidadCuotas: this.getLote(cliente).cantidadCuotas ?? '-',
          montoCuotas: this.getLote(cliente).montoCuotas ?? '-',
          pagoInicial: this.getLote(cliente).pagoInicial ?? '-',
          dniVendedor: this.getLote(cliente).dniVendedor ?? '-',
          fechaSale: this.getLote(cliente).fechaSale ?? '-',
          costoLote: this.getLote(cliente).costoLote ?? '-',
          montoLetras: (this.getLote(cliente).montoLetras ?? '-' ).toUpperCase() ,
          areaLote: this.getLote(cliente)?.areaLote ?? '-',
          areaLoteLetras: (this.getLote(cliente)?.areaLoteLetras ?? '-' ).toUpperCase() ,
          provinciaMatriz: (this.getLote(cliente)?.provinciaMatriz ?? '-' ).toUpperCase() ,
          numeroPartidaPoderVendedor: this.getLote(cliente).numeroPartidaPoderVendedor ?? '-',
          direccionVendedor: (this.getLote(cliente).direccionVendedor ?? '-').toUpperCase(),
          alicuota: this.getMatriz(this.getLote(cliente))?.alicuota ?? '-',
          alicuotaLetras: (this.getMatriz(this.getLote(cliente))?.alicuotaLetras ?? '-').toUpperCase(),
          unidadCatastral: (this.getMatriz(this.getLote(cliente))?.unidadCatastral ?? '-' ).toUpperCase(),
          urbanizacionMatriz: (this.getMatriz(this.getLote(cliente))?.urbanizacionMatriz ?? '-' ).toUpperCase(),
          provinciamatriz: (this.getMatriz(this.getLote(cliente))?.provincia ?? '-' ).toUpperCase(),
          distritoMatriz: (this.getMatriz(this.getLote(cliente))?.distrito ?? '-' ).toUpperCase(),
          departamentoMatriz: (this.getMatriz(this.getLote(cliente))?.departamento ?? '-' ).toUpperCase(),
          areaMatrizHas:this.getMatriz(this.getLote(cliente))?.areaMatrizHas ?? '-' ,
          partidaMatriz:this.getMatriz(this.getLote(cliente))?.partidaMatriz ?? '-' ,
          compraventaMatriz:(this.getMatriz(this.getLote(cliente))?.compraventaMatriz ?? '-').toUpperCase() ,
          situacionLegal:(this.getMatriz(this.getLote(cliente))?.situacionLegal ?? '-' ).toUpperCase() ,
          ubicacion: (this.getMatriz(this.getLote(cliente))?.ubicacion ?? '-').toUpperCase(),
          fechaFormatoLegal: `LIMA, A LOS ${dia} (${diaTexto}) DÍAS DEL MES DE ${mes} DEL AÑO ${anio} (${anioTexto}).`,
          idClienteConyuge: this.getConyuge(cliente.cliente).idClienteConyuge ?? '-' ,
          nombresApellidosConyuge: (this.getConyuge(cliente.cliente).nombresApellidosConyuge ?? '-').toUpperCase() ,
          documentoIdentificacionConyuge: (this.getConyuge(cliente.cliente).documentoIdentificacionConyuge ?? '-').toUpperCase() ,
          numeroIdentificacionConyuge: this.getConyuge(cliente.cliente).numeroIdentificacionConyuge ?? '-' ,
          ocupacionConyuge: (this.getConyuge(cliente.cliente).ocupacionConyuge ?? '-').toUpperCase() ,
          direccionConyuge: (this.getConyuge(cliente.cliente).direccionConyuge ?? '-').toUpperCase() ,
          distritoConyuge: (this.getConyuge(cliente.cliente).distritoConyuge ?? '-' ).toUpperCase(),
          provinciaConyuge: (this.getConyuge(cliente.cliente).provinciaConyuge ?? '-' ).toUpperCase(),
          departamentoConyuge: (this.getConyuge(cliente.cliente).departamentoConyuge ?? '-').toUpperCase() ,
          idClienteCopropietarios: this.getCopropietario(cliente.cliente).idClienteCopropietarios ?? '-' ,
          nombresApellidosCopropietarios: (this.getCopropietario(cliente.cliente).nombresApellidosCopropietarios ?? '-').toUpperCase() ,
          numeroIdentificacionCopropietarios: (this.getCopropietario(cliente.cliente).numeroIdentificacionCopropietarios ?? '-').toUpperCase() ,
          ocupacionCopropietarios: (this.getCopropietario(cliente.cliente).ocupacionCopropietarios ?? '-').toUpperCase() ,
          documentoIdentificacionCopropietarios: (this.getCopropietario(cliente.cliente).documentoIdentificacionCopropietarios ?? '-').toUpperCase() ,
          direccionCopropietarios: (this.getCopropietario(cliente.cliente).direccionCopropietarios ?? '-').toUpperCase() ,
          distritoCopropietarios: (this.getCopropietario(cliente.cliente).distritoCopropietarios ?? '-').toUpperCase() ,
          provinciaCopropietarios: (this.getCopropietario(cliente.cliente).provinciaCopropietarios ?? '-').toUpperCase() ,
          departamentoCopropietarios: (this.getCopropietario(cliente.cliente).departamentoCopropietarios ?? '-').toUpperCase() ,
          estadoCivilCopropietarios: (this.getCopropietario(cliente.cliente).estadoCivilCopropietarios ?? '-').toUpperCase() ,
          porElFrente: this.getLindero(this.getLote(cliente))?.porElFrente ?? '-' ,
          porLaDerecha: this.getLindero(this.getLote(cliente))?.porLaDerecha ?? '-' ,
          porLaIzquierda: this.getLindero(this.getLote(cliente))?.porLaIzquierda ?? '-' ,
          porElFondo: this.getLindero(this.getLote(cliente))?.porElFondo ?? '-' ,
          cantidadCuotaExtraordinaria: this.getCuotaExtraordinaria(this.getLote(cliente))?.cantidadCuotaExtraordinaria ?? '-' ,
          montoCuotaExtraordinaria: this.getCuotaExtraordinaria(this.getLote(cliente))?.montoCuotaExtraordinaria ?? '-' ,
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
          mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(out, `Contrato_T2_${cliente.cliente.nombresApellidos}.docx`);
      } catch (error) {
        console.error("Error al descargar plantilla:", error);
        alert("No se pudo descargar o procesar la plantilla");
      }
    },

    async descargarWordT3(cliente, lote) {
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
          idLote: this.getLote(cliente)?.idLote ?? '-',
          contrato: (this.getLote(cliente)?.contrato ?? '-').toUpperCase(),
          tipoProyecto: (this.getLote(cliente).tipoProyecto ?? '-').toUpperCase(),
          manzana: (this.getLote(cliente)?.manzana ?? '-').toUpperCase(),
          representanteLegal: (this.getLote(cliente).representanteLegalVendedor ?? '-').toUpperCase(),
          empresaVende: (this.getLote(cliente).empresaVende ?? '-').toUpperCase(),
          rucVendedor: this.getLote(cliente).rucVendedor ?? '-',
          numCuenta: this.getLote(cliente).numCuenta ?? '-',
          cci: this.getLote(cliente).cci ?? '-',
          mantenimientoMensual: this.getLote(cliente).mantenimientoMensual ?? '-',
          mantenimientoMensualLetras: (this.getLote(cliente).mantenimientoMensualLetras ?? '-').toUpperCase(),
          cantidadCuotas: this.getLote(cliente).cantidadCuotas ?? '-',
          montoCuotas: this.getLote(cliente).montoCuotas ?? '-',
          pagoInicial: this.getLote(cliente).pagoInicial ?? '-',
          dniVendedor: this.getLote(cliente).dniVendedor ?? '-',
          fechaSale: this.getLote(cliente).fechaSale ?? '-',
          costoLote: this.getLote(cliente).costoLote ?? '-',
          montoLetras: (this.getLote(cliente).montoLetras ?? '-' ).toUpperCase() ,
          areaLote: this.getLote(cliente)?.areaLote ?? '-',
          areaLoteLetras: (this.getLote(cliente)?.areaLoteLetras ?? '-' ).toUpperCase() ,
          provinciaMatriz: (this.getLote(cliente)?.provinciaMatriz ?? '-' ).toUpperCase() ,
          numeroPartidaPoderVendedor: this.getLote(cliente).numeroPartidaPoderVendedor ?? '-',
          direccionVendedor: (this.getLote(cliente).direccionVendedor ?? '-').toUpperCase(),
          alicuota: this.getMatriz(this.getLote(cliente))?.alicuota ?? '-',
          alicuotaLetras: (this.getMatriz(this.getLote(cliente))?.alicuotaLetras ?? '-').toUpperCase(),
          unidadCatastral: (this.getMatriz(this.getLote(cliente))?.unidadCatastral ?? '-' ).toUpperCase(),
          urbanizacionMatriz: (this.getMatriz(this.getLote(cliente))?.urbanizacionMatriz ?? '-' ).toUpperCase(),
          provinciamatriz: (this.getMatriz(this.getLote(cliente))?.provincia ?? '-' ).toUpperCase(),
          distritoMatriz: (this.getMatriz(this.getLote(cliente))?.distrito ?? '-' ).toUpperCase(),
          departamentoMatriz: (this.getMatriz(this.getLote(cliente))?.departamento ?? '-' ).toUpperCase(),
          areaMatrizHas:this.getMatriz(this.getLote(cliente))?.areaMatrizHas ?? '-' ,
          partidaMatriz:this.getMatriz(this.getLote(cliente))?.partidaMatriz ?? '-' ,
          compraventaMatriz:(this.getMatriz(this.getLote(cliente))?.compraventaMatriz ?? '-').toUpperCase() ,
          situacionLegal:(this.getMatriz(this.getLote(cliente))?.situacionLegal ?? '-' ).toUpperCase() ,
          ubicacion: (this.getMatriz(this.getLote(cliente))?.ubicacion ?? '-').toUpperCase(),
          fechaFormatoLegal: `LIMA, A LOS ${dia} (${diaTexto}) DÍAS DEL MES DE ${mes} DEL AÑO ${anio} (${anioTexto}).`,
          idClienteConyuge: this.getConyuge(cliente.cliente).idClienteConyuge ?? '-' ,
          nombresApellidosConyuge: (this.getConyuge(cliente.cliente).nombresApellidosConyuge ?? '-').toUpperCase() ,
          documentoIdentificacionConyuge: (this.getConyuge(cliente.cliente).documentoIdentificacionConyuge ?? '-').toUpperCase() ,
          numeroIdentificacionConyuge: this.getConyuge(cliente.cliente).numeroIdentificacionConyuge ?? '-' ,
          ocupacionConyuge: (this.getConyuge(cliente.cliente).ocupacionConyuge ?? '-').toUpperCase() ,
          direccionConyuge: (this.getConyuge(cliente.cliente).direccionConyuge ?? '-').toUpperCase() ,
          distritoConyuge: (this.getConyuge(cliente.cliente).distritoConyuge ?? '-' ).toUpperCase(),
          provinciaConyuge: (this.getConyuge(cliente.cliente).provinciaConyuge ?? '-' ).toUpperCase(),
          departamentoConyuge: (this.getConyuge(cliente.cliente).departamentoConyuge ?? '-').toUpperCase() ,
          idClienteCopropietarios: this.getCopropietario(cliente.cliente).idClienteCopropietarios ?? '-' ,
          nombresApellidosCopropietarios: (this.getCopropietario(cliente.cliente).nombresApellidosCopropietarios ?? '-').toUpperCase() ,
          numeroIdentificacionCopropietarios: (this.getCopropietario(cliente.cliente).numeroIdentificacionCopropietarios ?? '-').toUpperCase() ,
          ocupacionCopropietarios: (this.getCopropietario(cliente.cliente).ocupacionCopropietarios ?? '-').toUpperCase() ,
          documentoIdentificacionCopropietarios: (this.getCopropietario(cliente.cliente).documentoIdentificacionCopropietarios ?? '-').toUpperCase() ,
          direccionCopropietarios: (this.getCopropietario(cliente.cliente).direccionCopropietarios ?? '-').toUpperCase() ,
          distritoCopropietarios: (this.getCopropietario(cliente.cliente).distritoCopropietarios ?? '-').toUpperCase() ,
          provinciaCopropietarios: (this.getCopropietario(cliente.cliente).provinciaCopropietarios ?? '-').toUpperCase() ,
          departamentoCopropietarios: (this.getCopropietario(cliente.cliente).departamentoCopropietarios ?? '-').toUpperCase() ,
          estadoCivilCopropietarios: (this.getCopropietario(cliente.cliente).estadoCivilCopropietarios ?? '-').toUpperCase() ,
          porElFrente: this.getLindero(this.getLote(cliente))?.porElFrente ?? '-' ,
          porLaDerecha: this.getLindero(this.getLote(cliente))?.porLaDerecha ?? '-' ,
          porLaIzquierda: this.getLindero(this.getLote(cliente))?.porLaIzquierda ?? '-' ,
          porElFondo: this.getLindero(this.getLote(cliente))?.porElFondo ?? '-' ,
          cantidadCuotaExtraordinaria: this.getCuotaExtraordinaria(this.getLote(cliente))?.cantidadCuotaExtraordinaria ?? '-' ,
          montoCuotaExtraordinaria: this.getCuotaExtraordinaria(this.getLote(cliente))?.montoCuotaExtraordinaria ?? '-' ,
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
          mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(out, `Contrato_T3_${cliente.cliente.nombresApellidos}.docx`);
      } catch (error) {
        console.error("Error al descargar plantilla:", error);
        alert("No se pudo descargar o procesar la plantilla");
      }
    },

  },
};
</script>
