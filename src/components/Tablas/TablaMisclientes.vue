<template>
  <div class="tabla-mis-clientes">
    <h2>Tabla Mis Clientes</h2>
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>Nombres y Apellidos</th>
          <th>Dirección</th>
          <th>Correo Electrónico</th>
          <th>Celular</th>
          <th>Número Identificación</th>
          <th>Estado Civil</th>
          <th>Ocupación</th>
          <th>Residencia</th>
          <th>Prefijo</th>
          <th>Departamento</th>
          <th>Provincia</th>
          <th>Distrito</th>
          <th>Nacionalidad</th>
          <th>Identificación</th>
          <th>Operario</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cliente in misClientes" :key="cliente.numeroIdentificacion">
          <td>{{ cliente.nombresApellidos }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>{{ cliente.correoElectronico }}</td>
          <td>{{ cliente.celularCliente }}</td>
          <td>{{ cliente.numeroIdentificacion }}</td>
          <td>{{ cliente.idEstadoCivil }}</td>
          <td>{{ cliente.idOcupacion }}</td>
          <td>{{ cliente.idResidencia }}</td>
          <td>{{ cliente.idPrefijo }}</td>
          <td>{{ cliente.idDepartamento }}</td>
          <td>{{ cliente.idProvincia }}</td>
          <td>{{ cliente.idDistrito }}</td>
          <td>{{ cliente.idNacionalidad }}</td>
          <td>{{ cliente.idIdentificacion }}</td>
          <td>{{ cliente.idOperario }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import ("@/assets/Tablas/Tablas.css")
import axios from 'axios';

export default {
  data() {
    return {
      clientes: [],
      userId: 2, // Cambia este valor por el ID del operario logueado.
    };
  },
  computed: {
    misClientes() {
      return this.clientes.filter(
          (cliente) => cliente.idOperario === this.userId
      );
    },
  },
  mounted() {
    this.obtenerClientes();
  },
  methods: {
    async obtenerClientes() {
      try {
        const response = await axios.get('http://localhost:8080/api/clientes');
        this.clientes = response.data;
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    },
  },
};
</script>
