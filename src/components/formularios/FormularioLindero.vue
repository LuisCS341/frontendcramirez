<template>
  <div>
    <h4>Lindero para Lote {{ index + 1 }}</h4>

    <label>Por la derecha(m):</label>
    <input v-model="lote.linderos.porLaDerechaLindero" type="number" step="any" required />

    <label>Por la izquierda(m):</label>
    <input v-model="lote.linderos.porLaIzquierdaLindero" type="number" step="any" required />

    <label>Por el frente(m):</label>
    <input v-model="lote.linderos.porElFrenteLindero" type="number" step="any" required />

    <label>Por el fondo(m):</label>
    <input v-model="lote.linderos.porElFondoLindero" type="number" step="any" required />
  </div>
</template>

<script setup>

defineProps({
  lote: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});


</script>
