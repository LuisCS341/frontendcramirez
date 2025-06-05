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
/* Contenedor general para rol 3 */
.graficos-container,
.graficos-container-operador {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 1400px;
  margin: 50px auto 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #dcdcdc;
  gap: 20px;
}

/* Sección para operador (rol 3) con barra lateral (evita usar margin-left fijo) */
.graficos-container-operador {
  overflow-x: hidden;
  z-index: 10;
  position: relative;
}

/* Tarjetas pequeñas (4 por fila en pantallas grandes) */
.graficos-fila {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  padding: 10px;
}

/* Gráficos grandes (2 por fila en pantallas grandes) */
.graficos-fila-grandes,
.graficos-fila-grandes-administrador {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
  margin-top: 50px;
}

/* Tarjeta individual */
.grafico-item {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 370px;
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsividad para tablets */
@media (max-width: 768px) {
  .graficos-container,
  .graficos-container-operador {
    padding: 10px;
  }

  .graficos-fila,
  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    grid-template-columns: 1fr; /* una sola columna en móviles/tablets */
    margin-top: 30px;
  }

  .grafico-item {
    height: auto;
    max-width: 100%;
  }
}

/* Responsividad para móviles pequeños */
@media (max-width: 480px) {
  .graficos-container,
  .graficos-container-operador {
    padding: 5px;
  }

  .grafico-item {
    padding: 5px;
  }
}
</style>

