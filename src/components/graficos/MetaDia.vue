<template>
  <div class="container-meta-dia">
    <div class="info-card-meta-dia">
      <p class="title">Meta del Día</p>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progreso + '%' }"></div>
      </div>
      <div class="percentage">{{ progreso }}% <span class="text">completa</span></div>
      <div class="detalle">{{ clientesActuales }} de {{ metaClientes }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Valores de la meta y los clientes actuales
const metaClientes = ref(30);
const clientesActuales = ref(15);

// Progreso calculado automáticamente
const progreso = computed(() =>
    Math.round((clientesActuales.value / metaClientes.value) * 100)
);
</script>

<style scoped>
.container-meta-dia {
  max-width: 250px;

  font-family: sans-serif;
  margin-left: 850px;
  margin-top: -150px;
}

.info-card-meta-dia {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.progress-bar {
  background: #fdeacc;
  border-radius: 6px;
  height: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress {
  height: 100%;
  background-color: #ff9800;
  transition: width 0.3s ease;
}

.percentage {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.text {
  font-size: 14px;
  color: #555;
  font-weight: 600;
}

.detalle {
  font-size: 14px;
  color: #333;
  margin-top: 4px;
}
</style>
