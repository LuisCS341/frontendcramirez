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
                  Mis Clientes
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
            <span class="user-name">Usuario 1</span>
            <span class="user-role">Colaborador</span>
          </div>
        </div>
      </header>
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import './areastyle.css';

const openMenu = ref(null);
const sidebarOpen = ref(window.innerWidth > 900);

function toggleMenu(menu) {
  openMenu.value = openMenu.value === menu ? null : menu;
}

// Cierra sidebar al cambiar tamaño de pantalla
window.addEventListener('resize', () => {
  sidebarOpen.value = window.innerWidth > 900;
});
</script>

