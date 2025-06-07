<template>
  <div class="modal-resumen-registo">
    <h2 class="tituloformulario">Resumen del Registro</h2>

    <div>

      <div class="seccion-cliente">
        <h3>Datos del Cliente</h3>
        <p><strong>Nombre y Apellido:</strong> {{ form.nombreCliente }}</p>
        <p><strong>Nacionalidad:</strong> {{ obtenerNombrePais(form.paisOrigen, nacionalidad) }}</p>
        <p><strong>País de Residencia:</strong> {{ obtenerNombreResidencia(form.paisdeResidencia, residencias) }}</p>
        <p><strong>Departamento:</strong> {{ obtenerNombreDepartamento(form.departamento, departamentos) }}</p>
        <p><strong>Provincia:</strong> {{ obtenerNombreProvincia(form.provincia, provincias) }}</p>
        <p><strong>Distrito:</strong> {{ obtenerNombreDistrito(form.distrito, distritos) }}</p>
        <p><strong>Código de Cliente Asignado:</strong> {{ form.idCliente.toString().padStart(5, '0') }}</p>
        <p><strong>Número de Contratos:</strong> {{ form.lotes.length }}</p>
      </div>

      <div class="seccion-lotes" v-if="form.lotes.length">
        <h3>Información de Lotes</h3>
        <div v-for="(lote, index) in form.lotes" :key="index" class="lote-box">
          <h4>Lote {{ index + 1 }}:</h4>
          <p><strong>Proyecto:</strong> {{ obtenerNombreProyecto(lote.proyectolote, proyectos) }}</p>
          <p><strong>Manzana:</strong> {{ lote.manzanalote }}</p>
          <p><strong>Lote:</strong> {{ lote.numerolote }}</p>
        </div>
      </div>

      <div class="seccion-contacto">
        <p><strong>Correo Electrónico:</strong> {{ form.correoUsuario }}</p>
        <p><strong>Teléfono:</strong> {{ form.numTelefonico }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";
import {departamentos} from "@/data/departamentos.js";
import { nacionalidad } from '@/data/nacionalidad.js';
import { residencias } from '@/data/residencias.js'
import {useRouter} from "vue-router";
import {proyectos} from "@/data/proyectos.js";

const router = useRouter();

defineProps({
  form: Object,

  obtenerNombrePais: {
    type: Function,
    required: true
  },
  obtenerNombreResidencia: {
    type: Function,
    required: true
  },
  obtenerNombreDepartamento: {
    type: Function,
    required: true
  },
  obtenerNombreProvincia: {
    type: Function,
    required: true
  },
  obtenerNombreDistrito: {
    type: Function,
    required: true
  },
  obtenerNombreProyecto: {
    type: Function,
    required: true
  },
});



</script>
