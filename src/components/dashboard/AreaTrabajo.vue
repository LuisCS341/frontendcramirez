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
            <span class="user-role">Colaborador</span>
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
              <router-link to="/dashboard" class="nav-link" exact-active-class="active">
                <i class="icon-home"></i>
                <span>Home</span>
              </router-link>
            </li>
            <li>
              <div class="nav-link" @click="toggleMenu('clientes')">
                <i class="icon-users"></i>
                <span>Clientes</span>
                <span class="submenu-arrow" :class="{ rotated: openMenu === 'clientes' }">▶</span>
              </div>
              <ul v-show="openMenu === 'clientes'" class="submenu">
                <li>
                  <router-link to="/dashboard/clientes/registrar" class="submenu-link" exact-active-class="active">
                    <i class="icon-user-plus"></i>
                    Registrar Clientes
                  </router-link>
                </li>
                <li>
                  <router-link to="/dashboard/clientes/mis-clientes" class="submenu-link" exact-active-class="active">
                    <i class="icon-list"></i>
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
              <ul v-show="openMenu === 'contratos'" class="submenu">
                <li>
                  <router-link to="/dashboard/contratos/seguimientocontrato" class="submenu-link" exact-active-class="active">
                    <i class="icon-eye"></i>
                    Seguimiento
                  </router-link>
                </li>
                <li>
                  <router-link to="/dashboard/contratos/generacioncontrato" class="submenu-link" exact-active-class="active">
                    <i class="icon-plus"></i>
                    Generar Contrato
                  </router-link>
                </li>
              </ul>
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

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import ClientesRegistrados from "@/components/graficos/ClientesRegistrados.vue";
import ContratosGenerados from "@/components/graficos/ContratosGenerados.vue";
import GraficoRendimientoMes from "@/components/graficos/GraficoRendimientoMes.vue";
import GraficoContratos from "@/components/graficos/GraficoContratos.vue";
import "@/components/dashboard/areastyle.css";

const openMenu = ref(null);
const sidebarOpen = ref(window.innerWidth > 900);

function toggleMenu(menu) {
  openMenu.value = openMenu.value === menu ? null : menu;
}

function handleResize() {
  sidebarOpen.value = window.innerWidth > 900;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
/* Asegúrate de tener esto en tu CSS global o areastyle.css */
.sidebar-toggle {
  display: none;
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 2001;
  background: #ff9800;
  color: #fff;
  border: none;
  font-size: 2rem;
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
}
@media (max-width: 900px) {
  .sidebar-toggle {
    display: block;
  }
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 2000;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>

