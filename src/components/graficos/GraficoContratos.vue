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
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
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
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  height: 395px;
  width: 340px;
  margin-top: 230px;
  margin-left: 100px;
  text-align: center;
}


/* ========= RESPONSIVE MEDIA PANTALLA ========= */
@media (max-width: 768px) {
  .chart-container-grafico-contratos {
    width: 200px;
    height: 300px;
    margin-top: 80px;
    margin-left: 300px;
  }
}

</style>
