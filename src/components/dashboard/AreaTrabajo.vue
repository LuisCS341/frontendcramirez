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
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px 32px 24px;
  background: #f4f4f4;
  min-height: 100vh;
  box-sizing: border-box;
  animation: fadeIn 0.7s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}

.graficos-fila,
.graficos-fila-grandes,
.graficos-fila-grandes-administrador {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  animation: fadeInUp 0.7s;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
}

.graficos-fila > *,
.graficos-fila-grandes > *,
.graficos-fila-grandes-administrador > * {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 20px 18px;
  margin: 0;
  min-width: 220px;
  max-width: 340px;
  width: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s, transform 0.3s;
  animation: fadeInUp 0.7s;
}
.graficos-fila > *:hover,
.graficos-fila-grandes > *:hover,
.graficos-fila-grandes-administrador > *:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.16);
  transform: translateY(-6px) scale(1.03);
}

/* RESPONSIVE TABLET */
@media (max-width: 1100px) {
  .graficos-container,
  .graficos-container-operador {
    max-width: 98vw;
    padding: 16px 2vw 16px 2vw;
  }
  .graficos-fila,
  .graficos-fila-grandes,
  .graficos-fila-grandes-administrador {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
  .graficos-fila > *,
  .graficos-fila-grandes > *,
  .graficos-fila-grandes-administrador > * {
    max-width: 95vw;
    min-width: 0;
    font-size: 15px;
    padding: 14px 6px;
  }
}

/* RESPONSIVE MÓVIL */
@media (max-width: 700px) {
  .graficos-container,
  .graficos-container-operador {
    max-width: 100vw;
    padding: 8px 0 8px 0;
    gap: 10px;
  }
  .graficos-fila > *,
  .graficos-fila-grandes > *,
  .graficos-fila-grandes-administrador > * {
    max-width: 99vw;
    min-width: 0;
    font-size: 14px;
    padding: 8px 2px;
    min-height: 90px;
  }
}
</style>