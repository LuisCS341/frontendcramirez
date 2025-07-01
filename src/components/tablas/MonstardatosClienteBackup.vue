<template>
  <td>
    {{ valorMostrado }}
  </td>
</template>

<script setup>
import { computed } from 'vue'
import {getConyuge, getCopropietario, getCuotaExtraordinaria, getLote, getLindero} from "@/data/funcionesGetTablaClientes.js";

const props = defineProps({
  cliente: Object,
  fila: Object,
  columna: Object,
  tiposContrato: Array
})



const valorMostrado = computed(() => {
  const key = props.columna.key;

  return getLindero(props.fila)?.[key] ??
      getConyuge(props.fila)?.[key] ??
      getCopropietario(props.fila)?.[key] ??
      getCuotaExtraordinaria(props.fila)?.[key] ??
      props.fila.lote?.[key] ??
      props.fila?.[key] ?? '';
});


</script>
