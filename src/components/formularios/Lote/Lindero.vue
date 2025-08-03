<template>
  <div>
    <h4>Lindero para Lote {{ index + 1 }}</h4>

    <label>Por la Derecha(m):</label>
    <input v-model="lote.lindero.porLaDerechaLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por la derecha"
    />

    <label>Limite por la Derecha:</label>
    <input v-model="lote.lindero.DescripcionPorLaDerecha"
           type="text"
           step="any"
           required
           placeholder="Ingrese Limite por la Derecha"
    />

    <label>Por la Izquierda(m):</label>
    <input v-model="lote.lindero.porLaIzquierdaLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por la izquierda"
    />

    <label>Limite por la Izquierda:</label>
    <input v-model="lote.lindero.DescripcionPorLaIzquierda"
           type="text"
           step="any"
           required
           placeholder="Ingrese Limite por la Izquierda"
    />

    <label>Por el Frente(m):</label>
    <input v-model="lote.lindero.porElFrenteLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por el frente"
    />

    <label>Limite por el frente:</label>
    <input v-model="lote.lindero.DescripcionPorElFrente"
           type="text"
           step="any"
           required
           placeholder="Ingrese Limite por el frente"
    />

    <label>Por el Fondo(m):</label>
    <input v-model="lote.lindero.porElFondoLindero"
           type="number"
           step="any"
           required
           placeholder="Ingrese metro por el fondo"
    />

    <label>Limite por el Fondo:</label>
    <input v-model="lote.lindero.DescripcionPorElFondo"
           type="text"
           step="any"
           required
           placeholder="Ingrese Limite por el Fondo"
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
