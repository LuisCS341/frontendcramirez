<template>
  <div v-if="form">
    <h2 class="tituloformulario">FORMULARIO DE CLIENTES</h2>
    <div class="formulario-all">
      <div v-if="formStep === 1">
        <form @submit.prevent="formularioClientevarios" class="formulario-cliente">
          <h1>DATOS PERSONALES</h1>
          <div class="form-grid">
            <div>
              <label class="form-label">Tipo de Identificación</label>
              <input class="form-input" v-model="form.tipoIdentificacion" type="text" />
            </div>
            <div>
              <label class="form-label">Número de Identificación</label>
              <input class="form-input" v-model="form.numIdentificacionUsuario" type="text" />
            </div>
            <div class="input-full">
              <label class="form-label">Apellido y Nombre</label>
              <input class="form-input" v-model="form.nombreCliente" type="text" />
            </div>
            <div class="input-full">
              <label class="form-label">Ocupación</label>
              <input class="form-input" v-model="form.ocupacionCliente" type="text" />
            </div>
            <div>
              <label class="form-label">País de Origen</label>
              <input class="form-input" v-model="form.paisOrigen" type="text" />
            </div>
            <div>
              <label class="form-label">País de Residencia</label>
              <input class="form-input" v-model="form.paisdeResidencia" type="text" />
            </div>
            <div>
              <label class="form-label">Departamento</label>
              <input class="form-input" v-model="form.departamento" type="text" />
            </div>
            <div>
              <label class="form-label">Provincia</label>
              <input class="form-input" v-model="form.provincia" type="text" />
            </div>
            <div>
              <label class="form-label">Distrito</label>
              <input class="form-input" v-model="form.distrito" type="text" />
            </div>
            <div class="input-full">
              <label class="form-label">Dirección</label>
              <input class="form-input" v-model="form.direccion" type="text" />
            </div>
            <div>
              <label class="form-label">Correo Electrónico</label>
              <input class="form-input" v-model="form.correoUsuario" type="email" />
            </div>
            <div>
              <label class="form-label">Prefijo</label>
              <input class="form-input" v-model="form.prefijoTelefonico" type="text" />
            </div>
            <div>
              <label class="form-label">Número de Teléfono</label>
              <input class="form-input" v-model="form.numTelefonico" type="text" />
            </div>
            <div>
              <label class="form-label">Estado Civil</label>
              <input class="form-input" v-model="form.estadoCivil" type="text" />
            </div>
          </div>
          <!-- Si tienes el componente ClienteConyuge, lo puedes dejar aquí -->
          <div v-if="form.estadoCivil === 2">
            <ClienteConyuge :form="form" />
          </div>
          <button type="submit" class="btn-naranja">Siguiente</button>
        </form>
      </div>

      <div v-if="formStep === 2">
        <form @submit.prevent="submitForm2" class="formulario-cliente">
          <h3>Información de Copropietarios</h3>
          <div class="form-grid input-full">
            <div>
              <label class="form-label">Número de Copropietarios</label>
              <input class="form-input" v-model.number="form.numCopropietarios" type="number" min="0" max="5" @input="validateNumCopropietarios"/>
            </div>
          </div>
          <div v-for="(copropietario, index) in form.copropietarios" :key="index">
            <Copropietario :index="index" :copropietario="copropietario" />
            <div v-if="copropietario.estadoCivilCopropietarios === 2">
              <CopropietarioConyuge :index="index" :copropietario="copropietario" />
            </div>
          </div>
          <h3>Datos de Lotes</h3>
          <div class="form-grid input-full">
            <div>
              <label class="form-label">Número de Lotes Adquiridos</label>
              <input class="form-input" v-model.number="form.numLotes" type="number" min="0" @input="validateNumLote"/>
            </div>
          </div>
          <div v-for="(lote, index) in form.lotes" :key="index">
            <Lote :index="index" :lote="lote" :getUbicacionesFiltradas="getUbicacionesFiltradas" />
          </div>
          <button type="submit" class="btn-naranja">Siguiente</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import ClienteConyuge from "@/components/formularios/Cliente/ClienteConyuge.vue";
import Copropietario from "@/components/formularios/Copropietario/Copropietario.vue";
import CopropietarioConyuge from "@/components/formularios/Copropietario/CopropietarioConyuge.vue";
import Lote from "@/components/formularios/Lote/Lote.vue";
import {provincias} from "@/data/provincias.js";
import {distritos} from "@/data/distritos.js";
import {computed} from "vue";

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
