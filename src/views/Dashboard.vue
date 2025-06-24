<template>
  <DashboardLayout>
    <AreaTrabajo />
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import AreaTrabajo from "@/components/dashboard/AreaTrabajo.vue";

export default {
  components: {
    DashboardLayout,
    AreaTrabajo
  }
};
</script>
