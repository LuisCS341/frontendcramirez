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
            <th>Tipo de contrato</th>
            <th>Cliente N°</th>
            <th>Contrato Nº</th>
            <th>Proyecto</th>
            <th>Empresa que vende</th>
            <th>RUC vendedor</th>
            <th>Direccion vendedor</th>
            <th>Representante legal-Vendedor</th>
            <th>DNI vendedor</th>
            <th>Numero de partida (Poder Vendedor)</th>
            <th>Moneda</th>
            <th>Num.Cuenta</th>
            <th>CCI</th>
            <th>Fecha Sale</th>
            <th>Fecha de firma de contrato definitivo</th>
            <th>Area matriz HAS.</th>
            <th>Registro DE</th>
            <th>Partida matriz</th>
            <th>Ubicacion de lote predio matriz</th>
            <th>Unidad catastral de matriz</th>
            <th>Urbanizacion de matriz</th>
            <th>Distrito-matriz</th>
            <th>Provincia-matriz</th>
            <th>Departamento-matriz</th>
            <th>Compra venta de matriz</th>
            <th>Situacion legal de matriz</th>
            <th>Constancia de no Adeudo Municipal y Mas de Matriz</th>
            <th>Avance de Proyecto de Matriz</th>
            <th>Cronograma de Matriz</th>
            <th>Fecha Inicio Contrato</th>
            <th>Fecha Cancelación Contrato</th>
            <th>MZ-LT (LOTE)</th>
            <th>MZ (LOTE)</th>
            <th>LT (LOTE)</th>
            <th>Área Lote (LOTE)</th>
            <th>Área en Letras (LOTE)</th>
            <th>Cuota Ideal (alicuota)</th>
            <th>Cuota Ideal en Letras</th>
            <th>Por el Frente</th>
            <th>Por la Derecha</th>
            <th>Por la Izquierda</th>
            <th>Por el Fondo</th>
            <th>Nº Identif. (Cliente)</th>
            <th>Tipo Doc. (Cliente)</th>
            <th>Nombres y Apellidos (Cliente)</th>
            <th>Nacionalidad (Cliente)</th>
            <th>Estado Civil (Cliente)</th>
            <th>Direccion (Cliente)</th>
            <th>Distrito-cliente</th>
            <th>Provincia-cliente</th>
            <th>Departamento-cliente</th>
            <th>Ocupacion</th>
            <th>Costo de Lote numero</th>
            <th>Costo de Lote letras</th>
            <th>Pago inicial Incluido separacion</th>
            <th>Separacion Cliente</th>
            <th>Cantidad de Cuotas</th>
            <th>Monto de Cuotas</th>
            <th>Cantidad de Cuota extraordinaria</th>
            <th>Monto de Cuota extraordinaria</th>
            <th>Mantenimiento mensual en Numeros</th>
            <th>Mantenimiento mensual en letras</th>
            <th>Estado de cuenta(de tener deuda poner monto)</th>
            <th>Monto de deuda en letras</th>
            <th>Cuotas pendientes de pago</th>
            <th>Dia de pago en numero</th>
            <th>Dia de pago en letras</th>
            <th>Carta de no adeuda</th>
            <th>Certificado de lote</th>
            <th>Medios de pago</th>
            <th>Plano 1</th>
            <th>Plano 2</th>
            <th>Envio de minuta</th>
            <th>Correo electronico del cliente</th>
            <th>Celular del cliente</th>
            <th>Fecha de cita</th>
            <th>Hora de cita</th>
            <th>Numero de atencion intranet</th>
            <th>Modificacion de minuta</th>
            <th>Minuta escaneada firmado</th>
            <th>Exp. notaria</th>
            <th>Firmo o no Firmo</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(cliente) in clientes" :key="cliente.idCliente">
            <td>{{ cliente.lotes[0]?.contrato ?? '-'}}</td>
            <td>{{ cliente.cliente.idCliente.toString().padStart(5, '0') }}</td>
            <td>{{ cliente.lotes[0]?.idLote ?? '-'}}</td>
            <td>{{ cliente.lotes[0]?.tipoProyecto ?? '-' }}</td>
            <td>{{cliente.lotes[0]?.empresaVende ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.rucVendedor ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.direccionVendedor ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.representanteLegalVendedor ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.dniVendedor ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.numeroPartidaPoderVendedor ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.moneda ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.numCuenta ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.cci ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.fechaSale ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.fechaFirmaContratoDefinitivo ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz?.[0]?.areaMatrizHas ?? '-'  }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.registrosDE ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.partidaMatriz ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.ubicacion ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.unidadCatastral ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.urbanizacionMatriz ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.distrito ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.provincia ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.departamento ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.compraventaMatriz ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.situacionLegal ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.constancianoadeudo ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.avanceproyectomatriz ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.cronogramamatriz ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.fechainiciocontrato ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.fechacancelaciondecontrato ?? '-' }}</td>
            <td>{{ cliente.lotes?.[0]?.manzana && cliente.lotes?.[0]?.numeroLote ? `MZ ${cliente.lotes[0].manzana} - LT ${cliente.lotes[0].numeroLote}` : '-' }}</td>
            <td>{{  cliente.lotes[0]?.manzana ?? '-' }}</td>
            <td>{{  cliente.lotes[0]?.numeroLote ?? '-' }}</td>
            <td>{{  cliente.lotes[0]?.areaLote ?? '-' }}</td>
            <td>{{  cliente.lotes[0]?.arealoteletras ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.alicuota ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.matriz[0]?.alicuotaLetras ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.lindero[0]?.porElFrente ?? '-' }}</td>
            <td>{{ cliente.lotes?.[0]?.lindero?.[0]?.porLaDerecha ?? '-' }}</td>
            <td>{{ cliente.lotes?.[0]?.lindero?.[0]?.porLaIzquierda ?? '-' }}</td>
            <td>{{ cliente.lotes?.[0]?.lindero?.[0]?.porElFondo ?? '-' }}</td>
            <td>{{ cliente.cliente.documentoIdentificacion ?? '-'}}</td>
            <td>{{ cliente.cliente.numeroIdentificacion ?? '-'}}</td>
            <td>{{ cliente.cliente.nombresApellidos ?? '-'}}</td>
            <td>{{ cliente.cliente.residencia ?? '-'}}</td>
            <td>{{ cliente.cliente.estadoCivil ?? '-'}}</td>
            <td>{{ cliente.cliente.direccion ?? '-'}}</td>
            <td>{{ cliente.cliente.distrito ?? '-' }}</td>
            <td>{{ cliente.cliente.provincia ?? '-'}}</td>
            <td>{{ cliente.cliente.departamento ?? '-'}}</td>
            <td>{{ cliente.cliente.ocupacion ?? '-'}}</td>
            <td>{{ cliente.lotes[0]?.costoLote ?? '-' }}</td>
            <td>{{ cliente.costoLoteLetras ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.pagoInicial ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.separacion ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.catidadCuotas ?? '-' }}</td>
            <td>{{ cliente.lotes[0]?.montoCuotas ?? '-' }}</td>
            <td>{{ cliente.cantidadCuotaExtraordinaria ?? '-' }}</td>
            <td>{{ cliente.montoCuotaExtraordinaria ?? '-' }}</td>
            <td>{{ cliente.mantenimientoMensualNumeros ?? '-' }}</td>
            <td>{{ cliente.mantenimientoMensualLetras ?? '-' }}</td>
            <td>{{ cliente.estadoCuenta ?? '-' }}</td>
            <td>{{ cliente.montoDeudaLetras ?? '-' }}</td>
            <td>{{ cliente.cuotasPendientesPago ?? '-' }}</td>
            <td>{{ cliente.diaPagoNumero ?? '-' }}</td>
            <td>{{ cliente.diaPagoLetras ?? '-' }}</td>
            <td>{{ cliente.cartaNoAdeuda ?? '-' }}</td>
            <td>{{ cliente.certificadoLote ?? '-' }}</td>
            <td>{{ cliente.mediosDePago ?? '-' }}</td>
            <td>{{ cliente.plano1 ?? '-' }}</td>
            <td>{{ cliente.plano2 ?? '-' }}</td>
            <td>{{ cliente.envioMinuta ?? '-' }}</td>
            <td>{{ cliente.correoElectronico ?? '-' }}</td>
            <td>{{ cliente.celularCliente ?? '-' }}</td>
            <td>{{ cliente.fechaCita ?? '-' }}</td>
            <td>{{ cliente.horaCita ?? '-' }}</td>
            <td>{{ cliente.numeroAtencionIntranet ?? '-' }}</td>
            <td>{{ cliente.modificacionMinuta ?? '-' }}</td>
            <td>{{ cliente.minutaEscaneadaFirmado ?? '-' }}</td>
            <td>{{ cliente.expNotaria ?? '-' }}</td>
            <td>{{ cliente.firmoONoFirmo ?? '-' }}</td>

            <td class="acciones-td">
              <button @click="editarCliente(cliente.ID_Cliente)" class="btn-accion btn-editar">
                <i class="fas fa-edit"></i>
                <span class="accion-texto">Editar</span>
              </button>
            </td>
          </tr>
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

    editarCliente(idCliente) {
      this.$router.push({ name: "EditarCliente", params: { id: idCliente } });
    },

    exportarClientesXLSX() {
      const encabezados = ["Tipo de contrato", "Cliente N°", "Contrato Nº", "Proyecto", "Empresa que vende", "RUC vendedor",
        "Direccion vendedor", "Representante legal-Vendedor", "DNI vendedor", "Numero de partida (Poder Vendedor)", "Moneda",
        "Num.Cuenta", "CCI", "Fecha Sale", "Fecha de firma de contrato definitivo", "Area matriz HAS.",
        "Registro DE", "Partida matriz", "Ubicacion de lote predio matriz", "Unidad catastral de matriz", "Urbanizacion de matriz",
        "Distrito-matriz", "Provincia-matriz", "Departamento-matriz", "Compra venta de matriz", "Situacion legal de matriz",
        "Constancia de no Adeudo Municipal y Mas de Matriz", "Avance de Proyecto de Matriz", "Cronograma de Matriz",
        "Fecha Inicio Contrato", "Fecha Cancelación Contrato", "MZ-LT (LOTE)", "MZ (LOTE)", "LT (LOTE)", "Área Lote (LOTE)",
        "Área en Letras (LOTE)", "Cuota Ideal (alicuota)", "Cuota Ideal en Letras", "Por el Frente", "Por la Derecha",
        "Por la Izquierda", "Por el Fondo","Tipo Doc. (Cliente)", "Nº Identif. (Cliente)", "Nombres y Apellidos (Cliente)",
        "Nacionalidad (Cliente)", "Estado Civil (Cliente)", "Direccion (Cliente)", "Distrito-cliente", "Provincia-cliente",
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
        const lindero = lote.lindero ?? {};

        return [
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
          lote?.arealoteletras ?? '-' ,
          matriz?.alicuota ?? '-',
          matriz?.alicuotaLetras ?? '-',
          lindero?.porElFrente ?? '-',
          lindero?.porLaDerecha ?? '-',
          lindero?.porLaIzquierda ?? '-',
          lindero?.porElFondo ?? '-',
          cliente.documentoIdentificacion ?? '-',
          cliente.numeroIdentificacion ?? '-' ,
          cliente.nombresApellidos ?? '-' ,
          cliente.residencia ?? '-' ,
          cliente.estadoCivil ?? '-',
          cliente.direccion ?? '-',
          cliente.distrito ?? '-',
          cliente.provincia ?? '-',
          cliente.departamento ?? '-' ,
          cliente.ocupacion ?? '-' ,
          lote?.costoLote ?? '-' ,
          cliente.costoLoteLetras ?? '-' ,
          lote?.pagoInicial ?? '-' ,
          lote?.separacion ?? '-' ,
          lote?.catidadCuotas ?? '-' ,
          lote?.montoCuotas ?? '-' ,
          cliente.cantidadCuotaExtraordinaria ?? '-' ,
          cliente.montoCuotaExtraordinaria ?? '-' ,
          cliente.mantenimientoMensualNumeros ?? '-' ,
          cliente.mantenimientoMensualLetras ?? '-' ,
          cliente.estadoCuenta ?? '-' ,
          cliente.montoDeudaLetras ?? '-' ,
          cliente.cuotasPendientesPago ?? '-' ,
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
