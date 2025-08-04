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

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];
const now = new Date();
const currentMonth = ref(monthNames[now.getMonth()]);

const chartCanvas = ref(null);
let chartInstance = null;

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Clientes Registrados',
      data: [],
      backgroundColor: '#FF9800'
    }
  ]
});

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
        text: 'OPERARIOS',
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

onMounted(async () => {
  try {
    const response = await fetch('https://backendcramirez.onrender.com/api/clientes/registrados-mes-tipo-operario');
    const resultado = await response.json();

    chartData.value.labels = resultado.map(item => item.tipoOperario);
    chartData.value.datasets[0].data = resultado.map(item => item.cantidad);

    await nextTick();

    const ctx = chartCanvas.value?.getContext('2d');
    if (!ctx) {
      console.error('❌ No se pudo obtener el contexto del canvas');
      return;
    }

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData.value,
      options
    });
  } catch (error) {
    console.error('❌ Error al obtener datos del backend:', error);
  }
});
</script>

<style scoped>
.chart-container-rendimiento-mes {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 415px;
  width: 630px;
  margin-top: -435px;
  margin-left: 500px;
  text-align: center;
}

@media (max-width: 768px) {
  .chart-container-rendimiento-mes {
    width: 500px;
    height: 320px;
    margin-top: 420px;
    margin-left: -380px;
    align-items: center;
  }
}
</style>
