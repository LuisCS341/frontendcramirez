<template>
  <div>
    <h3>Cuota {{ index + 1 }}</h3>

    <div>
      <label>Cuota Inicial Incluye Separacion:</label>
      <input
          type="text"
          v-model="lote.cuota.cuotaInicialIncluyeSeparacion"
          required
          placeholder="Cuota Inicial Incluye Separacion"
          @input="
      lote.cuota.cuotaInicialIncluyeSeparacion = lote.cuota.cuotaInicialIncluyeSeparacion.toString().replace(/[^0-9.]/g, '');
      lote.cuota.cuotaInicialIncluyeSeparacionLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.cuotaInicialIncluyeSeparacion).toFixed(2));
    "
      />
    </div>

    <div>
      <label>Cuota Inicial Incluye Separacion en Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.cuotaInicialIncluyeSeparacionLetras"
          required
          readonly
      />
    </div>

    <div>
      <label>Cuota Inicial Fecha Pago:</label>
      <input
          type="text"
          v-model="lote.cuota.fechaPago"
          required
          readonly
          placeholder="Cuota Inicial Fecha Pago"
      />
    </div>
    <div>
      <label>Cuota Inicial Cuenta Recaudadora:</label>
      <input
          type="text"
          v-model="lote.cuota.cuentaRecaudadora"
          required
          placeholder="Cuenta Recaudadora"
      />
    </div>

    <div>
      <label>Cuota Inicial Banco:</label>
      <select v-model="lote.cuota.cuotaInicialBanco" required>
        <option disabled value="">Seleccione un banco</option>
        <option
            v-for="banco in bancos"
            :key="banco.id"
            :value="banco.nombre"
        >
          {{ banco.nombre }}
        </option>
      </select>
    </div>

    <div>
      <label>Saldo de Lote:</label>
      <input
          type="text"
          v-model="lote.cuota.saldoLote"
          required
          placeholder="Saldo de Lote"
          @input="
      lote.cuota.saldoLote = lote.cuota.saldoLote.toString().replace(/[^0-9.]/g, '');
      lote.cuota.saldoLoteLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.saldoLote).toFixed(2));
    "
      />
    </div>
    <div>
      <label>Saldo de Lote Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.saldoLoteLetras"
          required
          readonly
      />
    </div>
    <div>
      <label>Cantidad de Cuotas:</label>
      <input
          type="text"
          v-model="lote.cuota.cantidadCuotas"
          required
          placeholder="Cantidad de Cuotas"
          @input="
      lote.cuota.cantidadCuotas = lote.cuota.cantidadCuotas.toString().replace(/[^0-9.]/g, '');
      lote.cuota.cantidadCuotaLetras = numeroLetrascuotaletras(parseFloat(lote.cuota.cantidadCuotas).toFixed(2));
      "
      />
    </div>

    <div>
      <label>Cantidad de Cuotas en Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.cantidadCuotaLetras"
          required
          readonly
      />
    </div>

    <div>
      <label>Cantidad Cuota Cuenta Recaudadora:</label>
      <input
          type="text"
          v-model="lote.cuota.cantidadCuotaCuentaRecaudadora"
          required
          placeholder="Cantidad Cuota Cuenta Recaudadora"
      />
    </div>
    <div>
      <label>Cantidad de Cuotas Banco:</label>
      <select v-model="lote.cuota.cantidadCuotaBanco" required>
        <option disabled value="">Seleccione un banco</option>
        <option
            v-for="banco in bancos"
            :key="banco.id"
            :value="banco.nombre"
        >
          {{ banco.nombre }}
        </option>
      </select>
    </div>
    <div>
      <label>Monto de Cuotas:</label>
      <input
          type="text"
          v-model="lote.cuota.montoCuotas"
          required
          placeholder="Monto de Cuotas"
          @input="
      lote.cuota.montoCuotas = lote.cuota.montoCuotas.toString().replace(/[^0-9.]/g, '');
      lote.cuota.montoCuotaLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.montoCuotas).toFixed(2));
      "
      />
    </div>
    <div>
      <label>Monto de Cuota en Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.montoCuotaLetras"
          required
          readonly
      />
    </div>
    <div>
      <label>Cuota Pendiente Pago:</label>
      <input
          type="text"
          v-model="lote.cuota.cuotaPendientePago"
          required
          placeholder="Cuota Pendiente Pago"
      />
    </div>
    <div>
      <label>Letras Pendiente de Pago:</label>
      <input
          type="text"
          v-model="lote.cuota.letrasPendientePago"
          required
          placeholder="Letras Pendiente de Pago"
      />
    </div>



  </div>

</template>

<script setup>
import {bancos} from "@/data/bancos.js";
import {
  numeroLetrasSinDecimal,
  numeroLetrascuotaletras
} from "@/data/numeroLetrasConNumeros.js";

defineProps({
  lote: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
});



</script>