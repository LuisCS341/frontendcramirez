<template>
  <div>
    <h3>Cuota {{ index + 1 }}</h3>



    <div>
      <label>Cuenta Recaudadora:</label>
      <input
          type="text"
          v-model="lote.cuota.cuentaRecaudadora"
          required
          placeholder="Cuenta Recaudadora"
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
      <label>Fecha Pago: - NO SE COLOCA</label>
      <input
          type="text"
          v-model="lote.cuota.fechaPago"
          required
          placeholder="Fecha Pago"
      />
    </div>

    <div>
      <label>Cuota Inicial Banco: - INGRESA DATO BANCO</label>
      <input
          type="text"
          v-model="lote.cuota.cuotaInicialBanco"
          required
          placeholder="Cuota Inicial Banco"
      />
    </div>
    <div>
      <label>Saldo de Lote:</label>
      <input
          type="text"
          v-model="lote.cuota.saldoLote"
          required
          placeholder="Saldo de Lote"
      />
    </div>
    <div>
      <label>Saldo de Lote Letras:</label>
      <input
          type="text"
          v-model="lote.cuota.saldoLoteLetras"
          required
          placeholder="Saldo de Lote Letras"
      />
    </div>
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
      <label>Cantidad Cuota Banco:- INGRESA DATO BANCO</label>
      <input
          type="text"
          v-model="lote.cuota.cantidadCuotaBanco"
          required
          placeholder="Cantidad Cuota Banco"
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