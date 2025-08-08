<template>
  <div>
    <div class="input-container">
      <input
          type="text"
          :value="rucEmpresa"
          placeholder="INGRESAR RUC (11 DÍGITOS)"
          maxlength="11"
          inputmode="numeric"
          pattern="[0-9]*"
          @input="onInputRuc"
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

    <div v-if="cliente && cliente.razonSocial" class="datos-empresa">
      <h3>📄 Datos de la Empresa</h3>
      <ul>
        <li><strong>Razón Social:</strong> {{ cliente.razonSocial }}</li>
        <li><strong>N° Documento:</strong> {{ cliente.numeroDocumento }}</li>
        <li><strong>Estado:</strong> {{ cliente.estado }}</li>
        <li><strong>Condición:</strong> {{ cliente.condicion }}</li>
        <li><strong>Dirección:</strong> {{ cliente.direccion }}</li>
        <li><strong>Distrito:</strong> {{ cliente.distrito }}</li>
        <li><strong>Provincia:</strong> {{ cliente.provincia }}</li>
        <li><strong>Departamento:</strong> {{ cliente.departamento }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  rucEmpresa: String,
  estadoEmpresa: String,
  cliente: Object,
  form: Object,
  datosEmpresa: Object
});

const emit = defineEmits([
  'update:dni',
  'update:rucEmpresa',
  'buscar-empresa',
  'continuar'
]);

const onInputRuc = (e) => {
  const clean = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (e.target.value !== clean) e.target.value = clean;
  emit('update:rucEmpresa', clean);
  emit('buscar-empresa');
};
</script>
