<template>
  <div class="primary-container">
    <div class="secundary-container">
      <div class="items">
        <input
            class="buscador" type="text" v-model="busquedaGlobal" placeholder="Buscar cliente..."/>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>Cliente N°</th>
            <th>Nombre de Cliente</th>
            <th>Tipo Doc. (Cliente)</th>
            <th>Nº Identif. (Cliente)</th>
            <th>Nacionalidad (Cliente)</th>
            <th>Estado Civil (Cliente)</th>
            <th>Direccion (Cliente)</th>
            <th>Distrito-cliente</th>
            <th>Provincia-cliente</th>
            <th>Departamento-cliente</th>
            <th>Ocupacion</th>
            <th>Correo electronico del cliente</th>
            <th>Celular del cliente</th>

          </tr>
          </thead>
          <tbody>
          <template v-for="(cliente, index) in clientes" :key="cliente.idCliente">

            <tr @click="toggleDetalle(index)" style="cursor: pointer;">

              <td>
                <button @click.stop="editarCliente(cliente)">Editar</button>
              </td>

              <td>{{ cliente.cliente.idCliente.toString().padStart(5, '0') }}</td>
              <td>{{ cliente.cliente.nombresApellidos ?? '-' }}</td>
              <td>{{ cliente.cliente.documentoIdentificacion ?? '-'}}</td>
              <td>{{ cliente.cliente.numeroIdentificacion ?? '-'}}</td>
              <td>{{ cliente.cliente.residencia ?? '-'}}</td>
              <td>{{ cliente.cliente.estadoCivil ?? '-'}}</td>
              <td>{{ cliente.cliente.direccion ?? '-'}}</td>
              <td>{{ cliente.cliente.distrito ?? '-' }}</td>
              <td>{{ cliente.cliente.provincia ?? '-'}}</td>
              <td>{{ cliente.cliente.departamento ?? '-'}}</td>
              <td>{{ cliente.cliente.ocupacion ?? '-'}}</td>
              <td>{{ cliente.cliente.correoElectronico  ?? '-'}}</td>
              <td>{{ cliente.cliente.celularCliente  ?? '-'}}</td>
            </tr>

            <tr v-if="cliente.expandido" class="detalle-row">
              <td colspan="7">
                <div class="detalle-grid">
                  <section>
                    <h3>Datos del Lote</h3>
                    <p><strong>Contrato Nº:</strong> {{ getLote(cliente)?.idLote ?? '-' }}</p>
                    <p><strong>Tipo de contrato:</strong> {{ getLote(cliente)?.contrato ?? '-' }}</p>
                    <p><strong>Proyecto:</strong> {{ getLote(cliente)?.tipoProyecto  ?? '-' }}</p>
                    <p><strong>Empresa que vende:</strong> {{ getLote(cliente)?.empresaVende  ?? '-' }}</p>
                    <p><strong>Direccion vendedor:</strong> {{ getLote(cliente)?.direccionVendedor  ?? '-' }}</p>
                    <p><strong>Representante legal-Vendedor:</strong> {{ getLote(cliente)?.representanteLegalVendedor  ?? '-' }}</p>
                    <p><strong>DNI vendedor:</strong> {{ getLote(cliente)?.dniVendedor  ?? '-' }}</p>
                    <p><strong>Numero de partida (Poder Vendedor):</strong> {{ getLote(cliente)?.numeroPartidaPoderVendedor  ?? '-' }}</p>
                    <p><strong>Moneda:</strong> {{ getLote(cliente)?.moneda  ?? '-' }}</p>
                    <p><strong>Num.Cuenta:</strong> {{ getLote(cliente)?.numCuenta  ?? '-' }}</p>
                    <p><strong>CCI:</strong> {{ getLote(cliente)?.cci  ?? '-' }}</p>
                    <p><strong>Fecha Sale:</strong> {{ getLote(cliente)?.fechaSale  ?? '-' }}</p>
                    <p><strong>Fecha de firma de<br> contrato definitivo: </strong> {{ getLote(cliente)?.fechaFirmaContratoDefinitivo  ?? '-' }}</p>
                    <p><strong>RUC vendedor:</strong> {{ getLote(cliente)?.rucVendedor  ?? '-' }}</p>
                    <p><strong>MZ-LT :</strong> {{ getLote(cliente)?.manzana && getLote(cliente)?.numeroLote ? `MZ ${getLote(cliente).manzana} - LT ${getLote(cliente).numeroLote}` : '-' }}</p>
                    <p><strong>MZ :</strong> {{ getLote(cliente)?.manzana ?? '-' }}</p>
                    <p><strong>LT :</strong> {{ getLote(cliente)?.numeroLote ?? '-'}}</p>
                    <p><strong>Área Lote :</strong> {{ getLote(cliente)?.areaLote ?? '-'}}</p>
                    <p><strong>Área de Lote en Letras:</strong> {{ getLote(cliente)?.areaLoteLetras ?? '-'}}</p>
                    <p><strong>Costo de Lote:</strong> {{ getLote(cliente)?.costoLote ?? '-'}}</p>
                    <p><strong>Monto en Letras:</strong> {{ getLote(cliente)?.montoLetras ?? '-'}}</p>
                    <p><strong>Pago inicial Incluido separacion:</strong> {{ getLote(cliente)?.pagoInicial ?? '-'}}</p>
                    <p><strong>Separacion Cliente:</strong> {{ getLote(cliente)?.separacion ?? '-'}}</p>
                    <p><strong>Cantidad de Cuotas:</strong> {{ getLote(cliente)?.cantidadCuotas ?? '-'}}</p>
                    <p><strong>Monto de Cuotas:</strong> {{ getLote(cliente)?.montoCuotas ?? '-'}}</p>
                  </section>

                  <section>
                    <h3>Matriz</h3>
                    <p><strong>Area matriz HAS.:</strong> {{ getMatriz(getLote(cliente))?.areaMatrizHas ?? '-' }}</p>
                    <p><strong>Registros DE:</strong> {{ getMatriz(getLote(cliente))?.registrosDE ?? '-' }}</p>
                    <p><strong>Partida Matriz:</strong> {{ getMatriz(getLote(cliente))?.partidaMatriz ?? '-' }}</p>
                    <p><strong>Ubicacion de lote predio :</strong> {{ getMatriz(getLote(cliente))?.ubicacion ?? '-' }}</p>
                    <p><strong>Unidad catastral :</strong> {{ getMatriz(getLote(cliente))?.unidadCatastral ?? '-' }}</p>
                    <p><strong>Urbanizacion de matriz:</strong> {{ getMatriz(getLote(cliente))?.urbanizacionMatriz ?? '-' }}</p>
                    <p><strong>Distrito:</strong> {{ getMatriz(getLote(cliente))?.distrito ?? '-' }}</p>
                    <p><strong>Provincia:</strong> {{ getMatriz(getLote(cliente))?.provincia ?? '-' }}</p>
                    <p><strong>Departamento:</strong> {{ getMatriz(getLote(cliente))?.departamento ?? '-' }}</p>
                    <p><strong>Compra venta:</strong> {{ getMatriz(getLote(cliente))?.compraventaMatriz ?? '-' }}</p>
                    <p><strong>Situación Legal:</strong> {{ getMatriz(getLote(cliente))?.situacionLegal ?? '-' }}</p>
                    <p><strong>Constancia de no Adeudo Municipal y Mas:</strong> {{ getMatriz(getLote(cliente))?.constancianoadeudo ?? '-' }}</p>
                    <p><strong>Avance Proyecto:</strong> {{ getMatriz(getLote(cliente))?.avanceproyectomatriz ?? '-' }}</p>
                    <p><strong>Cronograma:</strong> {{ getMatriz(getLote(cliente))?.cronogramamatriz ?? '-' }}</p>
                    <p><strong>Fecha Inicio Contrato:</strong> {{ getMatriz(getLote(cliente))?.fechainiciocontrato ?? '-' }}</p>
                    <p><strong>Fecha Cancelación Contrato:</strong> {{ getMatriz(getLote(cliente))?.fechacancelaciondecontrato ?? '-' }}</p>
                    <p><strong>Cuota Ideal (alicuota):</strong> {{ getMatriz(getLote(cliente))?.alicuota ?? '-' }}</p>
                    <p><strong>Cuota Ideal en Letras:</strong> {{ getMatriz(getLote(cliente))?.alicuotaLetras ?? '-' }}</p>
                  </section>


                  <section>
                    <h3>Cuota Extraordinaria</h3>
                    <p><strong>Cantidad de Cuota extraordinaria:</strong> {{ getCuotaExtraordinaria(getLote(cliente))?.cuotaExtraordinaria ?? '-'  }}</p>
                    <p><strong>Monto de Cuota extraordinaria:</strong> {{ getCuotaExtraordinaria(getLote(cliente))?.montoCuotaExtraordinaria ?? '-' }}</p>
                    <p><strong>Mantenimiento mensual en Numeros:</strong> {{ getCuotaExtraordinaria(getLote(cliente))?.mantenimientoMensual ?? '-' }}</p>
                    <p><strong>Mantenimiento mensual en letras:</strong> {{ getCuotaExtraordinaria(getLote(cliente))?.mantenimientoMensualLetras ?? '-' }}</p>
                    <p><strong>Estado de cuenta(de tener deuda poner monto):</strong> {{ getCuotaExtraordinaria(getLote(cliente))?.estadoCuenta ?? '-' }}</p>
                    <p><strong>Monto de deuda en letras:</strong> {{ getCuotaExtraordinaria(getLote(cliente))?.montoDeudaLetra ?? '-' }}</p>
                    <p><strong>Cuotas pendientes de pago:</strong> {{ getCuotaExtraordinaria(getLote(cliente))?.cuotaPendientePago ?? '-' }}</p>
                  </section>

                  <section>
                    <h3>Linderos</h3>
                    <p><strong>Por el Frente:</strong> {{ getLindero(getLote(cliente))?.porElFrente ?? '-' }}</p>
                    <p><strong>Por la Derecha:</strong> {{ getLindero(getLote(cliente))?.porLaDerecha ?? '-' }}</p>
                    <p><strong>Por la Izquierda:</strong> {{ getLindero(getLote(cliente))?.porLaIzquierda ?? '-' }}</p>
                    <p><strong>Por el Fondo:</strong> {{ getLindero(getLote(cliente))?.porElFondo ?? '-'  }}</p>
                  </section>

                  <section>
                    <h3>Datos Varios</h3>
                    <p><strong>Día de Pago (Número):</strong> {{ cliente.diaPagoNumero ?? '-' }}</p>
                    <p><strong>Día de Pago (Letras):</strong> {{ cliente.diaPagoLetras ?? '-' }}</p>
                    <p><strong>Carta de No Adeudo:</strong> {{ cliente.cartaNoAdeuda ?? '-' }}</p>
                    <p><strong>Certificado de Lote:</strong> {{ cliente.certificadoLote ?? '-' }}</p>
                    <p><strong>Medios de Pago:</strong> {{ cliente.mediosDePago ?? '-' }}</p>
                    <p><strong>Plano 1:</strong> {{ cliente.plano1 ?? '-' }}</p>
                    <p><strong>Plano 2:</strong> {{ cliente.plano2 ?? '-' }}</p>
                    <p><strong>Envío de Minuta:</strong> {{ cliente.envioMinuta ?? '-' }}</p>
                    <p><strong>Fecha de Cita:</strong> {{ cliente.fechaCita ?? '-' }}</p>
                    <p><strong>Hora de Cita:</strong> {{ cliente.horaCita ?? '-' }}</p>
                    <p><strong>N° Atención Intranet:</strong> {{ cliente.numeroAtencionIntranet ?? '-' }}</p>
                    <p><strong>Modificación de Minuta:</strong> {{ cliente.modificacionMinuta ?? '-' }}</p>
                    <p><strong>Minuta Escaneada/Firmada:</strong> {{ cliente.minutaEscaneadaFirmado ?? '-' }}</p>
                    <p><strong>Exp. Notaría:</strong> {{ cliente.expNotaria ?? '-' }}</p>
                    <p><strong>¿Firmó o No Firmó?:</strong> {{ cliente.firmoONoFirmo ?? '-' }}</p>
                  </section>
                </div>
              </td>
            </tr>
          </template>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script >
import "@/assets/tablas/Tablas.css";
import axios from "axios";
import * as XLSX from "xlsx";
import {ubicaciones} from "@/data/ubicaciones.js";


export default {
  data() {
    return {
      clientes: [],
      lotes: [],
      ubicaciones: [],
      busquedaGlobal: "",
      filtros: {
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
      },
    };
  },
  mounted() {
    this.obtenerDatosCombinados();
  },

  methods: {

    toggleDetalle(index) {
      if (this.clientes[index]) {
        this.clientes[index].expandido = !this.clientes[index].expandido;
      }
    },


    async obtenerDatosCombinados() {
      try {
        const response = await axios.get("https://backendcramirez.onrender.com/api/clientes/conlotes", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        console.log(response.data);

        this.clientes = response.data.map(cliente => ({
          ...cliente,
          expandido: false
        }));
      } catch (error) {
        console.error("Error al obtener datos combinados:", error);
        alert("Error al obtener datos de clientes y lotes.");
      }
    },

    getLote(cliente) {
      return Array.isArray(cliente.lotes) && cliente.lotes.length > 0 ? cliente.lotes[0] : null;
    },


    getMatriz(lote) {
      return Array.isArray(lote.matriz) ? lote.matriz[0] || {} : {};
    },

    getLindero(lote) {
      return lote && lote.lindero ? lote.lindero : null;
    },

    getCuotaExtraordinaria(lote) {
      return Array.isArray(lote.cuotasExtraordinarias) && lote.cuotasExtraordinarias.length > 0
          ? lote.cuotasExtraordinarias[0]
          : null;
    },

    editarCliente(idCliente) {
      this.$router.push({ name: "EditarCliente", params: { id: idCliente } });
    },

    exportarClientesXLSX() {
      const encabezados = ["Nombres y Apellidos (Cliente)","Tipo de contrato", "Cliente N°", "Contrato Nº", "Proyecto", "Empresa que vende", "RUC vendedor",
        "Direccion vendedor", "Representante legal-Vendedor", "DNI vendedor", "Numero de partida (Poder Vendedor)", "Moneda",
        "Num.Cuenta", "CCI", "Fecha Sale", "Fecha de firma de contrato definitivo", "Area matriz HAS.",
        "Registro DE", "Partida matriz", "Ubicacion de lote predio matriz", "Unidad catastral de matriz", "Urbanizacion de matriz",
        "Distrito-matriz", "Provincia-matriz", "Departamento-matriz", "Compra venta de matriz", "Situacion legal de matriz",
        "Constancia de no Adeudo Municipal y Mas de Matriz", "Avance de Proyecto de Matriz", "Cronograma de Matriz",
        "Fecha Inicio Contrato", "Fecha Cancelación Contrato", "MZ-LT (LOTE)", "MZ (LOTE)", "LT (LOTE)", "Área Lote (LOTE)",
        "Área en Letras (LOTE)", "Cuota Ideal (alicuota)", "Cuota Ideal en Letras", "Por el Frente", "Por la Derecha",
        "Por la Izquierda", "Por el Fondo","Tipo Doc. (Cliente)", "Nº Identif. (Cliente)", "Nacionalidad (Cliente)",
        "Estado Civil (Cliente)", "Direccion (Cliente)", "Distrito-cliente", "Provincia-cliente",
        "Departamento-cliente", "Ocupacion", "Costo de Lote numero", "Costo de Lote letras", "Pago inicial Incluido separacion",
        "Separacion Cliente", "Cantidad de Cuotas", "Monto de Cuotas", "Cantidad de Cuota extraordinaria", "Monto de Cuota extraordinaria",
        "Mantenimiento mensual en Numeros", "Mantenimiento mensual en letras", "Estado de cuenta(de tener deuda poner monto)",
        "Monto de deuda en letras", "Cuotas pendientes de pago", "Dia de pago en numero", "Dia de pago en letras", "Carta de no adeuda",
        "Certificado de lote", "Medios de pago", "Plano 1", "Plano 2", "Envio de minuta", "Correo electronico del cliente",
        "Celular del cliente", "Fecha de cita", "Hora de cita", "Numero de atencion intranet", "Modificacion de minuta",
        "Minuta escaneada firmado", "Exp. notaria", "Firmo o no Firmo"
      ];


      const filas = this.clientes.map((item) => {
        const cliente = item.cliente ?? {};
        const lote = item.lotes?.[0] ?? {};
        const matriz = lote.matriz?.[0] ?? {};
        const cuotaExtraordinaria = lote.cuotasExtraordinarias?.[0] ?? {};
        const lindero = lote.lindero ?? {};

        return [
          cliente.nombresApellidos ?? '-' ,
          lote?.contrato ?? '-',
          cliente.idCliente?.toString().padStart(5, '0') ?? '-',
          lote?.idLote ?? '-',
          lote?.tipoProyecto ?? '-',
          lote?.empresaVende ?? '-',
          lote?.rucVendedor ?? '-',
          lote?.direccionVendedor ?? '-',
          lote?.representanteLegalVendedor ?? '-',
          lote?.dniVendedor ?? '-',
          lote?.numeroPartidaPoderVendedor ?? '-',
          lote?.moneda ?? '-',
          lote?.numCuenta ?? '-',
          lote?.cci ?? '-',
          lote?.fechaSale ?? '-',
          lote?.fechaFirmaContratoDefinitivo ?? '-',
          matriz?.areaMatrizHas ?? '-',
          matriz?.registrosDE ?? '-',
          matriz?.partidaMatriz ?? '-',
          matriz?.ubicacion ?? '-',
          matriz?.unidadCatastral ?? '-',
          matriz?.urbanizacionMatriz ?? '-',
          matriz?.distrito ?? '-',
          matriz?.provincia ?? '-',
          matriz?.departamento ?? '-',
          matriz?.compraventaMatriz ?? '-',
          matriz?.situacionLegal ?? '-',
          matriz?.constancianoadeudo ?? '-',
          matriz?.avanceproyectomatriz ?? '-',
          matriz?.cronogramamatriz ?? '-',
          matriz?.fechainiciocontrato ?? '-',
          matriz?.fechacancelaciondecontrato ?? '-',
          lote?.manzana && lote?.numeroLote ? `MZ ${lote.manzana} - LT ${lote.numeroLote}` : '-',
          lote?.manzana ?? '-' ,
          lote?.numeroLote ?? '-' ,
          lote?.areaLote ?? '-' ,
          lote?.areaLoteLetras ?? '-' ,
          matriz?.alicuota ?? '-',
          matriz?.alicuotaLetras ?? '-',
          lindero?.porElFrente ?? '-',
          lindero?.porLaDerecha ?? '-',
          lindero?.porLaIzquierda ?? '-',
          lindero?.porElFondo ?? '-',
          cliente.documentoIdentificacion ?? '-',
          cliente.numeroIdentificacion ?? '-' ,
          cliente.residencia ?? '-' ,
          cliente.estadoCivil ?? '-',
          cliente.direccion ?? '-',
          cliente.distrito ?? '-',
          cliente.provincia ?? '-',
          cliente.departamento ?? '-' ,
          cliente.ocupacion ?? '-' ,
          lote?.costoLote ?? '-' ,
          lote?.montoLetras ?? '-' ,
          lote?.pagoInicial ?? '-' ,
          lote?.separacion ?? '-' ,
          lote?.cantidadCuotas ?? '-' ,
          lote?.montoCuotas ?? '-' ,
          cuotaExtraordinaria?.cuotaExtraordinaria ?? '-' ,
          cliente.montoCuotaExtraordinaria ?? '-' ,
          cuotaExtraordinaria?.mantenimientoMensual ?? '-' ,
          cuotaExtraordinaria?.mantenimientoMensualLetras ?? '-' ,
          cuotaExtraordinaria?.estadoCuenta ?? '-' ,
          cuotaExtraordinaria?.montoDeudaLetra ?? '-' ,
          cuotaExtraordinaria?.cuotaPendientePago ?? '-' ,
          cliente.diaPagoNumero ?? '-' ,
          cliente.diaPagoLetras ?? '-' ,
          cliente.cartaNoAdeuda ?? '-' ,
          cliente.certificadoLote ?? '-' ,
          cliente.mediosDePago ?? '-' ,
          cliente.plano1 ?? '-' ,
          cliente.plano2 ?? '-' ,
          cliente.envioMinuta ?? '-' ,
          cliente.correoElectronico ?? '-' ,
          cliente.celularCliente ?? '-' ,
          cliente.fechaCita ?? '-' ,
          cliente.horaCita ?? '-' ,
          cliente.numeroAtencionIntranet ?? '-' ,
          cliente.modificacionMinuta ?? '-' ,
          cliente.minutaEscaneadaFirmado ?? '-' ,
          cliente.expNotaria ?? '-' ,
          cliente.firmoONoFirmo ?? '-' ,

        ];
      });

      const hoja = XLSX.utils.aoa_to_sheet([encabezados, ...filas]);
      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, "Clientes");
      XLSX.writeFile(libro, "clientes.xlsx");
    },
  },
};
</script>
