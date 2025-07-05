<template>
  <div>
    <h3 class="text-lg font-bold">🧾 Cuota {{ index + 1 }}</h3>

    <!-- Sección: Cuota Inicial -->
    <button @click="showCuotaInicial = !showCuotaInicial" class="section-button">
      {{ showCuotaInicial ? '▼' : '►' }} Cuota Inicial
    </button>
    <div v-show="showCuotaInicial">
      <div>
        <label>Cuota Inicial Incluye Separación:</label>
        <input
            type="text"
            v-model="lote.cuota.cuotaInicialIncluyeSeparacion"
            required
            placeholder="Cuota Inicial Incluye Separación"
            @input="
            lote.cuota.cuotaInicialIncluyeSeparacion = lote.cuota.cuotaInicialIncluyeSeparacion.toString().replace(/[^0-9.]/g, '');
            lote.cuota.cuotaInicialIncluyeSeparacionLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.cuotaInicialIncluyeSeparacion).toFixed(2));
          "
        />
      </div>

      <div>
        <label>Cuota Inicial Incluye Separación en Letras:</label>
        <input type="text" v-model="lote.cuota.cuotaInicialIncluyeSeparacionLetras" readonly />
      </div>

      <div>
        <label>Fecha Pago:</label>
        <input type="text" v-model="lote.cuota.fechaPago" readonly />
      </div>

      <div>
        <label>Cuenta Recaudadora:</label>
        <input type="text" v-model="lote.cuota.cuentaRecaudadora" />
      </div>

      <div>
        <label>Banco:</label>
        <select v-model="lote.cuota.cuotaInicialBanco">
          <option disabled value="">Seleccione un banco</option>
          <option v-for="banco in bancos" :key="banco.id" :value="banco.nombre">
            {{ banco.nombre }}
          </option>
        </select>
      </div>
    </div>

    <!-- Sección: Saldo del Lote -->
    <button @click="showSaldoLote = !showSaldoLote" class="section-button">
      {{ showSaldoLote ? '▼' : '►' }} Saldo del Lote
    </button>
    <div v-show="showSaldoLote">
      <div>
        <label>Saldo de Lote:</label>
        <input
            type="text"
            v-model="lote.cuota.saldoLote"
            @input="
            lote.cuota.saldoLote = lote.cuota.saldoLote.toString().replace(/[^0-9.]/g, '');
            lote.cuota.saldoLoteLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.saldoLote).toFixed(2));
          "
        />
      </div>

      <div>
        <label>Saldo en Letras:</label>
        <input type="text" v-model="lote.cuota.saldoLoteLetras" readonly />
      </div>
    </div>

    <!-- Sección: Cantidad de Cuotas -->
    <button @click="showCantidadCuotas = !showCantidadCuotas" class="section-button">
      {{ showCantidadCuotas ? '▼' : '►' }} Cantidad de Cuotas
    </button>
    <div v-show="showCantidadCuotas">
      <div>
        <label>Cantidad de Cuotas:</label>
        <input
            type="text"
            v-model="lote.cuota.cantidadCuotas"
            @input="
            lote.cuota.cantidadCuotas = lote.cuota.cantidadCuotas.toString().replace(/[^0-9.]/g, '');
            lote.cuota.cantidadCuotaLetras = numeroLetrascuotaletras(parseFloat(lote.cuota.cantidadCuotas).toFixed(2));
          "
        />
      </div>

      <div>
        <label>Cuotas en Letras:</label>
        <input type="text" v-model="lote.cuota.cantidadCuotaLetras" readonly />
      </div>

      <div>
        <label>Cuenta Recaudadora:</label>
        <input type="text" v-model="lote.cuota.cantidadCuotaCuentaRecaudadora" />
      </div>

      <div>
        <label>Banco:</label>
        <select v-model="lote.cuota.cantidadCuotaBanco">
          <option disabled value="">Seleccione un banco</option>
          <option v-for="banco in bancos" :key="banco.id" :value="banco.nombre">
            {{ banco.nombre }}
          </option>
        </select>
      </div>
    </div>

    <!-- Sección: Monto de Cuotas -->
    <button @click="showMontoCuotas = !showMontoCuotas" class="section-button">
      {{ showMontoCuotas ? '▼' : '►' }} Monto de Cuotas
    </button>
    <div v-show="showMontoCuotas">
      <div>
        <label>Monto de Cuotas:</label>
        <input
            type="text"
            v-model="lote.cuota.montoCuotas"
            @input="
            lote.cuota.montoCuotas = lote.cuota.montoCuotas.toString().replace(/[^0-9.]/g, '');
            lote.cuota.montoCuotaLetras = numeroLetrasSinDecimal(parseFloat(lote.cuota.montoCuotas).toFixed(2));
          "
        />
      </div>

      <div>
        <label>Monto en Letras:</label>
        <input type="text" v-model="lote.cuota.montoCuotaLetras" readonly />
      </div>
    </div>

    <!-- Sección: Pendientes -->
    <button @click="showPendientes = !showPendientes" class="section-button">
      {{ showPendientes ? '▼' : '►' }} Cuotas Pendientes
    </button>
    <div v-show="showPendientes">
      <div>
        <label>Cuota Pendiente Pago:</label>
        <input type="text" v-model="lote.cuota.cuotaPendientePago" />
      </div>

      <div>
        <label>Letras Pendiente de Pago:</label>
        <input type="text" v-model="lote.cuota.letrasPendientePago" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { bancos } from "@/data/bancos.js";
import {
  numeroLetrasSinDecimal,
  numeroLetrascuotaletras
} from "@/data/numeroLetrasConNumeros.js";

defineProps({
  lote: { type: Object, required: true },
  index: { type: Number, required: true },
});

// Estados de secciones desplegables
const showCuotaInicial = ref(true);
const showSaldoLote = ref(false);
const showCantidadCuotas = ref(false);
const showMontoCuotas = ref(false);
const showPendientes = ref(false);
</script>
<style>
.section-button {
  background: #f4f4f4;
  border: none;
  padding: 8px 12px;
  margin: 10px 0;
  font-weight: bold;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
}
</style>