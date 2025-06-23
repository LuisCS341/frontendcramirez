<template>
  <div>
    <!-- Header de lado a lado -->
    <header class="topbar">
      <div class="header-content">
        <img src="@/assets/imagenes/LogoCoram.png" alt="Logo App" class="logo-img" />
        <div class="user-menu">
          <img class="user-avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Usuario" />
          <div class="user-info">
            <span class="user-name">USUARIO 1</span>
            <span class="user-role">{{ roleName }}</span>
          </div>
        </div>
      </div>
    </header>
    <div class="dashboard-container">
      <!-- Botón hamburguesa para móvil -->
      <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
        ☰
      </button>
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ open: sidebarOpen }">
        <div class="sidebar-logo"></div>
        <nav class="sidebar-nav">
          <ul class="nav-menu">
            <li>
              <div class="menu-toggle" @click="toggleMenu('clientes')">
                <img :src="require('@/assets/icons/grupo-de-usuario.png')" alt="Clientes" class="icono" />
                <span>Clientes</span>
              </div>
              <ul v-show="menuAbierto.clientes">
                <li>
                  <router-link :to="{ name: 'RegistroCliente' }" active-class="active-link">
                    <img :src="require('@/assets/icons/nueva-cuenta.png')" alt="Registrar Cliente" class="icono" />
                    Registrar Cliente
                  </router-link>
                </li>
                <li v-if="userRole === 2 || userRole === 3">
                  <router-link :to="{ name: 'Clientes' }" active-class="active-link">
                    <img :src="require('@/assets/icons/simbolo-de-hombre-y-flecha-derecha.png')" alt="Mis Clientes" class="icono" />
                    Mis Clientes
                  </router-link>
                </li>
                <li v-if="userRole === 1 || userRole === 3">
                  <router-link :to="{ name: 'MisClientes' }" active-class="active-link">
                    <img :src="require('@/assets/icons/simbolo-de-hombre-y-flecha-derecha.png')" alt="Total Clientes" class="icono" />
                    Total Clientes
                  </router-link>
                </li>
              </ul>
            </li>
            <li>
              <div class="nav-link" @click="toggleMenu('contratos')">
                <i class="icon-file"></i>
                <span>Contratos</span>
                <span class="submenu-arrow" :class="{ rotated: openMenu === 'contratos' }">▶</span>
              </div>
              <transition name="submenu-fade">
                <ul v-show="openMenu === 'contratos'" class="submenu">
                  <li>
                    <router-link :to="{ name: 'SeguimientoContrato' }" class="submenu-link" active-class="active">
                      <i class="icon-eye"></i>
                      Seguimiento
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'GenerarContrato' }" class="submenu-link" active-class="active">
                      <i class="icon-plus"></i>
                      Generar Contrato
                    </router-link>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </nav>
      </aside>
      <!-- Main Content -->
      <div class="main-content">
        <div class="dashboard-wrapper">
          <!-- Fila de tarjetas resumen -->
          <div class="dashboard-summary-row">
            <ClientesRegistrados />
            <ContratosGenerados />
            <div class="summary-card">
              <div class="icon-text">
                <span class="icon">⏱️</span>
                <div class="text">
                  <p class="title">Tiempo por<br />Cliente</p>
                </div>
              </div>
              <div class="count">
                <span class="number">10</span>
                <span class="label">minutos</span>
              </div>
            </div>
            <div class="summary-card">
              <div class="icon-text">
                <span class="icon">📈</span>
                <div class="text">
                  <p class="title">Meta del Día</p>
                </div>
              </div>
              <div class="count">
                <div class="progress-bar">
                  <div class="progress-bar-fill" :style="{ width: '50%' }"></div>
                </div>
                <span class="label"><b>50%</b> completa<br />15 de 30</span>
              </div>
            </div>
          </div>
          <!-- Fila de gráficos -->
          <div class="dashboard-charts-row">
            <div class="chart-container-rendimiento-mes">
              <GraficoRendimientoMes />
            </div>
            <div class="chart-container-grafico-contratos">
              <GraficoContratos />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ClientesRegistrados from "@/components/graficos/ClientesRegistrados.vue";
import ContratosGenerados from "@/components/graficos/ContratosGenerados.vue";
import GraficoRendimientoMes from "@/components/graficos/GraficoRendimientoMes.vue";
import GraficoContratos from "@/components/graficos/GraficoContratos.vue";

export default {
  components: {
    ClientesRegistrados,
    ContratosGenerados,
    GraficoRendimientoMes,
    GraficoContratos
  },
  setup() {
    let router;
    router = useRouter();
    const store = useStore();
    
    // Estados del sidebar
    const sidebarOpen = ref(window.innerWidth > 900);
    const openMenu = ref(null);
    const menuAbierto = ref({
      clientes: false,
      contratos: false
    });
    
    // Obtener el rol del usuario
    const userRole = computed(() => store.state.user?.role || localStorage.getItem('userRole') || 2);
    
    // Mapear roles a nombres
    const roleName = computed(() => {
      const roles = {
        1: 'Jefe',
        2: 'Colaborador',
        3: 'Administrador'
      };
      return roles[userRole.value] || 'Colaborador';
    });
    
    // Funciones
    const toggleMenu = (menu) => {
      if (menu === 'clientes' || menu === 'contratos') {
        menuAbierto.value[menu] = !menuAbierto.value[menu];
      }
      openMenu.value = openMenu.value === menu ? null : menu;
    };
    
    const handleResize = () => {
      sidebarOpen.value = window.innerWidth > 900;
    };
    
    // Event listeners
    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });
    
    return {
      sidebarOpen,
      openMenu,
      menuAbierto,
      userRole,
      roleName,
      toggleMenu,
      handleResize
    };
  }
};
</script>

<style scoped>
/* Estilos del dashboard */
.topbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.user-role {
  font-size: 0.8rem;
  color: #666;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
  padding-top: 60px;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: transform 0.3s ease;
  position: fixed;
  height: calc(100vh - 60px);
}

.sidebar-nav {
  padding: 1rem 0;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  position: relative;
}

.menu-toggle, .nav-link {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
}

.menu-toggle:hover, .nav-link:hover {
  background-color: #34495e;
}

.icono {
  width: 20px;
  height: 20px;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #34495e;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.submenu li a {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.2s;
}

.submenu li a:hover {
  background-color: #3d566e;
}

.submenu-arrow {
  margin-left: auto;
  transition: transform 0.2s;
}

.rotated {
  transform: rotate(90deg);
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 1rem;
  background-color: #f5f7fa;
}

.dashboard-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-summary-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
}

.icon-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 1.5rem;
}

.title {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.count {
  text-align: right;
}

.number {
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
}

.label {
  font-size: 0.8rem;
  color: #666;
}

.dashboard-charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.chart-container-rendimiento-mes,
.chart-container-grafico-contratos {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Estilos para mobile */
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 70px;
  left: 10px;
  z-index: 101;
  background: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

/* Clases activas para router links */
.active-link {
  background-color: #3d566e;
  font-weight: bold;
}

.active {
  background-color: #3d566e;
}

/* Transiciones */
.submenu-fade-enter-active,
.submenu-fade-leave-active {
  transition: opacity 0.2s, max-height 0.3s;
}

.submenu-fade-enter-from,
.submenu-fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.submenu-fade-enter-to,
.submenu-fade-leave-from {
  opacity: 1;
  max-height: 500px;
}

@media (max-width: 900px) {
  .sidebar {
    transform: translateX(-100%);
    z-index: 100;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .sidebar-toggle {
    display: block;
  }
  
  .dashboard-charts-row {
    grid-template-columns: 1fr;
  }
}
</style>