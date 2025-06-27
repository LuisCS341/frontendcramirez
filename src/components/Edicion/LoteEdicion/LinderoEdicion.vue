<template>
  <div>
    <h4>Lindero </h4>

    <label>Por la derecha(m):</label>
    <input v-model="lote.lindero.porLaDerechaLindero" type="number" step="any" required />

    <label>Por la izquierda(m):</label>
    <input v-model="lote.lindero.porLaIzquierdaLindero" type="number" step="any" required />

    <label>Por el frente(m):</label>
    <input v-model="lote.lindero.porElFrenteLindero" type="number" step="any" required />

    <label>Por el fondo(m):</label>
    <input v-model="lote.lindero.porElFondoLindero" type="number" step="any" required />
  </div>
</template>

<script setup>

defineProps({
  lote: {
    type: Object,
    required: true
  },
});


</script>
