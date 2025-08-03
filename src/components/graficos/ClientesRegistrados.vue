<template>
  <div class="summary-card-clientes-registrados">
    <div class="icon-text">
      <span class="icon">👥</span>
      <div class="text">
        <p class="title">Clientes<br />hoy  {{ fechaActual }}</p>
      </div>
    </div>
    <div class="count">
      <span class="number">{{ clientesHoy }}</span>
      <span class="label">Registrados</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const fechaActual = ref('');
const clientesHoy = ref(0)

onMounted(async () => {
  try {
    const response = await axios.get('https://backendcramirez.onrender.com/api/clientes/registrados/count')
    clientesHoy.value = response.data
  } catch (error) {
    console.error('Error al obtener los clientes registrados hoy:', error)
  }
})

onMounted(() => {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  fechaActual.value = `${dia}/${mes}/${anio}`;
});
</script>

<style scoped>
.summary-card-clientes-registrados {
  width: 150px;
  height: 115px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: sans-serif;
  margin-top: 200px;
  margin-left: 100px;
}

.icon-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 24px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
}

.count {
  margin-top: 12px;
  text-align: left;
}

.number {
  font-size: 32px;
  font-weight: 800;
  color: #111;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-top: -4px;
}

@media (max-width: 768px) {
  .summary-card-clientes-registrados {
    width: 150px;
    padding: 16px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: sans-serif;
    margin-top: 20px;
    margin-left: 80px;
    gap:20px
  }

  .icon-text {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    font-size: 24px;
  }

  .title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
  }

  .count {
    margin-top: 12px;
    text-align: left;
  }

  .number {
    font-size: 32px;
    font-weight: 800;
    color: #111;
  }

  .label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-top: -4px;
  }
}
</style>
