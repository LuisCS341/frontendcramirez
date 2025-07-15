<template>
  <div>

    <div class="input-container"  >
      <input
          type="text"
          :value="rucEmpresa"
          placeholder="INGRESAR RUC (11 DÍGITOS)"
          maxlength="11"
          @input="$emit('update:rucEmpresa', $event.target.value); $emit('buscar-empresa')"
      />
    </div>


    <div v-if="estadoEmpresa === 'Empresa nueva'" class="alerta-nuevo">
      <p>⚠️ Empresa no encontrada en el sistema. Puedes continuar para registrar sus datos.</p>
      <button class="btn" @click="$emit('continuar')">Continuar</button>
    </div>

    <div v-if="estadoEmpresa === 'Empresa registrada - ya existe en el sistema'">

      <p>✅ La Empresa ya fue registrada en el sistema</p>
      <button class="btn" @click="$emit('continuar')">Continuar</button>
    </div>

  </div>
</template>

<script setup>
defineProps({
  rucEmpresa: String,
  estadoEmpresa: String,
  cliente: Object,
  form: Object,
})

defineEmits([
  'update:dni',
  'update:rucEmpresa',
  'buscar-empresa',
  'continuar'
])
</script>
