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
            <span class="user-role">{{ roleName }}</span>}
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
              <transition name="submenu-fade">
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
              </transition>
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
    const router = useRouter();
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