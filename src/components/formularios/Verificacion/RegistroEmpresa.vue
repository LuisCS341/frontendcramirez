<template>
  <div>

    <div class="input-container"  >
    <input
          type="text"
          :value="carnetExtranjeria"
          placeholder="INGRESAR RUC (11 DÍGITOS)"
          maxlength="11"
          @input="$emit('update:carnetExtranjeria', $event.target.value); $emit('buscar-cliente')"
      />
    </div>


    <div v-if="estadoCliente === 'Empresa nueva'" class="alerta-nuevo">
      <p>⚠️ Empresa no encontrada en el sistema. Puedes continuar para registrar sus datos.</p>
      <button class="btn" @click="$emit('continuar')">Continuar</button>
    </div>

    <div v-if="estadoCliente === 'Empresa registrado - ya existe en el sistema'" class="alerta-registrado">
      <p>✅ La Empresa ya fue registrada en el sistema</p>
      <button class="btn" @click="$emit('continuar')">Continuar</button>
    </div>

    <div v-if="cliente && cliente.nombreCompleto" class="datos-cliente">
      <h2>🧾 Datos de la Empresa</h2>
      <ul>
        <li><strong>Nombres:</strong> {{ cliente.nombres }}</li>
        <li><strong>Apellido Paterno:</strong> {{ cliente.apellidoPaterno }}</li>
        <li><strong>Apellido Materno:</strong> {{ cliente.apellidoMaterno }}</li>
        <li><strong>Nombre Completo:</strong> {{ cliente.nombreCompleto }}</li>
        <li><strong>Tipo de Documento:</strong> {{ cliente.tipoDocumento }}</li>
        <li><strong>Número de Documento:</strong> {{ cliente.numeroDocumento }}</li>
        <li><strong>Dígito Verificador:</strong> {{ cliente.digitoVerificador }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nacionalidad: String,
  carnetExtranjeria: String,
  estadoCliente: String,
  cliente: Object,
  form: Object,
})

defineEmits([
  'update:dni',
  'update:carnetExtranjeria',
  'buscar-cliente',
  'cambiar-nacionalidad',
  'continuar'
])
</script>
