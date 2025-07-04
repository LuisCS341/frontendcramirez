<template>
  <div >
    <h4>Cuota Extraordinaria para Lote {{ index + 1 }}</h4>


    <div>
      <label>Cantidad de Cuota Extraordinaria:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.cantidadCuotaExtraordinaria"
          placeholder="Ingrese Cantidad de Cuota Extraordinaria"
          step="any"
          required

      />
    </div>

    <div>
      <label>Monto de Cuota Extraordinaria:</label>
      <input
          type="number"
          step="any"
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
import {ref} from "vue";

const fechaInicioContrato = ref('');
const fechaCancelacionContrato = ref('');

defineProps({
  cuotaextraordinaria: {type: Object,},
  lote: {type: Object, required: true},
  index: {type: Number, required: true}
});

function formatearFecha(event, tipo) {

  let input = event.target.value;
  input = input.replace(/[^0-9]/g, '');

  if (input.length > 2) input = input.slice(0, 2) + '/' + input.slice(2);
  if (input.length > 5) input = input.slice(0, 5) + '/' + input.slice(5);
  if (input.length > 10) input = input.slice(0, 10);

  event.target.value = input;
  if (tipo === 'inicio') {
    fechaInicioContrato.value = input;
  } else if (tipo === 'cancelacion') {
    fechaCancelacionContrato.value = input;
  }
}

</script>
