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
import BarraLateralDashboard from "@/layouts/BarraLateralDashboard.vue";
import BarraSuperiorDashboard from "@/layouts/BarraSuperiorDashboard.vue";

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
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  overflow-y: auto;
  min-height: calc(100vh - 60px);
}

</style>
