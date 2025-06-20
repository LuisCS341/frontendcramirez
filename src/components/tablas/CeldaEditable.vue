<template>
  <td>
    <template v-if="fila.editando && campoEditable">
      <input v-model="modelo" type="text" />
    </template>

    <template v-else>
      {{ valorMostrado }}
    </template>
  </td>
</template>

<script setup>
import { computed } from 'vue'
import {tiposContrato} from "@/data/tiposContrato.js";
import {getConyugeCliente, getCopropietario, getCuotaExtraordinaria, getLote, getMatriz, getLindero} from "@/data/funcionesGetTablaClientes.js";

const props = defineProps({
  cliente: Object,
  fila: Object,
  columna: Object,
  tiposContrato: Array
})

const modelo = computed({
  get() {
    const valor = obtenerValor(props.columna.key);
    return valor == null ? "-" : valor;
  },

  set(value) {
    if (props.columna.nested) {
      switch (props.columna.nested) {
        case 'matriz':
          getMatriz(props.fila)[props.columna.key] = value;
          break;
        case 'lindero':
          getLindero(props.fila)[props.columna.key] = value;
          break;
        case 'copropietario':
          getCopropietario(props.fila)[props.columna.key] = value;
          break;
        case 'conyuge':
          getConyugeCliente(props.fila)[props.columna.key] = value;
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
  return getMatriz(props.fila)?.[0]?.[props.columna.key] ??
      getLindero(props.fila)?.[props.columna.key] ??
      getConyugeCliente(props.fila)?.[props.columna.key] ??
      getCopropietario(props.fila)?.[props.columna.key] ??
      getCuotaExtraordinaria(props.fila)?.[props.columna.key] ??
      props.fila.lote?.[props.columna.key] ??
      props.fila?.[props.columna.key] ?? '';
});


const campoEditable = computed(() => {
  const valor =
      getMatriz(props.fila)?.[0]?.[props.columna.key] ??
      getLindero(props.fila)?.[props.columna.key] ??
      getConyugeCliente(props.fila)?.[props.columna.key] ??
      getCopropietario(props.fila)?.[props.columna.key] ??
      getCuotaExtraordinaria(props.fila)?.[props.columna.key] ??
      props.fila.lote?.[props.columna.key] ??
      props.fila?.[props.columna.key];

  return valor !== null && valor !== undefined && valor !== "-" && props.columna.editable;
});


const obtenerValor = (key) =>
    getMatriz(props.fila)?.[0]?.[key] ??
    getLindero(props.fila)?.[key] ??
    getConyugeCliente(props.fila)?.[key] ??
    getCopropietario(props.fila)?.[key] ??
    getCuotaExtraordinaria(props.fila)?.[key] ??
    props.fila.lote?.[key] ??
    props.fila?.[key];


</script>
