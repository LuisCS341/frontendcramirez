<template>
  <div v-if="userRole === 3" class="graficos-container">
    <!-- 📌 Solo visible para Operador (Rol 3) -->
    <div v-if="userRole === 3" class="graficos-fila-grandes-administrador">
      <GraficoRendimientoMes />
      <GraficoContratos />
    </div>
  </div>

  <div v-if="userRole <= 2"  class="graficos-container-operador">
    <!-- 📌 Visible solo para Supervisor (Rol 2) y Jefe (Rol 1) -->
    <div v-if="userRole <= 2" class="graficos-fila">
      <ClientesRegistrados />
      <ContratosGenerados />
      <TiempoCliente />
      <MetaDia />
    </div>

    <div v-if="userRole <= 2" class="graficos-fila-grandes">
      <GraficoRendimientoMes />
      <GraficoContratos />
    </div>

  </div>


</template>

<script>
import  { ref, onMounted ,computed} from "vue";
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
    const userRole = ref(null); // 📌 Valor por defecto (Operador)
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

<style scoped>
  /* Contenedor para Operador (Rol 3) */
.graficos-container {
  display: grid;
  width: 100%;
  max-width: 1400px;
  margin: 50px auto 0 auto;
  background-color: #dcdcdc;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
}

/* Contenedor para Supervisor y Jefe (Rol 2 y 1) */
.graficos-container-operador {
  display: grid;
  width: 100%;
  max-width: 1400px;
  margin: 50px auto 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #dcdcdc;
  gap: 20px;
  position: relative;
  z-index: 10;
  overflow-y: auto;
}

/* Fila de tarjetas pequeñas (4 columnas en desktop) */
.graficos-fila {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 10px;
}

/* Fila de gráficos grandes (2 columnas en desktop) */
.graficos-fila-grandes,
.graficos-fila-grandes-administrador {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 10px;
  margin-top: 75px;
}

/* Ajuste para el margen superior del administrador */
.graficos-fila-grandes-administrador {
  margin-top: 150px;
}

/* Estilo para cada tarjeta */
.grafico-item {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 370px;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

/* RESPONSIVE para tablets */
@media (max-width: 1024px) {
  .graficos-fila {
    grid-template-columns: repeat(2, 1fr);
  }

  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    grid-template-columns: 1fr;
  }
}

/* RESPONSIVE para móviles */
@media (max-width: 600px) {
  .graficos-container,
  .graficos-container-operador {
    padding: 10px;
  }

  .graficos-fila {
    grid-template-columns: 1fr;
  }

  .grafico-item {
    max-width: 100%;
    height: auto;
    flex-direction: column;
  }
}
</style>

