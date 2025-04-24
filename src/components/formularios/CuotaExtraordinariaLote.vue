<template>
  <div >
    <h4>Cuota Extraordinaria para Lote {{ index + 1 }}</h4>

    <div>
      <label>Cuota Extraordinaria:</label>
      <input type="number"  v-model="lote.cuotaextraordinaria.cuotaExtraordinaria" required />
    </div>

    <div>
      <label>Mantenimiento Mensual:</label>
      <input type="number"  v-model="lote.cuotaextraordinaria.mantenimientoMensual" required />
    </div>

    <div>
      <label>Mantenimiento Mensual (en letras):</label>
      <input type="text" v-model="lote.cuotaextraordinaria.mantenimientoMensualLetras" />
    </div>

    <div>
      <label>Estado de Cuenta:</label>
      <input type="text" v-model="lote.cuotaextraordinaria.estadoCuenta" />
    </div>

    <div>
      <label>Monto Deuda (en letras):</label>
      <input type="text" v-model="lote.cuotaextraordinaria.montoDeudaLetra" />
    </div>

    <div>
      <label>Cuota Pendiente de Pago:</label>
      <input type="number"  v-model="lote.cuotaextraordinaria.cuotaPendientePago" required />
    </div>
  </div>
</template>

<script setup>
defineProps({
  cuotaextraordinaria: {type: Object,},
  lote: {type: Object, required: true},
  index: {type: Number, required: true}
});

</script>
