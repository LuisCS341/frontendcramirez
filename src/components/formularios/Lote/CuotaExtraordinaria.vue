<template>
  <div >
    <h4>Cuota Extraordinaria para Lote {{ index + 1 }}</h4>


    <div>
      <label>Cantidad de Cuota Extraordinaria:</label>
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

    <label>Mantenimiento Mensual:</label>
    <input
        type="text"
        v-model="lote.mantenimientoMensual"
        required
        placeholder="Ingrese su Estado de Cuenta"
        @input="lote.mantenimientoMensualLetras=numeroLetrasConNumerosDolares(lote.mantenimientoMensual);"
    />

    <label>Mantenimiento Mensual en Letras:</label>
    <input
        v-model="lote.mantenimientoMensualLetras"
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
          required
      />
    </div>



    <div>
      <label>Letras Pendiente de Pago:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.letrasPendientePago"
          required
      />
    </div>

    <div>
      <label>Fecha de Entrega:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.fechaEntrega"
          required
      />
    </div>

    <div>
      <label>Carta de No Adeudo:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.cartaNoAdeudo"
          required
      />
    </div>


    <div>
      <label>Certificado de Lote:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.certificadoLote"
          required
      />
    </div>

    <div>
      <label>Medios de Pago:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.mediosPago"
          required
      />
    </div>

    <div>
      <label>Planos 1:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.plano1"
          required
      />
    </div>

    <div>
      <label>Planos 2:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.plano2"
          required
      />
    </div>


    <div>
      <label>Envio de Minuta:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.envioMinuta"
          required
      />
    </div>

    <div>
      <label>Fecha de Cita:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.fechaCita"
          required
      />
    </div>
    <div>
      <label>Hora de Cita:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.horaCita"
          required
      />
    </div>
    <div>
      <label>Modif. Minuta:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.modificarMinuta"
          required
      />
    </div>
    <div>
      <label>Minuta Escaneada:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.minutaEscaneada"
          required
      />
    </div>

    <div>
      <label>Exp Notaria:</label>
      <input
          type="text"
          v-model="lote.cuotaextraordinaria.expNotaria"
          required
      />
    </div>

  </div>
</template>

<script setup>
import {numeroLetrasConNumeros, numeroLetrasConNumerosDolares} from "@/data/numeroLetrasConNumeros.js";

defineProps({
  cuotaextraordinaria: {type: Object,},
  lote: {type: Object, required: true},
  index: {type: Number, required: true}
});

</script>
