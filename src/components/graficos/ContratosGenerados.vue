<template>
  <div class="summary-card grafico-item">
    <div class="icon-text">
      <span class="icon">📝</span>
      <div class="text">
        <p class="title">Contratos<br />Generados</p>
      </div>
    </div>
    <div class="count">
      <span class="number">{{ contratosGenerados }}</span>
      <span class="label">Contratos</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Puedes reemplazar este valor con uno que venga de una API o prop
const contratosGenerados = ref(3);
</script>

<style scoped>
.summary-card {
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
