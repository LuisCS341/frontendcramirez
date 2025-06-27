<template>
  <!-- Vista para el usuario con rol 3 -->
  <div v-if="userRole === 3" class="graficos-container">
    <GraficoContratos />
    <GraficoRendimientoMes />
  </div>

  <!-- Vista para usuarios con rol 1 o 2 -->
  <div v-if="userRole <= 2" class="graficos-container-operador">
    <div class="graficos-fila">
      <ClientesRegistrados />
      <ContratosGenerados />
      <TiempoCliente />
      <MetaDia />
    </div>
    
    <div class="graficos-fila-grandes">
      <GraficoContratos />
      <GraficoRendimientoMes />
    </div>
  </div>
</template>


<script>
import  { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ContratosGenerados from "@/components/graficos/ContratosGenerados.vue";
import GraficoContratos from "@/components/graficos/GraficoContratos.vue";
import GraficoRendimientoMes from "@/components/graficos/GraficoRendimientoMes.vue";
import ClientesRegistrados from "@/components/graficos/ClientesRegistrados.vue";
import TiempoCliente from "@/components/graficos/TiempoCliente.vue";
import MetaDia from "@/components/graficos/MetaDia.vue";
import "@/components/dashboard/AreaTrabajo.css";
export default {
  components: {
    MetaDia,
    TiempoCliente,
    GraficoRendimientoMes,
    ContratosGenerados,
    GraficoContratos,
    ClientesRegistrados,
  },
  setup() {
    const userRole = ref(null);
    const router = useRouter();

    onMounted(() => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const storedUserRole = userData?.rol;
        if (storedUserRole) {
          userRole.value = parseInt(storedUserRole, 10); // 🔥 Asegurarse de que sea un número
          console.log("🎭 Rol detectado:", userRole.value);
        } else {
          console.warn("⚠️ No se detectó un rol, redirigiendo a la página de login.");
          router.push("/");
        }
      } catch (error) {
        console.error("❌ Error al intentar obtener el rol del usuario:", error);
        router.push("/login");
      }
    });

    return { userRole };
  },
};
</script>
