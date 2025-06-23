<template>
  <div class="dashboard-container">
    <!-- Botón hamburguesa para móvil -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
      ☰
    </button>
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-logo">
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
                  <router-link to="formularios/registro-cliente" class="submenu-link" exact-active-class="active">
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
         <img src="@/assets/imagenes/LogoCoram.png" alt="Logo App" class="logo-img" />
        <div class="user-menu">
          <img class="user-avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Usuario" />
          <div class="user-info">
            <span class="user-name">USUARIO 1</span>
            <span class="user-role">Colaborador</span>
          </div>
        </div>
      </header>
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

