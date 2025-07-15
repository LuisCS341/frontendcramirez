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

export default {
  components: {
    BarraLateral: BarraLateralDashboard,
    BarraSuperior: BarraSuperiorDashboard
  }
};

</script>

<style scoped>
.dashboard {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0px 0px;

}
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
