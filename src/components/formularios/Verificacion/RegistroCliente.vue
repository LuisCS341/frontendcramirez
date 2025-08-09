<template>
  <div>
    <div class="pregunta-container">
      <label>¿Es peruano o extranjero?</label>
      <div class="nacionalidad-toggle">
        <button
            :class="{ active: nacionalidad === 'peruano' }"
            @click="$emit('cambiar-nacionalidad', 'peruano')"
        >🇵🇪 Peruano</button>
        <button
            :class="{ active: nacionalidad === 'extranjero' }"
            @click="$emit('cambiar-nacionalidad', 'extranjero')"
        >🌍 Extranjero</button>
      </div>
    </div>

    <div class="input-container" v-if="nacionalidad === 'peruano'">
      <input
          type="text"
          :value="dni"
          placeholder="Ingresar DNI (8 dígitos)"
          maxlength="8"
          inputmode="numeric"
          pattern="[0-9]*"
          @input="onInputDni"
      />
    </div>

    <div class="input-container" v-if="nacionalidad === 'extranjero'">
      <input
          type="text"
          :value="carnetExtranjeria"
          placeholder="Ingresar Carnet de Extranjería (11 dígitos)"
          maxlength="11"
          inputmode="numeric"
          pattern="[0-9]*"
          @input="onInputCE"
      />
    </div>

    <div v-if="estadoCliente === 'Cliente nuevo'" class="alerta-nuevo">
      <p>⚠️ Cliente no encontrado en el sistema. Puedes continuar para registrar sus datos.</p>
      <button class="btn" @click="$emit('continuar')">Continuar</button>
    </div>

    <div v-if="estadoCliente === 'Cliente registrado - ya existe en el sistema'" class="alerta-registrado">
      <p>✅ Cliente ya fue registrado en el sistema</p>
      <button class="btn" @click="$emit('continuar')">Continuar</button>
    </div>

    <div v-if="cliente && cliente.nombreCompleto" class="datos-cliente">
      <h2>🧾 Datos del Cliente</h2>
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
const props = defineProps({
  nacionalidad: String,
  dni: String,
  carnetExtranjeria: String,
  estadoCliente: String,
  cliente: Object,
  form: Object,
});

const emit = defineEmits([
  'update:dni',
  'update:carnetExtranjeria',
  'buscar-cliente',
  'cambiar-nacionalidad',
  'continuar'
]);

const onlyDigits = (val, maxLen) =>
    String(val ?? '').replace(/\D/g, '').slice(0, maxLen);

const onInputDni = (e) => {
  const clean = onlyDigits(e.target.value, 8);
  if (e.target.value !== clean) e.target.value = clean;
  emit('update:dni', clean);
  emit('buscar-cliente');
};

const onInputCE = (e) => {
  const clean = onlyDigits(e.target.value, 11);
  if (e.target.value !== clean) e.target.value = clean;
  emit('update:carnetExtranjeria', clean);
  emit('buscar-cliente');
};
</script>
