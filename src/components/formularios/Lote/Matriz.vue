<template>

  <div class="modal">
    <h2 class="tituloformulario">Detalles de Matriz</h2>
    <div class="formulario-all-matriz-a">
      <h3>Matriz {{ index + 1 }}</h3>

      <label>Departamento:</label>
      <select v-model="lote.matriz.departamentoMatriz" class="select-readonly">
        <option value="" disabled>Selecciona un departamento</option>
        <option v-for="d in departamentos" :key="d.id" :value="d.id">
          {{ d.nombre }}
        </option>
      </select>

      <label>Provincia:</label>
      <select v-model="lote.matriz.provinciaMatriz" class="select-readonly">
        <option disabled value="">Seleccione una provincia</option>
        <option v-for="p in provincias" :key="p.id" :value="p.id">{{ p.nombre }}</option>
      </select>

      <label>Distrito:</label>
      <select v-model="lote.matriz.distritoMatriz" class="select-readonly">
        <option value="" disabled>Selecciona un distrito</option>
        <option v-for="d in distritos" :key="d.id" :value="d.id">{{ d.nombre }}</option>
      </select>

      <label>Ubicación:</label>
      <select v-model="lote.matriz.ubicacionMatriz" class="select-readonly">
        <option value="" disabled>Seleccione una ubicación</option>
        <option v-for="u in ubicaciones" :key="u.id" :value="u.id">{{ u.UbicacionLote }}</option>
      </select>

      <label>Área Matriz (Has):</label>
      <input
          v-model.number="lote.matriz.areaMatrizHasMatriz"
          type="number"
          readonly
      />

      <label>Registros DE:</label>
      <input v-model="lote.matriz.registroDeMatriz" type="text" />

      <label>Partida Matriz:</label>
      <input v-model="lote.matriz.partidaMatriz" type="text" />

      <label>Unidad Catastral:</label>
      <input
          v-model="lote.matriz.unidadCatastralMatriz"
          type="text"
          readonly
      />

      <label>Urbanización Matriz:</label>
      <input
          v-model="lote.matriz.urbanizacionMatriz"
          type="text"
          readonly
      />

      <label>Compraventa Matriz:</label>
      <input
          v-model="lote.matriz.compraventaMatriz"
          type="text"
          readonly
      />

      <label>Situación Legal:</label>
      <input
          v-model="lote.matriz.situacionLegalMatriz"
          type="text"
          readonly
      />
    </div>
  </div>

</template>

<script setup>
import {computed} from "vue";
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";

const props = defineProps({
  lote: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  departamentos: Array,
  provincias: Array,
  distritos: Array,
  ubicaciones: Array
});

</script>