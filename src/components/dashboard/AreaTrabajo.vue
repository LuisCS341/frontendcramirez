<template>
  <div class="dashboard-container">
    <!-- 📌 Contenido para Operador (Rol 3) -->
    <div v-if="userRole === 3" class="operator-view">
      <div class="graficos-fila-grandes-administrador">
        <GraficoRendimientoMes />
        <GraficoContratos />
      </div>
    </div>

    <!-- 📌 Contenido para Supervisor (Rol 2) y Jefe (Rol 1) -->
    <div v-if="userRole <= 2" class="supervisor-view">
      <div class="graficos-fila">
        <ClientesRegistrados />
        <ContratosGenerados />
        <TiempoCliente />
        <MetaDia />
      </div>

      <div class="graficos-fila-grandes">
        <GraficoRendimientoMes />
        <GraficoContratos />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ContratosGenerados from "@/components/graficos/ContratosGenerados.vue";
import GraficoContratos from "@/components/graficos/GraficoContratos.vue";
import GraficoRendimientoMes from "@/components/graficos/GraficoRendimientoMes.vue";
import ClientesRegistrados from "@/components/graficos/ClientesRegistrados.vue";
import TiempoCliente from "@/components/graficos/TiempoCliente.vue";
import MetaDia from "@/components/graficos/MetaDia.vue";

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
          userRole.value = parseInt(storedUserRole, 10);
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

<style scoped>
.dashboard-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #dcdcdc;
}

/* Estilos para la vista de Operador */
.operator-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 40px);
}

.graficos-fila-grandes-administrador {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Estilos para la vista de Supervisor/Jefe */
.supervisor-view {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.graficos-fila {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  width: 100%;
}

.graficos-fila-grandes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

/* Media Queries para ajustes responsivos */
@media (max-width: 1400px) {
  .graficos-fila-grandes-administrador,
  .graficos-fila-grandes {
    grid-template-columns: 1fr;
  }
  
  .graficos-fila-grandes-administrador {
    margin-top: 50px;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 10px;
  }
  
  .graficos-fila {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .graficos-fila {
    grid-template-columns: 1fr;
  }
  
  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 5px;
  }
}
</style>