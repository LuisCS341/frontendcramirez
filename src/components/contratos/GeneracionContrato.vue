<template>
  <div class="tabla-generar-contratos">
    <h2>Generar Contratos</h2>

    <!-- Buscador -->
    <div class="search-container">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por número de contrato, proyecto, nombre o DNI..."
          class="search-input"
      />
    </div>

    <!-- Tabla -->
    <div class="table-container">
      <table>
        <thead>
        <tr>
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
          <th>CUOTA IDEAL EN LETRAS</th>
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
          <th>TIPO DE SOCIO_CÓNYUGE/CONVIVIENTE COPROPIEDAD</th>
          <th>NUMERO DE DOCUMENTO (CONYUGUE) (CLIENTE)</th>
          <th>TIPO DE DOCUMENTO (CONYUGUE) (CLIENTE)</th>
          <th>NOMBRE COMPLETO (CONYUGUE) (CLIENTE)</th>
          <th>ESTADO CIVIL (CONYUGUE) (CLIENTE)</th>
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
        </tr>
        </thead>
        <tbody>
        <tr v-for="contrato in filteredContratos" :key="contrato.nroContrato">
          <td>{{ contrato.tipoContrato }}</td>
          <td>{{ contrato.clienteNro }}</td>
          <td>{{ contrato.nroContrato }}</td>
          <td>{{ contrato.proyecto }}</td>
          <td>{{ contrato.empresaVendedora }}</td>
          <td>{{ contrato.rucVendedor }}</td>
          <td>{{ contrato.direccionVendedor }}</td>
          <td>{{ contrato.representanteLegal }}</td>
          <td>{{ contrato.dniVendedor }}</td>
          <td>{{ contrato.fechaFirmaContrato }}</td>
          <td>{{ contrato.ubicacionLote }}</td>
          <td>{{ contrato.cliente.nombre }}</td>
          <td>{{ contrato.cliente.dni }}</td>
          <td>{{ contrato.cliente.direccion }}</td>
          <td>{{ contrato.cliente.correo }}</td>
          <td>{{ contrato.cliente.telefono }}</td>
          <td>
            <button @click="generarContrato(contrato)" class="generate-button">
              Generar Contrato
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "@/assets/tablas/Tablas.css";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      searchQuery: "",
      contratos: [
        {
          tipoContrato: "Venta",
          clienteNro: "0001",
          nroContrato: "C001",
          proyecto: "Residencial Los Álamos",
          empresaVendedora: "Empresa ABC",
          rucVendedor: "12345678901",
          direccionVendedor: "Av. Comercial 123",
          representanteLegal: "Carlos Ramírez",
          dniVendedor: "11223344",
          fechaFirmaContrato: "10/03/2025",
          ubicacionLote: "Lote 12 - Manzana A",
          cliente: {
            nombre: "Juan Pérez",
            dni: "12345678",
            direccion: "Av. Siempre Viva 742",
            telefono: "987654321",
            correo: "juan.perez@example.com"
          }
        }
      ]
    };
  },
  computed: {
    filteredContratos() {
      return this.contratos.filter(contrato =>
          contrato.nroContrato.includes(this.searchQuery) ||
          contrato.cliente.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          contrato.cliente.dni.includes(this.searchQuery)
      );
    }
  },
  methods: {
    generarContrato(contrato) {
      this.generarWord(contrato);
    },

    async generarWord(contrato) {
      try {
        // Cargar la plantilla desde la carpeta `public`
        const response = await fetch("/PLANTILLA_MODIFICADA_MINUTA_T1.docx");
        if (!response.ok) throw new Error("No se pudo cargar la plantilla");

        const blob = await response.blob();

        // Leer el contenido del archivo como ArrayBuffer
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = (event) => {
          try {
            const zip = new PizZip(event.target.result);
            const doc = new Docxtemplater(zip);

            // Reemplazar las variables en la plantilla con los datos del contrato
            doc.setData({
              CONTRATO_NRO: contrato.nroContrato,
              CLIENTE_NRO: contrato.clienteNro,
              TIPO_CONTRATO: contrato.tipoContrato,
              PROYECTO: contrato.proyecto,
              EMPRESA_VENDEDORA: contrato.empresaVendedora,
              RUC_VENDEDOR: contrato.rucVendedor,
              REPRESENTANTE_VENDEDOR: contrato.representanteLegal,
              DNI_VENDEDOR: contrato.dniVendedor,
              FECHA_FIRMA: contrato.fechaFirmaContrato,
              UBICACION_LOTE: contrato.ubicacionLote,
              CLIENTE_NOMBRE: contrato.cliente.nombre,
              CLIENTE_DNI: contrato.cliente.dni,
              CLIENTE_DIRECCION: contrato.cliente.direccion,
              CLIENTE_CORREO: contrato.cliente.correo,
              CLIENTE_TELEFONO: contrato.cliente.telefono
            });

            // Generar el documento final
            doc.render();
            const output = doc.getZip().generate({ type: "blob" });

            // Descargar el archivo Word
            saveAs(output, `Contrato_${contrato.nroContrato}.docx`);
          } catch (error) {
            console.error("Error al procesar la plantilla:", error);
          }
        };
      } catch (error) {
        console.error("Error al cargar la plantilla:", error);
      }
    }
  }
};
</script>


<style scoped>
/* Agrega tus estilos aquí */
</style>
