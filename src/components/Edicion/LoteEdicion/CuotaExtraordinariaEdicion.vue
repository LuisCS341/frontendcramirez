<template>
  <div >
    <h4>Cuota Extraordinaria</h4>
    <div>
      <label>Cantidad de Cuota Extraordinaria:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.cantidadCuotaExtraordinaria"
          placeholder="Ingrese Cantidad de Cuota Extraordinaria"
          required

      />
    </div>

    <div>
      <label>Monto de Cuota Extraordinaria:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.montoCuotaExtraordinaria"
          placeholder="Ingrese el Monto de Cuota Extraordinaria"
          required

      />
    </div>

    <div>
      <label>Medios de Pago:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.mediosPago"
          placeholder="Ingrese  Medios de Pago"
          required
      />
    </div>
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
