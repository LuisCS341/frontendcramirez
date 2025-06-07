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
import { ref } from 'vue';

const tiempoCliente = ref(10);
</script>

<style scoped>
.container-tiempo-cliente {
  max-width: 350px;
  margin: 0 auto;
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
</style>
