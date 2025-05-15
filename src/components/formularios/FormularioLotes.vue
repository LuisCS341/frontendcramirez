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


    <label>Manzana:</label>
    <input
        v-model="lote.manzanalote"
        type="text"
        required
        placeholder="Ingrese su Manzana"
    />

    <label>Número de Lote:</label>
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

    <label>Monto en Letras:</label>
    <input
        v-model="lote.montoLetras"
        type="text"
        readonly
    />


    <label>Pago Inicial:</label>
    <input
        v-model="lote.pagoInicial"
        type="number"
        required
        placeholder="Ingrese su Pago Inicial"
    />

    <label>Separacion:</label>
    <input
        v-model="lote.separacion"
        type="text"
        required
        placeholder="Ingrese su Separacion"
    />

    <label>Monto en Cuotas:</label>
    <input
        v-model="lote.montoCuotas"
        type="number"
        required
        placeholder="Ingrese su Monto en Cuotas"
    />

    <label>Cantidad de Cuotas:</label>
    <input
        v-model="lote.cantidadCuotas"
        type="number"
        required
        placeholder="Ingrese su Cantidad de Cuotas"
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
          />
          <span>No</span>
        </label>
      </div>
    </div>


  </div>

</template>

<script setup>
import {numeroLetrasSinDecimal} from "@/data/numeroLetrasSinDecimal.js";
import {numeroLetrasAreaLote} from "@/data/numeroLetrasAreaLote.js";
import {ref} from "vue";

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
  proyectos: Array,
  tiposContrato: Array,
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

</script>

