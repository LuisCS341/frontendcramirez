<template>
  <div class="dashboard-container">
    <BarraLateral />
    <div class="main-content">
      <BarraSuperior />
      <div class="area-trabajo" :style="{ backgroundImage: `url(${fondoDashboard})` }">
      </div>
    </div>
  </div>

</template>

<script>
import BarraLateralDashboard from "@/layouts/BarraLateralDashboard.vue";
import BarraSuperiorDashboard from "@/layouts/BarraSuperiorDashboard.vue";
import FondoDashboard from "@/assets/imagenes/FondoDashboard.webp";

export default {
  components: {
    BarraLateral: BarraLateralDashboard,
    BarraSuperior: BarraSuperiorDashboard
  },
  data() {
    return {
      fondoDashboard: FondoDashboard
    };
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
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow-y: auto;
}

</style>
