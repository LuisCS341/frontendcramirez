<template>

    <div class="modal">
      <h2 class="tituloformulario">Detalles de Matriz</h2>
      <div class="formulario-all-matriz-a">
        <form @submit.prevent="finalizarRegistroMatriz">
          <div v-for="(matriz, index) in form.lotes" :key="index">
            <h3>Matriz {{ index + 1 }}</h3>

            <label>Departamento:</label>
            <select v-model="matriz.matriz.departamentoMatriz" class="select-readonly">
              <option value="" disabled>Selecciona un departamento</option>
              <option v-for="d in departamentos" :key="d.id" :value="d.id">
                {{ d.nombre }}
              </option>
            </select>

            <label>Provincia:</label>
            <select v-model="matriz.matriz.provinciaMatriz" class="select-readonly">
              <option disabled value="">Seleccione una provincia</option>
              <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}</option>
            </select>

            <label>Distrito:</label>
            <select v-model="matriz.matriz.distritoMatriz" class="select-readonly">
              <option value="" disabled>Selecciona un distrito</option>
              <option v-for="distrito in distritosFiltrados" :key="distrito.id" :value="distrito.id">{{ distrito.nombre }}</option>
            </select>

            <label>Ubicación:</label>
            <select v-model="matriz.matriz.ubicacionMatriz" class="select-readonly">
              <option value="" disabled>Seleccione una ubicación</option>
              <option
                  v-for="ubicacion in ubicaciones"
                  :key="ubicacion.id"
                  :value="ubicacion.id"
              >
                {{ ubicacion.UbicacionLote }}
              </option>
            </select>

            <label for="areaMatrizHas">Área Matriz (Has):</label>
            <input
                id="areaMatrizHas"
                v-model.number="matriz.matriz.areaMatrizHasMatriz"
                type="number"
                min="0"
                readonly
            />

            <label for="Registros_DE">Registros DE:</label>
            <input id="Registros_DE" v-model="matriz.matriz.registroDeMatriz" type="text" />

            <label for="Partida_Matriz">Partida Matriz:</label>
            <input id="Partida_Matriz" v-model="matriz.matriz.partidaMatriz" type="text" />

            <label for="Unidad_Catastral">Unidad Catastral:</label>
            <input
                id="Unidad_Catastral"
                v-model="matriz.matriz.unidadCatastralMatriz"
                type="text"
                readonly
            />

            <label for="Urbanizacion_Matriz">Urbanización Matriz:</label>
            <input
                id="Urbanizacion_Matriz"
                v-model="matriz.matriz.urbanizacionMatriz"
                type="text"
                readonly
            />

            <label for="Compraventa_Matriz">Compraventa Matriz:</label>
            <input
                id="Compraventa_Matriz"
                v-model="matriz.matriz.compraventaMatriz"
                type="text"
                readonly
            />

            <label for="Situacion_Legal">Situación Legal:</label>
            <input
                id="Situacion_Legal"
                v-model="matriz.matriz.situacionLegalMatriz"
                type="text"
                readonly
            />

            <label for="Alicuota">Alicuota (%):</label>
            <input
                id="Alicuota"
                v-model="matriz.matriz.alicuotaMatriz"
                type="number"
                readonly
                step="any"
                @input="matriz.matriz.alicuotaLetrasMatriz = numeroALetras(parseFloat(matriz.matriz.alicuotaMatriz).toFixed(3))"
            />

            <label>Alicuota en Letras:</label>
            <input v-model="matriz.matriz.alicuotaLetrasMatriz" type="text" readonly />
          </div>
          <button type="submit" class="btn btn-primary">Siguiente</button>
        </form>
      </div>
    </div>

</template>

<script setup>
defineProps({
  form: Object,
  departamentos: Array,
  provincias: Array,
  distritos: Array,
  ubicaciones: Array,
  numeroALetras: Function,
  finalizarRegistroMatriz: Function,
});

// ✅ Provincias según departamento
const provinciasFiltradas = computed(() =>
    provincias.filter(p => p.departamentoId === props.form.departamento)
);

// ✅ Distritos según provincia
const distritosFiltrados = computed(() =>
    distritos.filter(d => d.provinciaId === props.form.provincia)
);

</script>
