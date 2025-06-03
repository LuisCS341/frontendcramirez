<template>
  <div class="chart-container-rendimiento-mes">
    <h2>📊 Rendimiento del mes de mayo</h2>
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

const chartCanvas = ref(null);
let chartInstance = null;

const data = {
  labels: ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27'],
  datasets: [
    {
      label: 'Grupo A',
      data: [10, 30, 25, 20, 15, 25, 45, 20, 50, 10],
      backgroundColor: '#FF9800'
    },
    {
      label: 'Grupo B',
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

// Esperar al DOM antes de inicializar el gráfico
onMounted(async () => {
  await nextTick(); // ✅ Espera a que el canvas esté disponible

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
  margin-top: -18px;
  width: 660px;
  text-align: center;
}
</style>
