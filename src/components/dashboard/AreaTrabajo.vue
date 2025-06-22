<template>
  <div v-if="userRole === 3" class="graficos-container">
    <!-- 📌 Solo visible para Operador (Rol 3) -->
    <div v-if="userRole === 3" class="graficos-fila-grandes-administrador">
      <GraficoRendimientoMes />
      <GraficoContratos />
    </div>Add commentMore actions
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
import  { ref, onMounted } from "vue";
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 12px 32px 12px;
  background: #f4f4f4;
  min-height: 100vh;
  box-sizing: border-box;
  transition: background 0.3s;
}

/* Fila de 4 columnas en PC, 2 en tablet, 1 en móvil */
.graficos-fila {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  padding: 10px 0;
}
.graficos-fila-grandes,
.graficos-fila-grandes-administrador {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  padding: 10px 0;
  margin-top: 40px;
}

/* Tarjetas internas: aplica a los hijos directos de las filas */
.graficos-fila > * ,
.graficos-fila-grandes > *,
.graficos-fila-grandes-administrador > * {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 16px 10px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s, transform 0.3s;
}
.graficos-fila > *:hover,
.graficos-fila-grandes > *:hover,
.graficos-fila-grandes-administrador > *:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.13);
  transform: translateY(-4px) scale(1.02);
}

/* RESPONSIVE TABLET */
@media (max-width: 1100px) {
  .graficos-container,
  .graficos-container-operador {
    max-width: 98vw;
    padding: 8px 2vw 16px 2vw;
  }
  .graficos-fila {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 24px;
  }
}

/* RESPONSIVE MÓVIL */
@media (max-width: 700px) {
  .graficos-container,
  .graficos-container-operador {
    max-width: 100vw;
    padding: 4px 0 10px 0;
    gap: 10px;
  }
  .graficos-fila {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 14px;
  }
  .graficos-fila > *,
  .graficos-fila-grandes > *,
  .graficos-fila-grandes-administrador > * {
    padding: 8px 2px;
    min-height: 90px;
    font-size: 14px;
  }
}
</style>