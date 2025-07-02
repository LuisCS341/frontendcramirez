<template>
  <div>
    <h3>Cuota {{ index + 1 }}</h3>


    <div>
      <label>Cantidad de Cuotas:</label>
      <input
          type="text"
          v-model="lote.cuota.cantidadCuotas"
          required
          placeholder="Cantidad de Cuotas"
      />
    </div>

    <div>
      <label>Cantidad Cuota Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.cantidadCuotaLetras"
          required
          placeholder="Cantidad Cuota Letras"
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
      <input
          type="text"
          v-model="lote.cuota.cantidadCuotaBanco"
          required
          placeholder="Cantidad de Cuotas Banco"
      />
    </div>

    <div>
      <label>Monto de Cuotas:</label>
      <input
          type="text"
          v-model="lote.cuota.montoCuotas"
          required
          placeholder="Monto de Cuotas"
      />
    </div>
    <div>
      <label>Monto de Cuota en Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.montoCuotaLetras"
          required
          placeholder="Monto de Cuota en Letras"
      />
    </div>

    <div>
      <label>Cuota Inicial Incluye Separacion:</label>
      <input
          type="text"
          v-model="lote.cuota.cuotaInicialIncluyeSeparacion"
          required
          placeholder="Cuota Inicial Incluye Separacion"
      />
    </div>
    <div>
      <label>Cuota Inicial Incluye Separacion en Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.cuotaInicialIncluyeSeparacionLetras"
          required
          placeholder="Cuota Inicial Incluye Separacion"
      />
    </div>

    <div>
      <label>Cuota Inicial Fecha Pago:</label>
      <input
          type="text"
          v-model="lote.cuota.fechaPago"
          required
          readonly
          placeholder="Cuenta Recaudadora"
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
      <input
          type="text"
          v-model="lote.cuota.cuotaInicialBanco"
          required
          placeholder="Cuota Inicial Banco"
      />
    </div>


    <div>
      <label>Cantidad de Cuota Banco:</label>
      <select v-model="lote.cuota.CantidadCuotaBanco" required>
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