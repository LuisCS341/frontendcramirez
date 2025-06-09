<template>
  <div class="chart-container-rendimiento-mes">
    <h2>📊 Rendimiento del mes de {{ currentMonth }}</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar módulos necesarios
Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

// Obtener el mes actual en español
const monthNames = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];
const now = new Date();
const currentMonth = ref(monthNames[now.getMonth()]);

const chartCanvas = ref(null);
let chartInstance = null;

const data = {
  labels: ['pastoh', 'nruiz', 'jrodriguez', 'msilva', 'vanespezua', 'mgutierrez', 'jobando', 'analis', 'yarmeli'],
  datasets: [
    {
      label: 'Clientes Registrados',
      data: [10, 30, 25, 20, 15, 25, 45, 20, 50, 10],
      backgroundColor: '#FF9800'
    },
    {
      label: 'Clientes No Registrados',
      data: [20, 50, 15, 10, 18, 22, 30, 15, 10, 20],
      backgroundColor: '#FDD9A0'
    }
  ]
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'CLIENTES REGISTRADOS',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    x: {
      title: {
        display: true,
        text: 'DÍAS',
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          weight: 'bold'
        }
      }
    }
  }
};

// Inicializar el gráfico cuando el componente esté montado
onMounted(async () => {
  await nextTick();

  const ctx = chartCanvas.value?.getContext('2d');
  if (!ctx) {
    console.error('❌ No se pudo obtener el contexto del canvas');
    return;
  }

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data,
    options
  });
});
</script>

<style scoped>
.chart-container-rendimiento-mes {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 400px;
  margin-top: -90px;
  margin-left: 5px;
  width: 660px;
  text-align: center;
}
</style>
