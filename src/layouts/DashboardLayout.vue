<template>
  <div class="dashboard">
  <div class="dashboard-container">
    <BarraLateral />
    <div class="main-content">
      <BarraSuperior />
      <div class="area-trabajo">
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import BarraLateralDashboard from "@/layouts/BarraLateralDashboard.vue";
import BarraSuperiorDashboard from "@/layouts/BarraSuperiorDashboard.vue";
import AreaTrabajo from "@/components/dashboard/AreaTrabajo.vue";

export default {
  components: {
    BarraLateral: BarraLateralDashboard,
    BarraSuperior: BarraSuperiorDashboard,
    AreaTrabajo: AreaTrabajo;
  }
};

</script>

<style scoped>

.dashboard-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.area-trabajo {
  flex-grow: 1;
  padding: 20px;
  background: #f8f9fa;
  overflow-y: auto;
}

</style>
