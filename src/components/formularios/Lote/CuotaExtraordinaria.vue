<template>
  <div >
    <h4>Cuota Extraordinaria para Lote {{ index + 1 }}</h4>


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

    <label>Mantenimiento Mensual:</label>
    <input
        type="text"
        v-model="lote.cuotaextraordinaria.mantenimientoMensual"
        required
        placeholder="Ingrese su Estado de Cuenta"
        @input="lote.cuotaextraordinaria.mantenimientoMensualLetras=numeroLetrasConNumerosDolares(lote.cuotaextraordinaria.mantenimientoMensual);"
    />

    <label>Mantenimiento Mensual en Letras:</label>
    <input
        v-model="lote.cuotaextraordinaria.mantenimientoMensualLetras"
        type="text"
        readonly
    />

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
      <label> Monto de Deuda en Letras:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.montoDeudaLetra"
          placeholder="Ingrese su Monto Deuda"
          required
          readonly
      />
    </div>

    <div>
      <label>Cuotas Pendientes de Pago:</label>
      <input
          type="number"
          v-model="lote.cuotaextraordinaria.cuotaPendientePago"
          placeholder="Ingrese Cuotas Pendientes de Pago"
          required
      />
    </div>



    <div>
      <label>Letras Pendiente de Pago:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.letrasPendientePago"
          placeholder="Ingrese Letras Pendiente de Pago"
          required
      />
    </div>

    <div>
      <label>Fecha de Entrega:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.fechaEntrega"
          required
          @input="formatearFecha($event, 'inicio')"
          placeholder="dd/mm/aaaa"
          maxlength="10"
      />
    </div>

    <div>
      <label>Carta de No Adeudo:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.cartaNoAdeudo"
          placeholder="Ingrese arta de No Adeudo"
          required
      />
    </div>


    <div>
      <label>Certificado de Lote:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.certificadoLote"
          placeholder="Ingrese Certificado de Lote"
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

    <div>
      <label>Planos 1:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.plano1"
          placeholder="Ingrese Planos 1"
          required
      />
    </div>

    <div>
      <label>Planos 2:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.plano2"
          placeholder="Ingrese Planos 2"
          required
      />
    </div>


    <div>
      <label>Envio de Minuta:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.envioMinuta"
          placeholder="Ingrese Envio de Minuta"
          required
      />
    </div>

    <div>
      <label>Fecha de Cita:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.fechaCita"
          placeholder="Ingrese Fecha de Cita"
          required
      />
    </div>
    <div>
      <label>Hora de Cita:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.horaCita"
          placeholder="Ingrese Hora de Cita"
          required
      />
    </div>
    <div>
      <label>Modif. Minuta:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.modificarMinuta"
          placeholder="Ingrese Modif. Minuta"
          required
      />
    </div>
    <div>
      <label>Minuta Escaneada:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.minutaEscaneada"
          placeholder="Ingrese Minuta Escaneada"
          required
      />
    </div>

    <div>
      <label>Exp Notaria:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.expNotaria"
          placeholder="Ingrese Exp Notaria"
          required
      />
    </div>

  </div>
</template>

<script setup>
import {numeroLetrasConNumeros, numeroLetrasConNumerosDolares} from "@/data/numeroLetrasConNumeros.js";
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
