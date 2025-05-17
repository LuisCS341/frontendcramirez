<template>
  <div>
    <h3 class="titulodatoslotes">Datos del Cónyuge del Copropietario {{ index + 1 }}</h3>

    <label>Nombre y Apellido:</label>
    <input
        v-model="copropietario.conyuge.nombreCopropietariosConyuge"
        type="text"
        readonly
        @input="copropietario.conyuge.nombreCopropietariosConyuge = copropietario.conyuge.nombreCopropietariosConyuge.replace(/[0-9]/g, '')"
    />

    <label>Ocupación:</label>
    <input
        type="text"
        v-model="copropietario.conyuge.ocupacionCopropietarioConyuge"
        placeholder="Ingrese su Ocupación"
        @input="copropietario.conyuge.ocupacionCopropietarioConyuge = copropietario.conyuge.ocupacionCopropietarioConyuge.replace(/[0-9]/g, '')"
    >

    <label>Tipo de Identificación:</label>
    <select v-model="copropietario.conyuge.tipoIdentificacionCopropietariosConyuge" id="tipoIdentificacion">
      <option v-for="tipo in tipoIdentificacion" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
    </select>

    <label>Número de Identificación:</label>
    <input
        v-model="copropietario.conyuge.numIdentificacionCopropietariosConyuge"
        type="text"
        placeholder="Ingrese su Número de Identificación"
    />

    <label>País de Origen:</label>
    <select v-model="copropietario.conyuge.paisOrigenCopropietariosConyuge" id="paisOrigen">
      <option disabled value="">Seleccione un país</option>
      <option v-for="pais in paises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
    </select>

    <label>País de Residencia:</label>
    <select v-model="copropietario.conyuge.paisResidenciaCopropietariosConyuge" id="paisResidencia">
      <option disabled value="">Seleccione un país</option>
      <option v-for="residencia in residencias" :key="residencia.id" :value="residencia.id">{{ residencia.nombre }}</option>
    </select>

    <label for="departamento">Departamento:</label>
    <select v-model="copropietario.conyuge.departamentoCopropietariosConyuge" id="departamento">
      <option value="" disabled>Selecciona un departamento</option>
      <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
    </select>

    <label>Provincia:</label>
    <select v-model="copropietario.conyuge.provinciaCopropietariosConyuge">
      <option value="" disabled selected>Seleccione una provincia</option>
      <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}</option>
    </select>

    <label>Distrito:</label>
    <select v-model="copropietario.conyuge.distritoCopropietariosConyuge">
      <option value="" disabled selected>Seleccione un distrito</option>
      <option v-for="distrito in distritosFiltrados" :key="distrito.id" :value="distrito.id">{{ distrito.nombre }}</option>
    </select>

    <label>Dirección:</label>
    <input
        v-model="copropietario.conyuge.direccionCopropietariosConyuge"
        type="text"
        placeholder="Ingrese su Dirección"
    />

    <label>Correo Electrónico:</label>
    <input v-model="copropietario.conyuge.correoUsuarioCopropietariosConyuge" type="email" placeholder="usuario@dominio.com" />

    <label for="prefijoTelefonico">Número Telefónico:</label>
    <div style="display: flex; gap: 5px;">
      <select v-model="copropietario.conyuge.prefijoTelefonicoCopropietariosConyuge" id="prefijoTelefonico">
        <option v-for="prefijo in prefijos" :key="prefijo.id" :value="prefijo.id">{{ prefijo.codigo }}</option>
      </select>
      <input
          v-model="copropietario.conyuge.numTelefonicoCopropietariosConyuge"
          type="text"
          placeholder="Ingrese su número"
          @input="copropietario.conyuge.numTelefonicoCopropietariosConyuge = copropietario.conyuge.numTelefonicoCopropietariosConyuge.replace(/[^0-9]/g, '')"
      />
    </div>

  </div>
</template>

<script setup>

import {tipoIdentificacion} from "@/data/tipoIdentificacion.js";
import {paises} from "@/data/paises.js";
import {residencias} from "@/data/residencias.js";
import {departamentos} from "@/data/departamentos.js";
import {prefijos} from "@/data/prefijos.js";
import {distritos} from "@/data/distritos.js";
import {provincias} from "@/data/provincias.js";

import {computed, watch} from "vue";

const props = defineProps({
  index: Number,
  copropietario: Object
});

// ✅ Provincias del cónyuge según el departamento seleccionado
const provinciasFiltradas = computed(() =>
    provincias.filter(p => p.departamentoId === props.copropietario.conyuge.departamentoCopropietariosConyuge)
);

// ✅ Distritos del cónyuge según la provincia seleccionada
const distritosFiltrados = computed(() =>
    distritos.filter(d => d.provinciaId === props.copropietario.conyuge.provinciaCopropietariosConyuge)
);

// 🔁 Reseteo de provincia y distrito del cónyuge si cambia el departamento
watch(() => props.copropietario.conyuge.departamentoCopropietariosConyuge, () => {
  props.copropietario.conyuge.provinciaCopropietariosConyuge = "";
  props.copropietario.conyuge.distritoCopropietariosConyuge = "";
});

// 🔁 Reseteo de distrito del cónyuge si cambia la provincia
watch(() => props.copropietario.conyuge.provinciaCopropietariosConyuge, () => {
  props.copropietario.conyuge.distritoCopropietariosConyuge = "";
});

</script>

