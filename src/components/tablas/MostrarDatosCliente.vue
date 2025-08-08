<template>
  <td>
    <template v-if="fila.editando && campoEditable">

      <select v-if="esSelect" v-model="modelo">
        <option v-for="opt in tiposContrato" :key="opt.id" :value="opt.id">
          {{ opt.nombre }}
        </option>
      </select>


      <input v-else v-model="modelo" type="text" />
    </template>

    <template v-else>
      {{ valorMostrado }}
    </template>
  </td>
</template>

<script setup>
import { computed } from 'vue'

import {getConyuge, getCopropietario, getCuotaExtraordinaria, getCuota,getLindero} from "@/data/funcionesGetTablaClientes.js";

const props = defineProps({
  cliente: Object,
  fila: Object,
  columna: Object,
  tiposContrato: Array
})


const esSelect = computed(() =>
    props.columna.type === 'select' || props.columna.key === 'idTipocontrato'
);

const tiposContrato = computed(() => props.tiposContrato ?? [])


const modelo = computed({
  get() {

    const valor = obtenerValor(props.columna.key);
    return valor == null ? "-" : valor;
  },

  set(value) {
    if (props.columna.nested === 'lote') {
      props.fila.lote[props.columna.key] = value;
    } else if (props.columna.nested) {
      props.fila[props.columna.key] = value;
    } else {
      props.fila.cliente[props.columna.key] = value;
    }

    if (props.columna.nested) {
      switch (props.columna.nested) {
        case 'lindero':
          getLindero(props.fila)[props.columna.key] = value;
          break;
        case 'cuota':
          getCuota(props.fila)[props.columna.key] = value;
          break;
        case 'copropietario':
          getCopropietario(props.fila)[props.columna.key] = value;
          break;
        case 'conyuge':
          getConyuge(props.fila)[props.columna.key] = value;
          break;
        case 'cuotaextraordinaria':
          getCuotaExtraordinaria(props.fila)[props.columna.key] = value;
          break;
        case 'lote':
          props.fila.lote[props.columna.key] = value;
          break;
        case 'cliente':
          props.fila[props.columna.key] = value;
          break;
        default:
          props.fila[props.columna.key] = value;
          break;
      }
    } else {
      props.fila.cliente[props.columna.key] = value;
    }
  }
});


const valorMostrado = computed(() => {

  if (props.columna.type === 'select' || props.columna.key === 'idTipoContrato') {
    const id = props.fila.lote?.[props.columna.key] ?? props.fila?.[props.columna.key];
    const encontrado = (props.tiposContrato ?? []).find(opt => String(opt.id) === String(id));
    return encontrado ? encontrado.nombre : '';
  }

  if (typeof props.columna.formatter === 'function') {
    return props.columna.formatter(props.fila);
  }

  return getLindero(props.fila)?.[props.columna.key] ??
      getConyuge(props.fila)?.[props.columna.key] ??
      getCuota(props.fila)?.[props.columna.key] ??
      getCopropietario(props.fila)?.[props.columna.key] ??
      getCuotaExtraordinaria(props.fila)?.[props.columna.key] ??
      props.fila.lote?.[props.columna.key] ??
      props.fila?.[props.columna.key] ?? '';
});



const campoEditable = computed(() => {
  const valor =
      getLindero(props.fila)?.[props.columna.key] ??
      getConyuge(props.fila)?.[props.columna.key] ??
      getCuota(props.fila)?.[props.columna.key] ??
      getCopropietario(props.fila)?.[props.columna.key] ??
      getCuotaExtraordinaria(props.fila)?.[props.columna.key] ??
      props.fila.lote?.[props.columna.key] ??
      props.fila?.[props.columna.key];

  return valor !== null && valor !== undefined && valor !== "-" && props.columna.editable;
});


const obtenerValor = (key) =>
    getLindero(props.fila)?.[key] ??
    getConyuge(props.fila)?.[key] ??
    getCuota(props.fila)?.[key] ??
    getCopropietario(props.fila)?.[key] ??
    getCuotaExtraordinaria(props.fila)?.[key] ??
    props.fila.lote?.[key] ??
    props.fila?.[key];


</script>