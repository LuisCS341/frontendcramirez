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
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
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

  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 430px;
  width: 630px;
  margin-top: 130px;
  margin-left: 20px;
  text-align: center;
}

/* ========= RESPONSIVE MEDIA PANTALLA ========= */
@media (max-width: 768px) {

  .chart-container-rendimiento-mes {
    width: 500px;
    height: 500px;
    margin-top: 400px;
    margin-left: -630px;
  }
}

/* ========= RESPONSIVE CELULARES PEQUEÑOS ========= */
@media (max-width: 480px) {
  .chart-container-rendimiento-mes {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
