<template>
  <div v-if="form">
    <h3>Datos Personales</h3>

    <label>Apellido y Nombre:</label>
    <input v-model="form.nombreCliente" type="text" @input="form.nombreCliente = form.nombreCliente.replace(/[0-9]/g, '')" />

    <label>Ocupación:</label>
    <input v-model="form.ocupacionCliente" type="text"  @input="form.ocupacionCliente = form.ocupacionCliente.replace(/[0-9]/g, '')" />

    <label>Tipo de Identificación:</label>
    <select v-model="form.tipoIdentificacion">
      <option v-for="tipo in tipoIdentificacion" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
    </select>

    <label>Número de Identificación:</label>
    <input v-model="form.numIdentificacionUsuario" type="text"  @input="form.numIdentificacionUsuario = form.numIdentificacionUsuario.replace(/[^0-9]/g, '')" />

    <label for="paisOrigen">País de Origen:</label>
    <select v-model="form.paisOrigen">
      <option disabled value="">Seleccione un país</option>
      <option v-for="pais in paises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
    </select>

    <label for="paisResidencia">País de Residencia:</label>
    <select v-model="form.paisdeResidencia">
      <option disabled value="">Seleccione un país</option>
      <option v-for="residencia in residencias" :key="residencia.id" :value="residencia.id">{{ residencia.nombre }}</option>
    </select>

    <label for="departamento">Departamento:</label>
    <select v-model="form.departamento">
      <option disabled value="">Selecciona un departamento</option>
      <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
    </select>

    <label>Provincia:</label>
    <select v-model="form.provincia">
      <option disabled value="">Seleccione una provincia</option>
      <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}</option>
    </select>

    <label>Distrito:</label>
    <select v-model="form.distrito">
      <option disabled value="">Seleccione un distrito</option>
      <option v-for="distrito in distritosFiltrados" :key="distrito.id" :value="distrito.id">{{ distrito.nombre }}</option>
    </select>

    <label>Dirección:</label>
    <input v-model="form.direccion" type="text"  />

    <label>Correo Electrónico:</label>
    <input v-model="form.correoUsuario" type="email" placeholder="usuario@dominio.com" />

    <label for="prefijoTelefonico">Número Telefónico:</label>
    <div class="prefijo-cliente">
      <select v-model="form.prefijoTelefonico">
        <option v-for="prefijo in prefijos" :key="prefijo.id" :value="prefijo.id">{{ prefijo.codigo }}</option>
      </select>
      <input v-model="form.numTelefonico" type="text" placeholder="Ingrese su número" @input="form.numTelefonico = form.numTelefonico.replace(/[^0-9]/g, '')" />
    </div>

    <label for="estadoCivil">Estado Civil:</label>
    <select v-model="form.estadoCivil">
      <option v-for="estado in estadoCivil" :key="estado.id" :value="estado.id">{{ estado.nombre }}</option>
    </select>
  </div>
</template>

<script setup>
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";
import {departamentos} from "@/data/departamentos.js";
import "@/assets/formulario/FormularioCliente.css"
import {computed, watch} from "vue";

const props = defineProps({
  form: Object,
  paises: Array,
  residencias: Array,
  prefijos: Array,
  estadoCivil: Array,
  tipoIdentificacion: Array,
  departamentos: Array,
  provincias: Array,
  distritos: Array,
});

// ✅ Provincias según departamento
const provinciasFiltradas = computed(() =>
    provincias.filter(p => p.departamentoId === props.form.departamento)
);

// ✅ Distritos según provincia
const distritosFiltrados = computed(() =>
    distritos.filter(d => d.provinciaId === props.form.provincia)
);



</script>
