<template>
  <div>
    <nav class="barra-lateral">
      <ul>
        <li>
          <router-link to="/dashboard">
            <img :src="icons['casa.png']" alt="Home" class="icono" />
            <span>Home</span>
          </router-link>
        </li>

        <li>
          <div class="menu-toggle" @click="toggleMenu('clientes')">
            <img :src="icons['grupo-de-usuario.png']" alt="Clientes" class="icono" />
            <span>Clientes</span>
          </div>
          <ul v-show="menuAbierto.clientes">
            <li>
              <router-link to="/dashboard/formularios/registro-cliente">
                <img :src="icons['nueva-cuenta.png']" alt="Registrar Cliente" class="icono" />
                Registrar Cliente
              </router-link>
            </li>

            <li v-if="userRole === 2 || userRole === 3">
              <router-link to="/dashboard/Clientes">
                <img :src="icons['simbolo-de-hombre-y-flecha-derecha.png']" alt="Mis Clientes" class="icono" />
                Mis Clientes
              </router-link>
            </li>

            <li v-if="userRole === 1 || userRole === 3  ">
              <router-link to="/dashboard/clientes/mis-clientes">
                <img :src="icons['simbolo-de-hombre-y-flecha-derecha.png']" alt="Total Clientes" class="icono" />
                Total Clientes
              </router-link>
            </li>
          </ul>
        </li>

        <li>
          <div class="menu-toggle" @click="toggleMenu('contratos')">
            <img :src="icons['contrato.png']" alt="Contratos" class="icono" />
            <span>Contratos</span>
          </div>
          <ul v-show="menuAbierto.contratos">
            <li>
              <router-link to="/dashboard/contratos/generacioncontrato">
                <img :src="icons['acceso.png']" alt="Generar Contrato" class="icono" />
                Generación de Contratos
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div class="contenido-principal">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "@/layouts/BarraLateralDashboard.css";
import { ref, computed } from 'vue';

export default {
  setup() {
    const menuAbierto = ref({
      clientes: false,
      contratos: false
    });

    // Cargar los iconos
    const icons = ref({});
    const images = import.meta.glob("@/assets/iconos/*.png", { eager: true });
    icons.value = Object.fromEntries(
        Object.entries(images).map(([path, mod]) => {
          const fileName = path.split("/").pop();
          return [fileName, mod.default];
        })
    );

    const userRole = computed(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData ? userData.rol : 3;  // Si no existe, asigna un rol por defecto (3)
    });

    // Función para alternar menú
    const toggleMenu = (menu) => {
      menuAbierto.value[menu] = !menuAbierto.value[menu];
    };

    return {
      menuAbierto,
      icons,
      userRole,
      toggleMenu
    };
  }
};
</script>

<style scoped>
.contenido-principal {
  margin-left: 150px;
  padding: 20px;
  min-height: 100vh;
  background: #dcdcdc;
}

</style>
