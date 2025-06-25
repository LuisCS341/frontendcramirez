<template>
<div class="formulario-all">
  <h2 class="tituloformulario">DATOS PERSONALES</h2>
  <form @submit.prevent="handleSubmit">

    <div class="form-row">
      <div class="form-group">
        <label>TIPO DE IDENTIFICACIÓN</label>
        <select v-model="form.tipoIdentificacion" required>
          <option v-for="tipo in tipoIdentificacion" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>NÚMERO DE IDENTIFICACIÓN</label>
        <input v-model="form.numIdentificacionUsuario" type="text" maxlength="8" required
          @input="form.numIdentificacionUsuario = form.numIdentificacionUsuario.replace(/[^0-9]/g, '')"/>
      </div>
    </div>

    <div class="form-group">
      <label>APELLIDO Y NOMBRE</label>
      <input v-model="form.nombreCliente" type="text" required
        @input="form.nombreCliente = form.nombreCliente.replace(/[0-9]/g, '')"/>
    </div>
    <div class="form-group">
      <label>OCUPACION</label>
      <input v-model="form.ocupacionCliente" type="text" required
        @input="form.ocupacionCliente = form.ocupacionCliente.replace(/[0-9]/g, '')"/>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>PAÍS DE ORIGEN</label>
        <select v-model="form.nacionalidad" required>
          <option disabled value="">Seleccione un país</option>
          <option v-for="pais in nacionalidad" :key="pais.id" :value="pais.id">{{ pais.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>PAÍS DE RESIDENCIA</label>
        <select v-model="form.paisdeResidencia" required>
          <option disabled value="">Seleccione un país</option>
          <option v-for="residencia in residencias" :key="residencia.id" :value="residencia.id">{{ residencia.nombre }}</option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>DEPARTAMENTO</label>
        <select v-model="form.departamento" required>
          <option disabled value="">Selecciona un departamento</option>
          <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>PROVINCIA</label>
        <select v-model="form.provincia" required>
          <option disabled value="">Seleccione una provincia</option>
          <option v-for="provincia in provinciasFiltradas" :key="provincia.id" :value="provincia.id">{{ provincia.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>DISTRITO</label>
        <select v-model="form.distrito" required>
          <option disabled value="">Seleccione un distrito</option>
          <option v-for="distrito in distritosFiltrados" :key="distrito.id" :value="distrito.id">{{ distrito.nombre }}</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>DIRECCIÓN</label>
      <input v-model="form.direccion" type="text" required/>
    </div>

    <div class="form-row">
      <div class="form-group" style="flex:2;">
        <label>CORREO ELECTRÓNICO</label>
        <input v-model="form.correoUsuario" type="email" placeholder="USUARIO@DOMINIO.COM" required/>
      </div>
      <div class="form-group" style="flex:1;">
        <label>PREFIJO</label>
        <select v-model="form.prefijoTelefonico" required>
          <option v-for="prefijo in prefijos" :key="prefijo.id" :value="prefijo.id">{{ prefijo.codigo }}</option>
        </select>
      </div>
      <div class="form-group" style="flex:2;">
        <label>NÚMERO DE TELEFÓNICO</label>
        <input v-model="form.numTelefonico" type="text" required
          @input="form.numTelefonico = form.numTelefonico.replace(/[^0-9]/g, '')"/>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group" style="flex:2;">
        <label>ESTADO CIVIL</label>
        <select v-model="form.estadoCivil" required>
          <option v-for="estado in estadoCivil" :key="estado.id" :value="estado.id">{{ estado.nombre }}</option>
        </select>
      </div>
      <div class="form-group" style="flex:2;display:flex;align-items:end;">
        <button type="button" class="btn-descripcion">
          DESCRIPCION ESTADO CIVIL
        </button>
      </div>
    </div>

    <button type="submit" class="btn-siguiente">SIGUIENTE</button>
  </form>
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
import {computed} from "vue";
import { ref } from 'vue';

const progress = ref(100); // Por ejemplo, 20% para el primer paso


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
