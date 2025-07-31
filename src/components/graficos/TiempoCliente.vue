<template>
  <div class="container-tiempo-cliente">
    <div class="info-card summary-card">
      <div class="icon-text">
        <span class="icon">⏱️</span>
        <p class="title">Tiempo por<br />Cliente</p>
      </div>
      <div class="count">
        <span class="number">{{ tiempoCliente }}</span>
        <span class="label">minutos</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";

const tiempoCliente = ref(0);
/*
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/clientes/tiempo-promedio-cliente')
    tiempoCliente.value = response.data
  } catch (error) {
    console.error('Error al obtener tiempo promedio por cliente:', error)
  }
})
 */
</script>


<style scoped>
.container-tiempo-cliente {
  max-width: 350px;
  margin-left: 590px;
  height: 150px;
  margin-top: -140px;
}

.info-card.summary-card {
  width: 160px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: sans-serif;
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
  .container-tiempo-cliente {
    width: 390px;
    height: 30px;
    margin-top: 20px;
    margin-left: 10px;
  }

  .info-card.summary-card {
    width: 160px;
    padding: 16px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: sans-serif;
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
