<template>
  <td>
    <template v-if="columna.editable && cliente.editando && campoEditable">
      <select v-if="columna.tipo === 'select'" v-model="modelo">
        <option disabled value="">Seleccione una opción</option>
        <option v-for="opt in optionsData" :key="opt.id" :value="opt.id">
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
import {tiposContrato} from "@/data/tiposContrato.js";
import {getConyuge, getCopropietario, getCuotaExtraordinaria, getLote, getMatriz, getLindero} from "@/data/funcionesGetTablaClientes.js";

const props = defineProps({
  cliente: Object,
  columna: Object,
  tiposContrato: Array
})


const modelo = computed({
  get() {
    const lote = getLote(props.cliente);

    // Primero intenta acceder a los valores de lote y otros objetos
    return getMatriz(lote)?.[props.columna.key] ??
        getLindero(lote)?.[props.columna.key] ??
        getConyuge(props.cliente)?.[props.columna.key] ??
        getCopropietario(props.cliente)?.[props.columna.key] ??
        getCuotaExtraordinaria(lote)?.[props.columna.key] ??
        props.cliente?.[props.columna.key] ?? '-';
  },
  set(value) {
    const lote = getLote(props.cliente);

    // Si columna tiene un campo "nested" se asigna en el objeto correspondiente
    if (props.columna.nested) {
      switch (props.columna.nested) {
        case 'matriz':
          getMatriz(lote)[props.columna.key] = value;
          break;
        case 'lindero':
          getLindero(lote)[props.columna.key] = value;
          break;
        case 'copropietario':
          getCopropietario(props.cliente)[props.columna.key] = value;
          break;
        case 'conyuge':
          getConyuge(props.cliente)[props.columna.key] = value;
          break;
        case 'cuotaextraordinaria':
          getCuotaExtraordinaria(lote)[props.columna.key] = value;
          break;
        default:
          lote[props.columna.key] = value;
          break;
      }
    } else {
      // Si no hay "nested", asigna el valor directamente a cliente
      props.cliente[props.columna.key] = value;
    }
  }
});


const valorMostrado = computed(() => {
  const lote = getLote(props.cliente);

  if (props.columna.format) {
    return props.columna.format(props.cliente);
  }

  return getMatriz(lote)?.[props.columna.key] ??
      getLindero(lote)?.[props.columna.key] ??
      getConyuge(props.cliente)?.[props.columna.key] ??
      getCopropietario(props.cliente)?.[props.columna.key] ??
      getCuotaExtraordinaria(lote)?.[props.columna.key] ??
      lote?.[props.columna.key] ?? '-';
});

const optionsData = computed(() => {
  if (props.columna.options === 'tiposContrato') {
    return props.tiposContrato;
  }
  return [];
});

const campoEditable = computed(() => {
  let valor;
  const lote = getLote(props.cliente);

  valor = getMatriz(lote)?.[props.columna.key] ??
      getLindero(lote)?.[props.columna.key] ??
      getConyuge(props.cliente)?.[props.columna.key] ??
      getCopropietario(props.cliente)?.[props.columna.key] ??
      getCuotaExtraordinaria(lote)?.[props.columna.key] ??
      lote?.[props.columna.key];

  return valor !== null && valor !== undefined && valor !== '';
});

</script>
