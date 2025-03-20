<template>
  <div class="chart-container">
    <h2>👤 Contratos Firmados por Operador</h2>
    <select v-model="selectedOperator">
      <option v-for="op in operators" :key="op" :value="op">{{ op }}</option>
    </select>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

export default {
  data() {
    return {
      selectedOperator: "Javier", // Valor inicial
      operators: ["Javier", "Maria", "Carlos", "Ana", "Luis", "Pedro"],
      contractData: {
        Javier: [50, 30, 10],
        Maria: [40, 20, 15],
        Carlos: [30, 25, 20],
        Ana: [35, 40, 10],
        Luis: [20, 10, 5],
        Pedro: [45, 35, 25]
      }
    };
  },
  mounted() {
    this.createChart();
  },
  watch: {
    selectedOperator() {
      this.createChart();
    }
  },
  methods: {
    createChart() {
      if (this.chart) this.chart.destroy();
      Chart.register(BarController, BarElement, CategoryScale, LinearScale);
      this.chart = new Chart(this.$refs.chart, {
        type: "bar",
        data: {
          labels: ["Firmados", "No Firmados", "Legales"],
          datasets: [{
            label: `Contratos de ${this.selectedOperator}`,
            data: this.contractData[this.selectedOperator],
            backgroundColor: ["#36a2eb", "#ff6384", "#ffce56"]
          }]
        }
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  text-align: center;
}

select {
  margin-bottom: 15px;
  padding: 5px;
}
</style>
