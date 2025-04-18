<template>
  <div class="primary-container">
    <div class="secundary-container">
      <div class="items">

        <input class="buscador" type="text" v-model="busqueda" placeholder="Buscar cliente...">

        <button @click="exportarClientesXLSX" class="btn-accion btn-exportar">Exportar Clientes</button>
      </div>

      <!-- Contenedor de la tabla -->
      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th>Cliente N°</th>
            <th>Nombres y Apellidos</th>
            <th>Dirección</th>
            <th>Correo Electrónico</th>
            <th>Celular</th>
            <th>Identificación</th>
            <th>Número Identificación</th>
            <th>Estado Civil</th>
            <th>Ocupación</th>
            <th>Residencia</th>
            <th>Prefijo</th>

            <th>Empresa que Vende</th>
            <th>RUC Vendedor</th>
            <th>Dirección Vendedor</th>
            <th>Representante Legal Vendedor</th>
            <th>DNI Vendedor</th>
            <th>Nº Partida Poder Vendedor</th>
            <th>Moneda</th>
            <th>Número Cuenta</th>
            <th>CCI</th>
            <th>Fecha Entrega Proyecto</th>
            <th>Fecha Firma Contrato Definitivo</th>
            <th>Área Matriz (Has.)</th>
            <th>Registros de Partida Matriz</th>
            <th>Ubicación Lote (Predio Matriz)</th>
            <th>Unidad Catastral de Matriz</th>
            <th>Urbanización de Matriz</th>
            <th>Distrito de Matriz</th>
            <th>Provincia de Matriz</th>
            <th>Departamento de Matriz</th>
            <th>Compraventa de Matriz</th>
            <th>Situación Legal de Matriz</th>
            <th>Fecha Inicio Contrato</th>
            <th>Fecha Cancelación Contrato</th>
            <th>MZ (Cliente)</th>
            <th>LT (Cliente)</th>
            <th>Área en Letras (Cliente)</th>
            <th>Área Lote (Cliente)</th>
            <th>Cuota Ideal en Letras</th>
            <th>Cuota Ideal (Cliente)</th>
            <th>Por el Frente</th>
            <th>Por la Derecha</th>
            <th>Por la Izquierda</th>
            <th>Por el Fondo</th>
            <th>Nº Identif. (Cliente)</th>
            <th>Tipo Doc. (Cliente)</th>
            <th>Nombres y Apellidos (Cliente)</th>
            <th>Nacionalidad (Cliente)</th>
            <th>Estado Civil (Cliente)</th>
            <th class="acciones-td">Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(cliente) in clientesFiltrados" :key="cliente.idCliente">
            <td>{{ cliente.idCliente.toString().padStart(5, '0') }}</td>
            <td>{{ cliente.nombresApellidos }}</td>
            <td>{{ cliente.direccion }}</td>
            <td>{{ cliente.correoElectronico }}</td>
            <td>{{ cliente.celularCliente }}</td>
            <td>{{ cliente.documentoIdentificacion }}</td>
            <td>{{ cliente.numeroIdentificacion }}</td>
            <td>{{ cliente.estadoCivil }}</td>
            <td>{{ cliente.ocupacion }}</td>
            <td>{{ cliente.residencia }}</td>
            <td>{{ cliente.prefijoPais }}</td>

            <td>{{ cliente.empresaVende }}</td>
            <td>{{ cliente.rucVendedor }}</td>
            <td>{{ cliente.direccionVendedor }}</td>
            <td>{{ cliente.representanteLegalVendedor }}</td>
            <td>{{ cliente.dniVendedor }}</td>
            <td>{{ cliente.numeroPartidaPoderVendedor }}</td>
            <td>{{ cliente.moneda }}</td>
            <td>{{ cliente.numeroCuenta }}</td>
            <td>{{ cliente.cci }}</td>
            <td>{{ cliente.fechaEntregaProyecto }}</td>
            <td>{{ cliente.fechaFirmaContrato }}</td>

            <td>{{ cliente.areaMatriz }}</td>
            <td>{{ cliente.registrosPartidaMatriz }}</td>
            <td>{{ cliente.ubicacionLoteMatriz }}</td>
            <td>{{ cliente.unidadCatastralMatriz }}</td>
            <td>{{ cliente.urbanizacionMatriz }}</td>
            <td>{{ cliente.distritoMatriz }}</td>
            <td>{{ cliente.provinciaMatriz }}</td>
            <td>{{ cliente.departamentoMatriz }}</td>
            <td>{{ cliente.compraventaMatriz }}</td>
            <td>{{ cliente.situacionLegalMatriz }}</td>
            <td>{{ cliente.fechaInicioContrato }}</td>
            <td>{{ cliente.fechaCancelacionContrato }}</td>
            <td>{{ cliente.mzCliente }}</td>
            <td>{{ cliente.ltCliente }}</td>
            <td>{{ cliente.areaLetrasCliente }}</td>
            <td>{{ cliente.areaLoteCliente }}</td>
            <td>{{ cliente.cuotaIdealLetras }}</td>
            <td>{{ cliente.cuotaIdealCliente }}</td>
            <td>{{ cliente.porFrente }}</td>
            <td>{{ cliente.porDerecha }}</td>
            <td>{{ cliente.porIzquierda }}</td>
            <td>{{ cliente.porFondo }}</td>
            <td>{{ cliente.numeroIdentifCliente }}</td>
            <td>{{ cliente.tipoDocCliente }}</td>
            <td>{{ cliente.nombresApellidosCliente }}</td>
            <td>{{ cliente.nacionalidadCliente }}</td>
            <td>{{ cliente.estadoCivilCliente }}</td>
            <td>
              <button @click="editarCliente(cliente.idCliente)" class="btn-accion btn-editar">
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

<script>
import "@/assets/tablas/Tablas.css";
import * as XLSX from "xlsx";
import axios from 'axios';

export default {
  data() {
    return {
      clientes: [],
      busqueda: ""
    };
  },
  mounted() {
    this.obtenerClientes();
  },
  computed: {
    clientesFiltrados() {
      const texto = this.busqueda.toLowerCase();
      return this.clientes.filter(cliente =>
          (cliente.nombresApellidos || "").toLowerCase().includes(texto) ||
          (cliente.correoElectronico || "").toLowerCase().includes(texto) ||
          (cliente.numeroIdentificacion || "").toLowerCase().includes(texto)
      );
    }
  },
  methods: {
    async obtenerClientes() {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const idOperario = userData ? userData.idOperario : null;

        if (!idOperario) {
          console.error("No se encontró un ID de operario en localStorage.");
          return;
        }

        const response = await axios.get("https://backendpruebav1.onrender.com/api/clientes/operario", {
          headers: {
            "X-User-ID": idOperario,
          },
        });

        this.clientes = response.data;
        console.log("Clientes cargados:", this.clientes);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    },


    editarCliente(idCliente) {
      console.log("Editar cliente con ID:", idCliente);
    },
    exportarClientesXLSX() {
      const encabezados = [
        "Cliente", "Nombres y Apellidos", "Direccion", "Correo Electronico", "Celular", "Identificacion",
        "Numero Identificacion", "Estado Civil", "Ocupacion", "Residencia", "Prefijo", "Empresa que Vende",
        "RUC Vendedor", "Direccion Vendedor", "Representante Legal Vendedor", "DNI Vendedor",
        "No Partida Poder Vendedor", "Moneda", "Numero Cuenta", "CCI", "Fecha Entrega Proyecto",
        "Fecha Firma Contrato Definitivo", "Area Matriz (Has.)", "Registros de Partida Matriz",
        "Ubicacion Lote (Predio Matriz)", "Unidad Catastral de Matriz", "Urbanizacion de Matriz",
        "Distrito de Matriz", "Provincia de Matriz", "Departamento de Matriz", "Compraventa de Matriz",
        "Situacion Legal de Matriz", "Fecha Inicio Contrato", "Fecha Cancelacion Contrato", "MZ (Cliente)",
        "LT (Cliente)", "Area en Letras (Cliente)", "Area Lote (Cliente)", "Cuota Ideal en Letras",
        "Cuota Ideal (Cliente)", "Por el Frente", "Por la Derecha", "Por la Izquierda", "Por el Fondo",
        "No Identif. (Cliente)", "Tipo Doc. (Cliente)", "Nombres y Apellidos (Cliente)",
        "Nacionalidad (Cliente)", "Estado Civil (Cliente)"
      ];

      // Recolectar datos por cliente (cada fila es un cliente)
      const filas = this.clientesFiltrados.map((cliente) => ([
        cliente.idCliente.toString().padStart(5, '0'),
        cliente.nombresApellidos,
        cliente.direccion,
        cliente.correoElectronico,
        cliente.celularCliente,
        cliente.documentoIdentificacion,
        cliente.numeroIdentificacion,
        cliente.estadoCivil,
        cliente.ocupacion,
        cliente.residencia,
        cliente.prefijoPais,
        cliente.empresaVende,
        cliente.rucVendedor,
        cliente.direccionVendedor,
        cliente.representanteLegalVendedor,
        cliente.dniVendedor,
        cliente.numeroPartidaPoderVendedor,
        cliente.moneda,
        cliente.numeroCuenta,
        cliente.cci,
        cliente.fechaEntregaProyecto,
        cliente.fechaFirmaContrato,
        cliente.areaMatriz,
        cliente.registrosPartidaMatriz,
        cliente.ubicacionLoteMatriz,
        cliente.unidadCatastralMatriz,
        cliente.urbanizacionMatriz,
        cliente.distritoMatriz,
        cliente.provinciaMatriz,
        cliente.departamentoMatriz,
        cliente.compraventaMatriz,
        cliente.situacionLegalMatriz,
        cliente.fechaInicioContrato,
        cliente.fechaCancelacionContrato,
        cliente.mzCliente,
        cliente.ltCliente,
        cliente.areaLetrasCliente,
        cliente.areaLoteCliente,
        cliente.cuotaIdealLetras,
        cliente.cuotaIdealCliente,
        cliente.porFrente,
        cliente.porDerecha,
        cliente.porIzquierda,
        cliente.porFondo,
        cliente.numeroIdentifCliente,
        cliente.tipoDocCliente,
        cliente.nombresApellidosCliente,
        cliente.nacionalidadCliente,
        cliente.estadoCivilCliente
      ]));

      // Insertar encabezados al principio de la matriz
      const matrizFinal = [encabezados, ...filas];

      // Crear hoja y libro
      const ws = XLSX.utils.aoa_to_sheet(matrizFinal);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Clientes");

      // Guardar archivo
      XLSX.writeFile(wb, "clientes.xlsx");
    }


  }
};
</script>
