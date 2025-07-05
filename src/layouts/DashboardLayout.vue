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
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
  overflow: hidden;
}

/* Contenedor principal que se adapta */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
}

/* Área de trabajo con scroll en ejes verticales */
.area-trabajo {
  flex-grow: 1;
  padding: 1.25rem;
  background: #f8f9fa;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Media query para pantallas pequeñas como celulares */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
    height: auto;
  }

  .main-content {
    height: auto;
  }

  .area-trabajo {
    padding: 1rem;
  }
}
</style>
