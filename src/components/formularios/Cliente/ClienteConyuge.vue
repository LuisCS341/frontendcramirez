<template>
  <div v-if="form">
    <h1 class="titulodatoslotes">DATOS DEL CONYUGE</h1>

    <div class="identificacion">
    <label for="tipoIdentificacion">Tipo de Identificación:</label>
    <select v-model="form.conyuge.tipoIdentificacionClienteConyuge" id="tipoIdentificacion">
      <option v-for="tipo in tipoIdentificacion" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
    </select>

    <label>Número de Identificación:</label>
    <input
        v-model="form.conyuge.numIdentificacionClienteConyuge"
        type="text"
        required
        maxlength="8"
        placeholder="Ingrese su Número de Identificación"
        @input="form.conyuge.numIdentificacionClienteConyuge = form.conyuge.numIdentificacionClienteConyuge.replace(/[^0-9]/g, '')"
    />
    </div>
    <label>Nombre y Apellido:</label>
    <input
        v-model="form.conyuge.nombreClienteConyuge"
        type="text"
        readonly
        @input="form.conyuge.nombreClienteConyuge = form.conyuge.nombreClienteConyuge.replace(/[0-9]/g, '')"
    />

    <label>Ocupación:</label>
    <input
        v-model="form.conyuge.ocupacionClienteConyuge"
        type="text"
        required
        placeholder="Ingrese su Ocupación"
        @input="form.conyuge.ocupacionClienteConyuge = form.conyuge.ocupacionClienteConyuge.replace(/[0-9]/g, '')"
    />

    <label for="paisOrigen">País de Origen:</label>
    <select v-model="form.conyuge.paisOrigenClienteConyuge" id="paisOrigen">
      <option disabled value="">Seleccione un país</option>
      <option v-for="pais in nacionalidad" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
    </select>

    <label for="paisResidencia">País de Residencia:</label>
    <select v-model="form.conyuge.paisResidenciaClienteConyuge" id="paisResidencia">
      <option disabled value="">Seleccione un país</option>
      <option v-for="residencia in residencias" :key="residencia.id" :value="residencia.id">{{ residencia.nombre }}</option>
    </select>

    <label for="departamento">Departamento:</label>
    <select v-model="form.conyuge.departamentoClienteConyuge" id="departamento">
      <option disabled value="">Selecciona un departamento</option>
      <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
    </select>

    <label>Provincia:</label>
    <select v-model="form.conyuge.provinciaClienteConyuge">
      <option disabled value="">Seleccione una provincia</option>
      <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}</option>
    </select>

    <label>Distrito:</label>
    <select v-model="form.conyuge.distritoClienteConyuge">
      <option disabled value="">Seleccione un distrito</option>
      <option v-for="distrito in distritosFiltrados" :key="distrito.id" :value="distrito.id">{{ distrito.nombre }}</option>
    </select>

    <label>Dirección:</label>
    <input
        v-model="form.conyuge.direccionClienteConyuge"
        type="text"
        placeholder="Ingrese su Dirección"
        required
    />

  </div>
</template>

<script setup>
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";
import {departamentos} from "@/data/departamentos.js";
import { nacionalidad } from '@/data/nacionalidad.js';
import { residencias } from '@/data/residencias.js'
import {prefijos} from "@/data/prefijos.js";
import { tipoIdentificacion } from '@/data/tipoIdentificacion.js';
import {computed, watch} from "vue";

const props = defineProps({
  form: Object
});

// ✅ Provincias según departamento
const provinciasFiltradas = computed(() =>
    provincias.filter(p => p.departamentoId === props.form.conyuge.departamentoClienteConyuge)
);

// ✅ Distritos según provincia
const distritosFiltrados = computed(() =>
    distritos.filter(d => d.provinciaId === props.form.conyuge.provinciaClienteConyuge)
);

// 🔁 Resetear provincia y distrito si cambia el departamento
watch(() => props.form.conyuge.departamentoClienteConyuge, () => {
  props.form.conyuge.provinciaClienteConyuge = "";
  props.form.conyuge.distritoClienteConyuge = "";
});

// 🔁 Resetear distrito si cambia la provincia
watch(() => props.form.conyuge.provinciaClienteConyuge, () => {
  props.form.conyuge.distritoClienteConyuge = "";
});

</script>
