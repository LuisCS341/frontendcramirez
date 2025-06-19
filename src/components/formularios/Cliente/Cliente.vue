<template>
  <div v-if="form" class="container">
    <div class="formulario-all">
      <h3>Datos Personales</h3>
      <form>
        <div>
          <label>Tipo de Identificación:</label>
          <select v-model="form.tipoIdentificacion" required>
            <option v-for="tipo in tipoIdentificacion" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
          </select>
        </div>

        <div>
          <label>Número de Identificación:</label>
          <input v-model="form.numIdentificacionUsuario" type="text" required maxlength="8" @input="form.numIdentificacionUsuario = form.numIdentificacionUsuario.replace(/[^0-9]/g, '')" />
        </div>

        <div style="grid-column: span 2">
          <label>Apellido y Nombre:</label>
          <input v-model="form.nombreCliente" type="text" required @input="form.nombreCliente = form.nombreCliente.replace(/[0-9]/g, '')" />
        </div>

        <div style="grid-column: span 2">
          <label>Ocupación:</label>
          <input v-model="form.ocupacionCliente" type="text" required placeholder="Ingrese su Ocupación" @input="form.ocupacionCliente = form.ocupacionCliente.replace(/[0-9]/g, '')" />
        </div>

        <div>
          <label>País de Origen:</label>
          <select v-model="form.nacionalidad" required>
            <option disabled value="">Seleccione un país</option>
            <option v-for="pais in nacionalidad" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
          </select>
        </div>

        <div>
          <label>País de Residencia:</label>
          <select v-model="form.paisdeResidencia" required>
            <option disabled value="">Seleccione un país</option>
            <option v-for="residencia in residencias" :key="residencia.id" :value="residencia.id">{{ residencia.nombre }}</option>
          </select>
        </div>

        <div>
          <label>Departamento:</label>
          <select v-model="form.departamento" required>
            <option disabled value="">Selecciona un departamento</option>
            <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
          </select>
        </div>

        <div>
          <label>Provincia:</label>
          <select v-model="form.provincia" required>
            <option disabled value="">Seleccione una provincia</option>
            <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}</option>
          </select>
        </div>

        <div>
          <label>Distrito:</label>
          <select v-model="form.distrito" required>
            <option disabled value="">Seleccione un distrito</option>
            <option v-for="distrito in distritosFiltrados" :key="distrito.id" :value="distrito.id">{{ distrito.nombre }}</option>
          </select>
        </div>

        <div style="grid-column: span 2">
          <label>Dirección:</label>
          <input v-model="form.direccion" type="text" required placeholder="Ingrese su Dirección" />
        </div>

        <div style="grid-column: span 2">
          <label>Correo Electrónico:</label>
          <input v-model="form.correoUsuario" type="text" required placeholder="usuario@dominio.com" />
        </div>

        <div>
          <label>Número Telefónico:</label>
          <div class="prefijo-cliente">
            <select v-model="form.prefijoTelefonico" required>
              <option v-for="prefijo in prefijos" :key="prefijo.id" :value="prefijo.id">{{ prefijo.codigo }}</option>
            </select>
            <input v-model="form.numTelefonico" type="text" placeholder="Ingrese su Número" required @input="form.numTelefonico = form.numTelefonico.replace(/[^0-9]/g, '')" />
          </div>
        </div>

        <div>
          <label>Estado Civil:</label>
          <select v-model="form.estadoCivil" required>
            <option v-for="estado in estadoCivil" :key="estado.id" :value="estado.id">{{ estado.nombre }}</option>
          </select>
        </div>

        <div>
          <label>Descripción de Estado Civil:</label>
          <input v-model="form.descripcionEstadoCivil" type="text" required placeholder="Ingrese la Descripcion de Estado Civil" />
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";
import {departamentos} from "@/data/departamentos.js";
import { nacionalidad } from '@/data/nacionalidad.js';
import { residencias } from '@/data/residencias.js'
import {prefijos} from "@/data/prefijos.js";
import { estadoCivil } from '@/data/estadoCivil.js';
import { tipoIdentificacion } from '@/data/tipoIdentificacion.js';
import "@/components/formularios/Cliente/Cliente.css"
import {computed, watch} from "vue";

const props = defineProps({
  form: Object
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
