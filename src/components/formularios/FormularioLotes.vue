<template>
  <div>

      <h4>Lote {{ index + 1 }}</h4>

      <label>Proyecto:</label>
      <select v-model="lote.proyectolote" >
        <option value="" disabled selected>Selecciona el proyecto</option>
        <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">{{ proyecto.nombre }}</option>
      </select>

      <label>Ubicacion de Lote:</label>
      <select v-model="lote.ubicacionLote">
        <option value="" disabled selected>Selecciona la Ubicacion</option>
        <option v-for="ubicacion in getUbicacionesFiltradas(lote.proyectolote)" :key="ubicacion.id" :value="ubicacion.id">{{ ubicacion.UbicacionLote}}</option>
      </select>

      <div v-if="lote.ubicacionLote" class="mini-formulario">

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
      <input v-model="lote.manzanalote" type="text" />

      <label>Número de Lote:</label>
      <input v-model="lote.numerolote" type="text" @input="lote.numerolote = lote.numerolote.replace(/[^0-9]/g, '')"/>

      <label>Tipo de Contrato:</label>
      <select v-model="lote.tipoContratolote">
        <option v-for="tipo in tiposContrato" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
      </select>

      <label>Área del Lote m2:</label>
      <input v-model="lote.areaLote" type="text" step="any" @input="lote.areaLote = lote.areaLote.replace(/[^0-9]/g, '')" />

      <label>Costo de Lote:</label>
      <input v-model="lote.costoLote" type="text" step="any" @input="lote.costoLote = lote.costoLote.replace(/[^0-9]/g, '')" />

      <label>Monto en Letras:</label>
      <input v-model="lote.montoLetras" type="text" />

      <label>Pago Inicial:</label>
      <input v-model="lote.pagoInicial" type="number" />

      <label>Separacion:</label>
      <input v-model="lote.separacion" type="text" />

      <label>Monto en Cuotas:</label>
      <input v-model="lote.montoCuotas" type="number" />

      <label>Cantidad de Cuotas:</label>
      <input v-model="lote.catidadCuotas" type="number" />


      <div>
        <label>¿Tiene cuota extraordinaria?</label>
        <div>
          <label for="si-{{ index }}">Sí</label>
          <input type="radio" :id="'si-' + index" />
        </div>
        <div>
          <label for="no-{{ index }}">No</label>
          <input type="radio" :id="'no-' + index" />
        </div>
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
  proyectos: Array,
  tiposContrato: Array,
  getUbicacionesFiltradas: Function,
});
</script>

