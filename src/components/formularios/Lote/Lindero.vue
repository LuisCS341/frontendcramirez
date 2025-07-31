<template>
  <div>
    <h4>Lindero para Lote {{ index + 1 }}</h4>

    <label>Por la derecha(m):</label>
    <input v-model="lote.lindero.porLaDerechaLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por la derecha"
    />

    <label>Por la izquierda(m):</label>
    <input v-model="lote.lindero.porLaIzquierdaLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por la izquierda"
    />

    <label>Por el frente(m):</label>
    <input v-model="lote.lindero.porElFrenteLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por el frente"
    />

    <label>Por el fondo(m):</label>
    <input v-model="lote.lindero.porElFondoLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por el fondo"
    />
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
