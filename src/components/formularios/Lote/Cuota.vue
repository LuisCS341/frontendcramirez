<template>

  <label>Cuota Inicial Incluye Separación:</label>
  <input
      v-model="lote.cuota.cuotaInicialIncluyeSeparacion"
      type="text"
      required
      placeholder="Ingrese la Cuota Inicial Incluye Separación"
      @input="
      lote.cuota.cuotaInicialIncluyeSeparacion = lote.cuota.cuotaInicialIncluyeSeparacion.toString().replace(/[^0-9.]/g, '');
      lote.cuota.cuotaInicialIncluyeSeparacionLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.cuotaInicialIncluyeSeparacion).toFixed(2));
    "
  />

  <label>Cuota Inicial Incluye Separación en Letras:</label>
  <input
      v-model="lote.cuota.cuotaInicialIncluyeSeparacionLetras"
      type="text"
      readonly
      required
  />

  <label>Cuota Inicial Fecha de Pago (agregar a base de datos):</label>
  <input
      v-model="lote.cuota.cuotaInicialFechaPago"
      type="text"
      readonly
      required
  />

  <label>Cuota Inicial - Banco:</label>
  <input
      v-model="lote.cuota.cuotaInicialBanco"
      type="text"
      required
      placeholder="Ingrese la Cuota Inicial - Banco"
  />

  <label>Cuenta Recaudadora:</label>
  <input
      v-model="lote.cuota.cuentaRecaudadora"
      type="text"
      required
      placeholder="Ingrese la Cuenta Recaudadora"
  />

  <label>Fecha de Pago:</label>
  <input
      v-model="lote.cuota.fechaPago"
      type="text"
      required
      @input="formatearFecha($event, 'inicio')"
      placeholder="dd/mm/aaaa"
      maxlength="10"

  />



  <label>Saldo del Lote (pendiente a formula):</label>
  <input
      v-model="lote.cuota.saldoLote"
      type="text"
      required
      placeholder="Ingrese el Saldo de Lote"
      @input="
      lote.cuota.saldoLote = lote.cuota.saldoLote.toString().replace(/[^0-9.]/g, '');
      lote.cuota.saldoLoteLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.saldoLote).toFixed(2));
    "
  />

  <label>Saldo de Lote en Letras:</label>
  <input
      v-model="lote.cuota.saldoLoteLetras"
      type="text"
      required
      readonly
  />


  <label>Cantidad de Cuotas:</label>
  <input
      v-model="lote.cuota.cantidadCuotas"
      type="text"
      required
      placeholder="Ingrese la Cantidad de Cuotas"
      @input="
      lote.cuota.cantidadCuotas = lote.cuota.cantidadCuotas.toString().replace(/[^0-9.]/g, '');
      lote.cuota.cantidadCuotaLetras = numeroLetrasEntero((lote.cuota.cantidadCuotas));
    "
  />

  <label>Cantidad de Cuotas en Letras:</label>
  <input
      v-model="lote.cuota.cantidadCuotaLetras"
      type="text"
      required
      readonly
  />


  <label>Cantidad de Cuotas - Banco:</label>
  <input
      v-model="lote.cuota.cantidadCuotaBanco"
      type="text"
      required
      placeholder="Ingrese la Cantidad de Cuotas - Banco"
  />

  <label>Cantidad de Cuotas Cuenta Recaudadora:</label>
  <input
      v-model="lote.cuota.cantidadCuotaCuentaRecaudadora"
      type="text"
      required
      placeholder="Ingrese la Cantidad de Cuotas Cuenta Recaudadora"
  />



  <label>Monto de Cuotas:</label>
  <input
      v-model="lote.cuota.montoCuotas"
      type="number"
      required
      placeholder="Ingrese su Monto en Cuotas"
      step="any"
      @input="
      lote.cuota.montoCuotas = lote.cuota.montoCuotas.toString().replace(/[^0-9.]/g, '');
      lote.cuota.montoCuotaLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.montoCuotas).toFixed(2));
    "
  />

  <label>Monto De Cuota en Letras:</label>
  <input
      v-model="lote.cuota.montoCuotaLetras"
      type="text"
      required
      readonly

  />

</template>

<script setup>

import {numeroLetrasEntero, numeroLetrasSinDecimal} from "@/data/numeroLetrasConNumeros.js";

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
