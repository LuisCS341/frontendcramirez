<template>
  <div>
    <h3>Copropietario {{ index + 1 }}</h3>

    <label>Nombre y Apellido:</label>
    <input
        v-model="copropietario.nombreCopropietarios"
        type="text"
        readonly
        @input="copropietario.nombreCopropietarios = copropietario.nombreCopropietarios.replace(/[0-9]/g, '')"
    />

    <label>Ocupación:</label>
    <input
        type="text"
        v-model="copropietario.ocupacionCopropietario"
        placeholder="Ingrese su Ocupación"
        @input="copropietario.ocupacionCopropietario = copropietario.ocupacionCopropietario.replace(/[0-9]/g, '')"
    />

    <label>Tipo de Identificación:</label>
    <select v-model="copropietario.tipoIdentificacionCopropietarios">
      <option v-for="tipo in tipoIdentificacion" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
    </select>

    <label>Número de Identificación:</label>
    <input
        v-model="copropietario.numIdentificacionCopropietarios"
        type="text"
        placeholder="Ingrese su Número de Identificación"
    />

    <label>País de Origen:</label>
    <select v-model="copropietario.paisOrigenCopropietarios">
      <option disabled value="">Seleccione un país</option>
      <option v-for="pais in paises" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
    </select>

    <label>País de Residencia:</label>
    <select v-model="copropietario.paisResidenciaCopropietarios">
      <option disabled value="">Seleccione un país</option>
      <option v-for="residencia in residencias" :key="residencia.id" :value="residencia.id">{{ residencia.nombre }}</option>
    </select>

    <label>Departamento:</label>
    <select v-model="copropietario.departamentoCopropietarios">
      <option disabled value="">Selecciona un departamento</option>
      <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
    </select>

    <label>Provincia:</label>
    <select v-model="copropietario.provinciaCopropietarios">
      <option disabled value="">Seleccione una provincia</option>
      <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}</option>
    </select>

    <label>Distrito:</label>
    <select v-model="copropietario.distritoCopropietarios">
      <option disabled value="">Seleccione un distrito</option>
      <option v-for="distrito in distritosFiltrados" :key="distrito.id" :value="distrito.id">{{ distrito.nombre }}</option>
    </select>

    <label>Dirección:</label>
    <input
        v-model="copropietario.direccionCopropietariosHogar"
        type="text"
        placeholder="Ingrese su Dirección"
    />

    <label>Correo Electrónico:</label>
    <input
        v-model="copropietario.correoUsuarioCopropietarios"
        type="email"
        placeholder="usuario@dominio.com"
    />

    <label>Número Telefónico:</label>
    <div style="display: flex; gap: 5px;">
      <select v-model="copropietario.prefijoTelefonicoCopropietarios">
        <option v-for="prefijo in prefijos" :key="prefijo.id" :value="prefijo.id">{{ prefijo.codigo }}</option>
      </select>
      <input
          v-model="copropietario.numTelefonicoCopropietarios"
          type="text"
          placeholder="Ingrese su Número Telefónico"
          @input="copropietario.numTelefonicoCopropietarios = copropietario.numTelefonicoCopropietarios.replace(/[^0-9]/g, '')"
      />
    </div>

    <label>Estado Civil:</label>
    <select v-model="copropietario.estadoCivilCopropietarios">
      <option v-for="estado in estadoCivil" :key="estado.id" :value="estado.id">{{ estado.nombre }}</option>
    </select>
  </div>
</template>
<script setup>
import { departamentos } from '@/data/departamentos.js';
import { provincias } from '@/data/provincias.js';
import { distritos } from '@/data/distritos.js';
import { paises } from '@/data/paises.js';
import { residencias } from '@/data/residencias.js'
import {prefijos} from "@/data/prefijos.js";
import { estadoCivil } from '@/data/estadoCivil.js';
import { tipoIdentificacion } from '@/data/tipoIdentificacion.js';
import { computed, watch } from 'vue';

const props = defineProps({
  index: Number,
  copropietario: Object
});

// ✅ Provincias según departamento
const provinciasFiltradas = computed(() =>
    provincias.filter(p => p.departamentoId === props.copropietario.departamentoCopropietarios)
);

// ✅ Distritos según provincia
const distritosFiltrados = computed(() =>
    distritos.filter(d => d.provinciaId ===  props.copropietario.provinciaCopropietarios)
);


// 🔁 Resetear provincia y distrito si cambia el departamento
watch(() => props.copropietario.departamentoCopropietarios, () => {
  props.copropietario.provinciaCopropietarios = "";
  props.copropietario.distritoCopropietarios = "";
});

// 🔁 Resetear distrito si cambia la provincia
watch(()   => props.copropietario.provinciaCopropietarios, () => {
  props.copropietario.distritoCopropietarios = "";
});

</script>
