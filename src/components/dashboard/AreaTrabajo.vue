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
.graficos-container,
.graficos-container-operador {
  display: grid;
  width: 100%;
  max-width: 1400px;
  margin: 50px auto 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #dcdcdc;
}

.graficos-container-operador {
  margin-left: 250px;
  gap: 10px;
  position: relative;
  z-index: 10;
  overflow-y: auto;
}

/* Fila de 4 gráficos pequeños */
.graficos-fila {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
}

/* Fila de 2 gráficos grandes */
.graficos-fila-grandes,
.graficos-fila-grandes-administrador {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
  margin-top: 75px;
}

.graficos-fila-grandes-administrador {
  margin-top: 150px;
}

/* Estilo común de cada tarjeta/gráfico */
.grafico-item {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 370px;
  width: 100%;
  max-width: 500px;
  justify-content: center;
  align-items: center;
}

/* 🧠 Responsive: tablets y móviles */
@media (max-width: 1024px) {
  .graficos-fila {
    grid-template-columns: repeat(2, 1fr);
  }
  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .graficos-container,
  .graficos-container-operador {
    width: 95vw;
    padding: 10px;
    margin-left: 0 !important; /* elimina margen lateral en móviles */
  }

  .graficos-fila {
    grid-template-columns: 1fr;
  }

  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    grid-template-columns: 1fr;
    margin-top: 30px;
  }
}

</style>
