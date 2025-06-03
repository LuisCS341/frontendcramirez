<template>
  <div >
    <h4>Cuota Extraordinaria para Lote {{ index + 1 }}</h4>



    <div>
      <label>Pago Inicial:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.pagoInicial"
          required

      />
    </div>

    <div>
      <label>Separación:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.separacion"
          required

      />
    </div>

    <div>
      <label>Cantidad Cuota Extraordinaria:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.cantidadCuotaExtraordinaria"
          required

      />
    </div>

    <div>
      <label>Monto de Cuota Extraordinaria:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.montoCuotaExtraordinaria"
          required

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
      <label>Día de Pago en Número:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.diaPagoNumero"
          required
      />
    </div>

    <div>
      <label>Dia de Pago en Letras:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.diaPagoLetras"
          required
      />
    </div>

    <div>
      <label>Poner Monto:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.ponerMonto"
          required
      />
    </div>
  </div>
</template>

<script setup>
import {numeroLetrasConNumeros} from "@/data/numeroLetrasConNumeros.js";

defineProps({
  cuotaextraordinaria: {type: Object,},
  lote: {type: Object, required: true},
  index: {type: Number, required: true}
});

</script>
