<template>

  <div class="modal">
    <div class="formulario-all-matriz-a">
      <h3>Matriz {{ index + 1 }}</h3>

      <label>Departamento:</label>
      <select v-model="lote.matriz.departamentoMatriz">
        <option value="" disabled>Selecciona un departamento</option>
        <option v-for="d in departamentos" :key="d.id" :value="d.id">
          {{ d.nombre }}
        </option>
      </select>

      <label>Provincia:</label>
      <select v-model="lote.matriz.provinciaMatriz" >
        <option disabled value="">Seleccione una provincia</option>
        <option v-for="p in provinciasFiltradas" :key="p.id" :value="p.id">{{ p.nombre }}</option>
      </select>

      <label>Distrito:</label>
      <select v-model="lote.matriz.distritoMatriz" >
        <option value="" disabled>Selecciona un distrito</option>
        <option v-for="d in distritosFiltrados" :key="d.id" :value="d.id">{{ d.nombre }}</option>
      </select>

      <label>Ubicación:</label>
      <select v-model="lote.matriz.ubicacionMatriz" >
        <option value="" disabled>Seleccione una ubicación</option>
        <option v-for="u in ubicaciones" :key="u.id" :value="u.id">{{ u.UbicacionLote }}</option>
      </select>

      <label>Área Matriz (Has):</label>
      <input
          v-model.number="lote.matriz.areaMatrizHasMatriz"
          type="number"
          required
      />

      <label>Registros DE:</label>
      <input v-model="lote.matriz.registroDeMatriz" type="text" required />

      <label>Partida Matriz:</label>
      <input v-model="lote.matriz.partidaMatriz" type="text" required />

      <label>Unidad Catastral:</label>
      <input
          v-model="lote.matriz.unidadCatastralMatriz"
          type="text"
          required
      />

      <label>Urbanización Matriz:</label>
      <input
          v-model="lote.matriz.urbanizacionMatriz"
          type="text"
          required
      />

      <label>Compraventa Matriz:</label>
      <input
          v-model="lote.matriz.compraventaMatriz"
          type="text"
          required
      />

      <label>Situación Legal:</label>
      <input
          v-model="lote.matriz.situacionLegalMatriz"
          type="text"
          required
      />
    </div>
  </div>

</template>

<script setup>
import {computed} from "vue";
import {departamentos} from "@/data/departamentos.js";
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";
import {ubicaciones} from "@/data/ubicaciones.js";

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
  ubicaciones: Array,
});

const provinciasFiltradas = computed(() =>
    provincias.filter(p => p.departamentoId === props.lote.matriz?.departamentoMatriz)
);

const distritosFiltrados = computed(() =>
    distritos.filter(d => d.provinciaId === props.lote.matriz?.provinciaMatriz)
);



</script>