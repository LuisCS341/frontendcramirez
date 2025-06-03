<template>
  <div class="chart-container-grafico-contratos">
    <h2>📄 Contratos - Mayo</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar componentes de Chart.js
Chart.register(PieController, ArcElement, Tooltip, Legend);

// Referencia al canvas
const chartCanvas = ref(null);
let chartInstance = null;

// Datos del gráfico (mayo)
const data = {
  labels: ['FIRMADO', 'NO FIRMADO', 'LEGAL'],
  datasets: [{
    label: 'Contratos Mayo',
    data: [300, 100, 50],
    backgroundColor: ['#FF9800', '#A66A2E', '#FDD9A0'],
    borderWidth: 1
  }]
};

// Opciones
const options = {
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#000',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed}`
      }
    }
  }
};

// Crear el gráfico cuando se monte el componente
onMounted(() => {
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(chartCanvas.value, {
    type: 'pie',
    data,
    options
  });
});
</script>

<style scoped>
.chart-container-grafico-contratos {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 340px;
  margin-top: -15px;
  margin-left: 100px ;
  text-align: center;
}
</style>
