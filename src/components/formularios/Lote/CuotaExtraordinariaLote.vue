<template>
  <div >
    <h4>Cuota Extraordinaria para Lote {{ index + 1 }}</h4>

    <div>
      <label>Cuota Extraordinaria:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.cuotaExtraordinaria"
          required

      />
    </div>

    <div>
      <label>Mantenimiento Mensual:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.mantenimientoMensual"
          required
          placeholder="Ingrese su Mantenimiento Mensual"
          @input="lote.cuotaextraordinaria.mantenimientoMensualLetras = numeroLetrasEntero(lote.cuotaextraordinaria.mantenimientoMensual);"
      />
    </div>

    <div>
      <label>Mantenimiento Mensual (en letras):</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.mantenimientoMensualLetras"
          required
          readonly
      />
    </div>

    <div>
      <label>Estado de Cuenta:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.estadoCuenta"
          required
          placeholder="Ingrese su Estado de Cuenta"
          @input="lote.cuotaextraordinaria.montoDeudaLetra=numeroLetrasConNumeros(lote.cuotaextraordinaria.estadoCuenta);"
      />
    </div>

    <div>
      <label>Monto Deuda (en letras):</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.montoDeudaLetra"
          placeholder="Ingrese su Monto Deuda"
          required
          readonly
      />
    </div>

    <div>
      <label>Cuota Pendiente de Pago:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.cuotaPendientePago"
          required
      />
    </div>
  </div>
</template>

<script setup>
import {numeroLetrasEntero} from "@/data/numeroLetrasEntero.js";
import {numeroLetrasConNumeros} from "@/data/numeroLetrasConNumeros.js";

defineProps({
  cuotaextraordinaria: {type: Object,},
  lote: {type: Object, required: true},
  index: {type: Number, required: true}
});

</script>
