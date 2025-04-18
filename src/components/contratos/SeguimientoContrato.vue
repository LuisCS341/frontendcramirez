
<template>
  <div>
    <h2>Seguimiento de Contratos</h2>

    <!-- Buscador -->
    <div class="search-container">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por tipo de contrato, proyecto o RUC..."
          class="search-input"
      />
    </div>

    <!-- Tabla -->
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <!-- Información del Contrato -->
          <th>Tipo de Contrato</th>
          <th>Cliente N°</th>
          <th>Proyecto</th>
          <th>Empresa que Vende</th>
          <th>RUC Vendedor</th>
          <th>Dirección Vendedor</th>
          <th>Representante Legal Vendedor</th>
          <th>DNI Vendedor</th>
          <th>N° Partida</th>
          <th>Moneda</th>
          <th>N° Cuenta</th>
          <th>CCI</th>
          <th>Fecha de Entrega de Proyecto</th>
          <th>Fecha de Firma de Contrato Definitivo</th>
          <th>Área Triz</th>
          <th>Registros</th>
          <th>Partida Matriz</th>
          <th>Ubicación Lote</th>
          <th>Unidad Catastral de Matriz</th>
          <th>Urbanización Matriz</th>
          <th>Distrito de Matriz</th>
          <th>Provincia de Matriz</th>
          <th>Departamento</th>
          <th>Compraventa de Matriz</th>
          <th>Situación Matriz</th>
          <th>Fecha Inicio Contrato</th>
          <th>Fecha de Cancelación</th>

          <!-- Información del Cliente -->
          <th>MZ (Cliente)</th>
          <th>LT (Cliente)</th>
          <th>Área en Letras</th>
          <th>Área de Lote</th>
          <th>Cuota Ideal</th>
          <th>Por el Frente</th>
          <th>Por la Derecha</th>
          <th>Por la Izquierda</th>
          <th>Por el Fondo</th>
          <th>N° Identificación (Cliente)</th>
          <th>Tipo Doc (Cliente)</th>
          <th>Nombres y Apellidos (Cliente)</th>
          <th>Nacionalidad (Cliente)</th>
          <th>Estado Civil (Cliente)</th>
          <th>Estado Civil (Compradores)</th>
          <th>Dirección Comprador (Cliente)</th>
          <th>Distrito</th>
          <th>Provincia</th>
          <th>Departamento</th>
          <th>Ocupación</th>
          <th>Tipo de: Conyugue/Copropietario/Representante</th>
          <th>N° Documento</th>
          <th>Tipo de Documento</th>
          <th>Nombre Completo</th>
          <th>Estado Civil (Conyugue)</th>
          <th>Ocupación</th>
          <th>Domicilio</th>
          <th>Distrito</th>
          <th>Provincia</th>
          <th>Departamento</th>

          <!-- Información Financiera -->
          <th>Costo del Lote</th>
          <th>Pago Inicial</th>
          <th>Separación</th>
          <th>Anticipo</th>
          <th>Monto de Cuotas</th>
          <th>Cantidad</th>
          <th>Monto de Cuota</th>
          <th>Mantenimiento Mensual en Números</th>
          <th>Mantenimiento Mensual en Letras</th>
          <th>Estado de Cuenta</th>
          <th>Modalidad de Deuda en Letras</th>
          <th>Cuota</th>
          <th>Día de Pago en Número</th>
          <th>Correo Electrónico</th>
          <th>Celular</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="contrato in filteredContratos" :key="contrato.id">
          <!-- Información del Contrato -->
          <td>{{ contrato.tipoContrato }}</td>
          <td>{{ contrato.clienteNumero }}</td>
          <td>{{ contrato.proyecto }}</td>
          <td>{{ contrato.empresaVendedora }}</td>
          <td>{{ contrato.rucVendedor }}</td>
          <td>{{ contrato.direccionVendedor }}</td>
          <td>{{ contrato.representanteLegalVendedor }}</td>
          <td>{{ contrato.dniVendedor }}</td>
          <td>{{ contrato.numeroPartida }}</td>
          <td>{{ contrato.moneda }}</td>
          <td>{{ contrato.numeroCuenta }}</td>
          <td>{{ contrato.cci }}</td>
          <td>{{ contrato.fechaEntregaProyecto }}</td>
          <td>{{ contrato.fechaFirmaContratoDefinitivo }}</td>
          <td>{{ contrato.areaTriz }}</td>
          <td>{{ contrato.registros }}</td>
          <td>{{ contrato.partidaMatriz }}</td>
          <td>{{ contrato.ubicacionLote }}</td>
          <td>{{ contrato.unidadCatastralMatriz }}</td>
          <td>{{ contrato.urbanizacionMatriz }}</td>
          <td>{{ contrato.distritoMatriz }}</td>
          <td>{{ contrato.provinciaMatriz }}</td>
          <td>{{ contrato.departamento }}</td>
          <td>{{ contrato.compraventaMatriz }}</td>
          <td>{{ contrato.situacionMatriz }}</td>
          <td>{{ contrato.fechaInicioContrato }}</td>
          <td>{{ contrato.fechaCancelacion }}</td>

          <!-- Información del Cliente -->
          <td>{{ contrato.mzCliente }}</td>
          <td>{{ contrato.ltCliente }}</td>
          <td>{{ contrato.areaEnLetras }}</td>
          <td>{{ contrato.areaDeLote }}</td>
          <td>{{ contrato.cuotaIdeal }}</td>
          <td>{{ contrato.porElFrente }}</td>
          <td>{{ contrato.porLaDerecha }}</td>
          <td>{{ contrato.porLaIzquierda }}</td>
          <td>{{ contrato.porElFondo }}</td>
          <td>{{ contrato.numeroIdentificacionCliente }}</td>
          <td>{{ contrato.tipoDocCliente }}</td>
          <td>{{ contrato.nombresApellidosCliente }}</td>
          <td>{{ contrato.nacionalidadCliente }}</td>
          <td>{{ contrato.estadoCivilCliente }}</td>
          <td>{{ contrato.estadoCivilCompradores }}</td>
          <td>{{ contrato.direccionCompradorCliente }}</td>
          <td>{{ contrato.distrito }}</td>
          <td>{{ contrato.provincia }}</td>
          <td>{{ contrato.departamento }}</td>
          <td>{{ contrato.ocupacion }}</td>
          <td>{{ contrato.tipoConyugueCopropietarioRepresentante }}</td>
          <td>{{ contrato.numeroDocumento }}</td>
          <td>{{ contrato.tipoDocumento }}</td>
          <td>{{ contrato.nombreCompleto }}</td>
          <td>{{ contrato.estadoCivilConyugue }}</td>
          <td>{{ contrato.ocupacionConyugue }}</td>
          <td>{{ contrato.domicilioConyugue }}</td>
          <td>{{ contrato.distritoConyugue }}</td>
          <td>{{ contrato.provinciaConyugue }}</td>
          <td>{{ contrato.departamentoConyugue }}</td>

          <!-- Información Financiera -->
          <td>{{ contrato.costoLote }}</td>
          <td>{{ contrato.pagoInicial }}</td>
          <td>{{ contrato.separacion }}</td>
          <td>{{ contrato.anticipo }}</td>
          <td>{{ contrato.montoCuotas }}</td>
          <td>{{ contrato.cantidadCuotas }}</td>
          <td>{{ contrato.montoCuota }}</td>
          <td>{{ contrato.mantenimientoMensualNumero }}</td>
          <td>{{ contrato.mantenimientoMensualLetras }}</td>
          <td>{{ contrato.estadoCuenta }}</td>
          <td>{{ contrato.modalidadDeudaLetras }}</td>
          <td>{{ contrato.cuota }}</td>
          <td>{{ contrato.diaPagoNumero }}</td>
          <td>{{ contrato.correoElectronico }}</td>
          <td>{{ contrato.celular }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ("@/assets/Tablas/Tablas.css")
export default {
  data() {
    return {
      contratos: [], // Aquí se almacenarán los contratos ficticios
      searchQuery: "", // Para el buscador
    };
  },
  computed: {
    // Filtra los contratos según la búsqueda
    filteredContratos() {
      return this.contratos.filter((contrato) => {
        return (
            contrato.tipoContrato.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            contrato.proyecto.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            contrato.rucVendedor.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
  created() {
    // Generar datos ficticios al cargar el componente
    this.generateFakeData();
  },
  methods: {
    generateFakeData() {
      const fakeContratos = [];
      const tiposContrato = ['Venta', 'Alquiler', 'Leasing'];
      const proyectos = ['Proyecto A', 'Proyecto B', 'Proyecto C'];
      const empresasVendedoras = ['Empresa X', 'Empresa Y', 'Empresa Z'];
      const monedas = ['Soles', 'Dólares'];
      const estadosCuenta = ['Al día', 'Moroso', 'Cancelado'];
      const nacionalidades = ['Peruana', 'Extranjera'];
      const estadosCiviles = ['Soltero', 'Casado', 'Divorciado'];
      const ocupaciones = ['Ingeniero', 'Médico', 'Abogado', 'Arquitecto', 'Contador'];
      const distritos = ['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'La Molina'];
      const provincias = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo'];
      const departamentos = ['Lima', 'Arequipa', 'Cusco', 'La Libertad', 'Lambayeque'];

      for (let i = 1; i <= 10; i++) {
        fakeContratos.push({
          id: i,
          tipoContrato: tiposContrato[Math.floor(Math.random() * tiposContrato.length)],
          clienteNumero: i,
          proyecto: proyectos[Math.floor(Math.random() * proyectos.length)],
          empresaVendedora: empresasVendedoras[Math.floor(Math.random() * empresasVendedoras.length)],
          rucVendedor: `20${Math.floor(Math.random() * 100000000)}`,
          direccionVendedor: `Calle ${i} #${Math.floor(Math.random() * 100)}`,
          representanteLegalVendedor: `Representante ${i}`,
          dniVendedor: `7${Math.floor(Math.random() * 10000000)}`,
          numeroPartida: `P-${Math.floor(Math.random() * 1000)}`,
          moneda: monedas[Math.floor(Math.random() * monedas.length)],
          numeroCuenta: `001${Math.floor(Math.random() * 100000000)}`,
          cci: `CCI${Math.floor(Math.random() * 100000000)}`,
          fechaEntregaProyecto: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          fechaFirmaContratoDefinitivo: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          areaTriz: `${Math.floor(Math.random() * 1000)} m²`,
          registros: `R-${Math.floor(Math.random() * 1000)}`,
          partidaMatriz: `PM-${Math.floor(Math.random() * 1000)}`,
          ubicacionLote: `Lote ${i}`,
          unidadCatastralMatriz: `UC-${Math.floor(Math.random() * 1000)}`,
          urbanizacionMatriz: `Urbanización ${i}`,
          distritoMatriz: distritos[Math.floor(Math.random() * distritos.length)],
          provinciaMatriz: provincias[Math.floor(Math.random() * provincias.length)],
          departamentos: departamentos[Math.floor(Math.random() * departamentos.length)],
          compraventaMatriz: `Compraventa ${i}`,
          situacionMatriz: `Situación ${i}`,
          fechaInicioContrato: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
          fechaCancelacion: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,

          // Información del Cliente
          mzCliente: `MZ-${i}`,
          ltCliente: `LT-${i}`,
          areaEnLetras: `Área ${i}`,
          areaDeLote: `${Math.floor(Math.random() * 1000)} m²`,
          cuotaIdeal: `${Math.floor(Math.random() * 1000)}`,
          porElFrente: `${Math.floor(Math.random() * 100)} m`,
          porLaDerecha: `${Math.floor(Math.random() * 100)} m`,
          porLaIzquierda: `${Math.floor(Math.random() * 100)} m`,
          porElFondo: `${Math.floor(Math.random() * 100)} m`,
          numeroIdentificacionCliente: `7${Math.floor(Math.random() * 10000000)}`,
          tipoDocCliente: 'DNI',
          nombresApellidosCliente: `Cliente ${i} Apellido ${i}`,
          nacionalidadCliente: nacionalidades[Math.floor(Math.random() * nacionalidades.length)],
          estadoCivilCliente: estadosCiviles[Math.floor(Math.random() * estadosCiviles.length)],
          estadoCivilCompradores: estadosCiviles[Math.floor(Math.random() * estadosCiviles.length)],
          direccionCompradorCliente: `Calle ${i} #${Math.floor(Math.random() * 100)}`,
          distrito: distritos[Math.floor(Math.random() * distritos.length)],
          provincia: provincias[Math.floor(Math.random() * provincias.length)],
          departamento: departamentos[Math.floor(Math.random() * departamentos.length)],
          ocupacion: ocupaciones[Math.floor(Math.random() * ocupaciones.length)],
          tipoConyugueCopropietarioRepresentante: `Tipo ${i}`,
          numeroDocumento: `7${Math.floor(Math.random() * 10000000)}`,
          tipoDocumento: 'DNI',
          nombreCompleto: `Nombre ${i} Apellido ${i}`,
          estadoCivilConyugue: estadosCiviles[Math.floor(Math.random() * estadosCiviles.length)],
          ocupacionConyugue: ocupaciones[Math.floor(Math.random() * ocupaciones.length)],
          domicilioConyugue: `Calle ${i} #${Math.floor(Math.random() * 100)}`,
          distritoConyugue: distritos[Math.floor(Math.random() * distritos.length)],
          provinciaConyugue: provincias[Math.floor(Math.random() * provincias.length)],
          departamentoConyugue: departamentos[Math.floor(Math.random() * departamentos.length)],

          // Información Financiera
          costoLote: `${Math.floor(Math.random() * 100000)}`,
          pagoInicial: `${Math.floor(Math.random() * 10000)}`,
          separacion: `${Math.floor(Math.random() * 5000)}`,
          anticipo: `${Math.floor(Math.random() * 10000)}`,
          montoCuotas: `${Math.floor(Math.random() * 1000)}`,
          cantidadCuotas: `${Math.floor(Math.random() * 36)}`,
          montoCuota: `${Math.floor(Math.random() * 1000)}`,
          mantenimientoMensualNumero: `${Math.floor(Math.random() * 500)}`,
          mantenimientoMensualLetras: `Mantenimiento ${i}`,
          estadoCuenta: estadosCuenta[Math.floor(Math.random() * estadosCuenta.length)],
          modalidadDeudaLetras: `Modalidad ${i}`,
          cuota: `${Math.floor(Math.random() * 36)}`,
          diaPagoNumero: `${Math.floor(Math.random() * 28) + 1}`,
          correoElectronico: `cliente${i}@example.com`,
          celular: `9${Math.floor(Math.random() * 100000000)}`,
        });
      }

      this.contratos = fakeContratos;
    },
  },
};
</script>

<style scoped>
</style>
