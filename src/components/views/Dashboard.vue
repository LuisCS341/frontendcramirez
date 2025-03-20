<template>
  <div class="dashboard-container">
    <BarraLateral />
    <div class="main-content">
      <BarraSuperior />
      <div class="area-trabajo">
      </div>
    </div>
  </div>
</template>

<script>
import BarraLateralDashboard from "@/components/Dashboard/BarraLateralDashboard.vue";
import BarraSuperiorDashboard from "@/components/Dashboard/BarraSuperiorDashboard.vue";

export default {
  components: {
    BarraLateral: BarraLateralDashboard,
    BarraSuperior: BarraSuperiorDashboard
  }
};

</script>

<style scoped>
.dashboard-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.area-trabajo {
  width: 100%;
  min-height: 500px; /* O ajusta según el contenido */
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
</style>
