<template>
  <div>

    <h4>Lote {{ index + 1 }}</h4>

    <label>Proyecto:</label>
    <select v-model="lote.proyectolote" >
      <option disabled value=""  >Selecciona el proyecto</option>
      <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">{{ proyecto.nombre }}</option>
    </select>

    <label>Ubicacion de Lote:</label>
    <select v-model="lote.ubicacionLote">
      <option disabled value="" >Selecciona la Ubicacion</option>
      <option v-for="ubicacion in getUbicacionesFiltradas(lote.proyectolote)" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion.UbicacionLote}}</option>
    </select>

    <button type="button" class="mostrar detalles" @click="mostrarFormulario[index] = !mostrarFormulario[index]">
      {{ mostrarFormulario[index] ? 'Ocultar detalles' : 'Mostrar detalles' }}
    </button>

    <div v-if="mostrarFormulario[index] && lote.ubicacionLote" class="mini-formulario">

      <div class="section">Información General</div>
      <label>Empresa:</label>
      <input v-model="lote.empresa" type="text" readonly />

      <label>Empresa que Vende:</label>
      <input v-model="lote.empresaVendedora" type="text" readonly />

      <label>RUC Vendedor:</label>
      <input v-model="lote.ruc" type="text" readonly />

      <label>Dirección Vendedor:</label>
      <input v-model="lote.direccion" type="text" readonly />

      <label>Representante Legal - Vendedor:</label>
      <input v-model="lote.representanteLegal" type="text" readonly />

      <div class="section">Información Financiera</div>
      <label>DNI Vendedor:</label>
      <input v-model="lote.dniVendedor" type="text" readonly />

      <label>Nº Partida (Poder Vendedor):</label>
      <input v-model="lote.partidaPoder" type="text" readonly />

      <label>Moneda:</label>
      <input v-model="lote.moneda" type="text" readonly />

      <label>Número de Cuenta:</label>
      <input v-model="lote.numCuenta" type="text" readonly />

      <label>CCI:</label>
      <input v-model="lote.cci" type="text" readonly />

      <div class="section">Fechas Importantes</div>
      <label>Fecha Sale :</label>
      <input v-model="lote.fechaSale" type="text" readonly />

      <label>Fecha de Firma de Contrato Definitivo:</label>
      <input v-model="lote.fechaFirma" type="text" readonly />

      <div class="section">Detalles de la Propiedad</div>
      <label>Área Matriz (Has.):</label>
      <input v-model="lote.areaMatriz" type="text" readonly />

      <label>Registros DE:</label>
      <input v-model="lote.registrosDe" type="text" readonly />

      <label>Partida Matriz:</label>
      <input v-model="lote.partidaMatriz" type="text" readonly />

      <label>Ubicación del Lote (Predio Matriz):</label>
      <input v-model="lote.ubicacionPredio" type="text" readonly />

      <label>Unidad Catastral de Matriz:</label>
      <input v-model="lote.unidadCatastral" type="text" readonly />

      <label>Urbanización de Matriz:</label>
      <input v-model="lote.urbanizacionMatriz" type="text" readonly />

      <label>Distrito de Matriz:</label>
      <input v-model="lote.distritoMatriz" type="text" readonly />

      <label>Provincia de Matriz:</label>
      <input v-model="lote.provinciaMatriz" type="text" readonly />

      <label>Departamento de Matriz:</label>
      <input v-model="lote.departamentoMatriz" type="text" readonly />

      <label>Compraventa de Matriz:</label>
      <input v-model="lote.compraventaMatriz" type="text" readonly />

      <label>Situación Legal de Matriz:</label>
      <input v-model="lote.situacionLegalMatriz" type="text" readonly />
    </div>


    <label>Manzana(MZ):</label>
    <input
        v-model="lote.manzanalote"
        type="text"
        required
        placeholder="Ingrese su Manzana"
    />

    <label>Lote(LT):</label>
    <input
        v-model="lote.numerolote"
        type="text"
        required
        placeholder="Ingrese su Número de Lote"
        @input="lote.numerolote = lote.numerolote.replace(/[^0-9]/g, '')"
    />

    <label>Tipo de Contrato:</label>
    <select v-model="lote.tipoContratolote">
      <option v-for="tipo in tiposContrato" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
    </select>

    <label>Fecha de Inicio de Contrato:</label>
    <input
        type="text"
        v-model="lote.fechaInicioContrato"
        @input="formatearFecha($event, 'inicio')"
        placeholder="dd/mm/aaaa"
        maxlength="10"
    />


    <label>Fecha de Cancelación de Contrato:</label>
    <input
        v-model="lote.fechaCancelacionContrato"
        @input="formatearFecha($event, 'cancelacion')"
        type="text"
        placeholder="dd/mm/aaaa"
        maxlength="10"
        required
    />

    <label>Área del Lote m2:</label>
    <input
        v-model="lote.areaLote"
        type="text"
        step="any"
        required
        placeholder="Ingrese su Área del Lote"
        @input="
          lote.areaLote = lote.areaLote.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
          lote.areaLoteLetras = numeroLetrasAreaLote(lote.areaLote);
          "
    />

    <label>Área del Lote en Letras:</label>
    <input
        v-model="lote.areaLoteLetras"
        type="text"
        readonly
    />

    <label>Costo de Lote:</label>
    <input
        v-model="lote.costoLote"
        step="any"
        required
        placeholder="Ingrese su Costo de Lote"
        @input="
      lote.costoLote = lote.costoLote.toString().replace(/[^0-9.]/g, '');
      lote.montoLetras = numeroLetrasSinDecimal(parseFloat(lote.costoLote).toFixed(2));
    "
    />

    <label>Costo del Lote en Letra:</label>
    <input
        v-model="lote.montoLetras"
        type="text"
        readonly
    />

    <label>Precio por MT2:</label>
    <input
        v-model="lote.precioMetroCuadrado"
        step="any"
        required
        placeholder="Ingrese precio por MT2"
    />

    <label>Precio por MT2 en Letras:</label>
    <input
        v-model="lote.precioMetroCuadradoLetras"
        type="text"
    />

    <label>Cuota Inicial Incluye Separación:</label>
    <input
        v-model="lote.cuotaInicialIncluyeSeparacion"
        step="any"
        required
    />

    <label>Cuota Inicial Incluye Separación en Letras:</label>
    <input
        v-model="lote.CuotaInicialIncluyeSeparacionLetras"
        type="text"
    />

    <label>Fecha de Pago:</label>
    <input
        v-model="lote.FechaPago"
        type="text"

    />

    <label>Cuenta Recaudadora:</label>
    <input
        v-model="lote.cuentaRecaudadora"
        type="text"

    />

    <label>Cuota Inicial - Banco:</label>
    <input
        v-model="lote.cuotaInicialBanco"
        type="text"

    />

    <label>Saldo del Lote:</label>
    <input
        v-model="lote.saldoLote"
        type="text"

    />

    <label>Saldo de Lote en Letras:</label>
    <input
        v-model="lote.saldoLoteLetras"
        type="text"
    />

    <label>Cantidad de Cuotas:</label>
    <input
        v-model="lote.cantidadCuotas"
        type="text"

    />

    <label>Cantidad de Cuotas en Letras:</label>
    <input
        v-model="lote.cantidadCuotaLetras"
        type="text"
    />

    <label>Cantidad de Cuotas Cuenta Recaudadora:</label>
    <input
        v-model="lote.cantidadCuotaCuentaRecaudadora"
        type="text"

    />

    <label>Cantidad de Cuotas - Banco:</label>
    <input
        v-model="lote.cantidadCuotaBanco"
        type="text"

    />


    <label>Monto de Cuotas:</label>
    <input
        v-model="lote.montoCuotas"
        type="number"
        required
        placeholder="Ingrese su Monto en Cuotas"
        step="any"
    />

    <label>Monto De Cuota en Letras:</label>
    <input
        v-model="lote.montoCuotaLetras"
        type="text"
    />



    <div>
      <label><strong>¿Tiene cuota extraordinaria?</strong></label>
      <div class="contenedor-radio-tarjetas">
        <label class="tarjeta-radio">
          <input
              type="radio"
              :id="'si-' + index"
              :name="'cuotaExtraordinaria-' + index"
              value="si"
              v-model="lote.tieneCuotaExtraordinaria"
              @change="inicializarCuotaExtraordinaria(lote)"
              required
          />
          <span>Sí</span>
        </label>
        <label class="tarjeta-radio">
          <input
              type="radio"
              :id="'no-' + index"
              :name="'cuotaExtraordinaria-' + index"
              value="no"
              v-model="lote.tieneCuotaExtraordinaria"
              @change="limpiarCuotaExtraordinaria(lote)"
              required
          />
          <span>No</span>
        </label>
      </div>
    </div>


  </div>

</template>

<script setup>
import {proyectos} from '@/data/proyectos.js';
import { tiposContrato } from '@/data/tiposContrato.js';
import {
  numeroLetrasConNumerosDolares,
  numeroLetrasAreaLote,
  numeroLetrasSinDecimal,
  numeroLetrasConDecimal
} from '@/data/numeroLetrasConNumeros.js';
import {ref, watch} from "vue";

const fechaInicioContrato = ref('');
const fechaCancelacionContrato = ref('');
const mostrarFormulario = ref({});


defineProps({
  lote: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  numeroALetras: Function,
  numeroLetrasSinDecimal: Function,
  getUbicacionesFiltradas: Function,
});

function limpiarCuotaExtraordinaria(lote) {
  delete lote.cuotaextraordinaria;
}

function inicializarCuotaExtraordinaria(lote) {
  lote.cuotaextraordinaria = {
    cuotaExtraordinariaLote: "",
    mantenimientoMensual: "",
    mantenimientoMensualLetras: "",
    estadoCuenta: "",
    montoDeudaLetra: "",
    cuotaPendientePago: "",
  };
}

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

watch(() => lote.montoCuotas, (nuevoValor) => {
  const valor = parseFloat(nuevoValor);
  if (!isNaN(valor)) {
    lote.montoCuotaLetras = numeroLetrasSinDecimal(valor.toFixed(2));
  } else {
    lote.montoCuotaLetras = '';
  }
});
// Área del lote -> Letras
watch(() => lote.areaLote, (nuevoValor) => {
  const valor = parseFloat(nuevoValor);
  if (!isNaN(valor)) {
    lote.areaLoteLetras = numeroLetrasAreaLote(valor);
  } else {
    lote.areaLoteLetras = '';
  }
});

// Costo del lote -> Letras
watch(() => lote.costoLote, (nuevoValor) => {
  const valor = parseFloat(nuevoValor);
  if (!isNaN(valor)) {
    lote.montoLetras = numeroLetrasSinDecimal(valor.toFixed(2));
  } else {
    lote.montoLetras = '';
  }
});

// Precio por metro cuadrado -> Letras
watch(() => lote.precioMetroCuadrado, (nuevoValor) => {
  const valor = parseFloat(nuevoValor);
  if (!isNaN(valor)) {
    lote.precioMetroCuadradoLetras = numeroLetrasSinDecimal(valor.toFixed(2));
  } else {
    lote.precioMetroCuadradoLetras = '';
  }
});

// Cuota inicial incluye separación -> Letras
watch(() => lote.cuotaInicialIncluyeSeparacion, (nuevoValor) => {
  const valor = parseFloat(nuevoValor);
  if (!isNaN(valor)) {
    lote.CuotaInicialIncluyeSeparacionLetras = numeroLetrasSinDecimal(valor.toFixed(2));
  } else {
    lote.CuotaInicialIncluyeSeparacionLetras = '';
  }
});

// Saldo del lote -> Letras
watch(() => lote.saldoLote, (nuevoValor) => {
  const valor = parseFloat(nuevoValor);
  if (!isNaN(valor)) {
    lote.saldoLoteLetras = numeroLetrasSinDecimal(valor.toFixed(2));
  } else {
    lote.saldoLoteLetras = '';
  }
});

// Cantidad de cuotas -> Letras
watch(() => lote.cantidadCuotas, (nuevoValor) => {
  const valor = parseInt(nuevoValor);
  if (!isNaN(valor)) {
    lote.cantidadCuotaLetras = numeroALetras(valor);
  } else {
    lote.cantidadCuotaLetras = '';
  }
});
</script>

