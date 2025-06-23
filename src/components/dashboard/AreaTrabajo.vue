<template>
  <div class="dashboard-container">
    <!-- Botón hamburguesa para móvil -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
      ☰
    </button>
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-logo">
        <img src="@/assets/imagenes/LogoCoram.png" alt="Logo App" class="logo-img" />
      </div>
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
            <transition name="submenu-fade">
              <ul v-show="openMenu === 'clientes'" class="submenu">
                <li>
                  <router-link to="/clientes/registrar" class="submenu-link" exact-active-class="active">
                    <i class="icon-user-plus"></i>
                    Registrar Cliente
                  </router-link>
                </li>
                <li>
                  <router-link to="/clientes/mis-clientes" class="submenu-link" exact-active-class="active">
                    <i class="icon-list"></i>
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
                  <router-link to="/contratos/seguimiento" class="submenu-link" exact-active-class="active">
                    <i class="icon-eye"></i>
                    Seguimiento
                  </router-link>
                </li>
                <li>
                  <router-link to="/contratos/generar" class="submenu-link" exact-active-class="active">
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
      <header class="topbar">
        <h1 class="page-title">Dashboard Grupo CORAM</h1>
        <div class="user-menu">
          <img class="user-avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Usuario" />
          <div class="user-info">
            <span class="user-name">Rosangela Ramirez</span>
            <span class="user-role">Jefe</span>
          </div>
        </div>
      </header>
      <div class="content-area">
        <!-- Tarjetas resumen -->
        <transition-group name="fade-slide" tag="div" class="dashboard-summary-row">
          <ClientesRegistrados key="clientes" />
          <ContratosGenerados key="contratos" />
          <div class="summary-card" key="tiempo">
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
          <div class="summary-card" key="meta">
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
        </transition-group>
        <!-- Gráficos -->
        <div class="dashboard-charts-row">
          <transition name="fade-slide">
            <div class="chart-container-rendimiento-mes" key="grafico1">
              <GraficoRendimientoMes />
            </div>
          </transition>
          <transition name="fade-slide">
            <div class="chart-container-grafico-contratos" key="grafico2">
              <GraficoContratos />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
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

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow-x: hidden;
}

.sidebar-toggle {
  display: none;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 16px;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1000;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.logo-img {
  max-width: 100%;
  height: auto;
}

.sidebar-nav {
  padding: 0;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
  transition: background 0.3s ease;
}

.nav-link:hover {
  background-color: #34495e;
}

.icon {
  margin-right: 8px;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #34495e;
}

.submenu-link {
  display: block;
  padding: 10px 32px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background 0.3s ease;
}

.submenu-link:hover {
  background-color: #3b5998;
}

.topbar {
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 24px;
  margin: 0;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-name {
  font-weight: bold;
  color: #2c3e50;
}

.user-role {
  font-size: 12px;
  color: #7f8c8d;
}

.content-area {
  flex: 1;
  padding: 24px;
  background-color: #ecf0f1;
  overflow-y: auto;
}

.dashboard-summary-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.icon-text {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.icon {
  font-size: 24px;
  margin-right: 8px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.count {
  font-size: 24px;
  font-weight: bold;
  color: #2980b9;
}

.label {
  font-size: 14px;
  color: #7f8c8d;
}

.progress-bar {
  background-color: #bdc3c7;
  border-radius: 4px;
  overflow: hidden;
  height: 8px;
  width: 100%;
  margin-top: 8px;
}

.progress-bar-fill {
  background-color: #2ecc71;
  height: 100%;
  transition: width 0.3s ease;
}

.dashboard-charts-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-container-rendimiento-mes,
.chart-container-grafico-contratos {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
