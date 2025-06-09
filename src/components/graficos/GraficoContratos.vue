<template>
  <div class="chart-container-grafico-contratos">
    <h2>📄 Contratos - {{ currentMonth }}</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar componentes de Chart.js
Chart.register(PieController, ArcElement, Tooltip, Legend);

// Obtener el mes actual en español
const monthNames = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];
const now = new Date();
const currentMonth = ref(monthNames[now.getMonth()]);

// Referencia al canvas
const chartCanvas = ref(null);
let chartInstance = null;

// Datos del gráfico (puedes actualizar dinámicamente si lo necesitas)
const data = {
  labels: ['FIRMADO', 'NO FIRMADO', 'LEGAL'],
  datasets: [{
    label: `Contratos ${currentMonth.value}`,
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
  margin-top: -90px;
  margin-left: 90px;
  text-align: center;
}
</style>
