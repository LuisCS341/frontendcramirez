<template>
  <div class="dashboard-container">
    <!-- Botón hamburguesa para móvil -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
      ☰
    </button>
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-logo">
        <img src="@/assets/logo.svg" alt="Logo App" class="logo-img" />
      </div>
      <nav class="sidebar-nav">
        <ul class="nav-menu">
          <li>
            <router-link to="/dashboard" class="nav-link" active-class="active">
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
                <router-link to="/clientes/registrar" class="submenu-link" active-class="active">
                  <i class="icon-user-plus"></i>
                  Registrar Cliente
                </router-link>
              </li>
              <li>
                <router-link to="/clientes/mis-clientes" class="submenu-link" active-class="active">
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
                <router-link to="/contratos/seguimiento" class="submenu-link" active-class="active">
                  <i class="icon-eye"></i>
                  Seguimiento
                </router-link>
              </li>
              <li>
                <router-link to="/contratos/generar" class="submenu-link" active-class="active">
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
const openMenu = ref(null);
const sidebarOpen = ref(window.innerWidth > 900);

function toggleMenu(menu) {
  openMenu.value = openMenu.value === menu ? null : menu;
}

// Cierra sidebar al cambiar tamaño de pantalla
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) sidebarOpen.value = true;
  else sidebarOpen.value = false;
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  position: relative;
}
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 3001;
  background: #222;
  color: #fff;
  border: none;
  font-size: 2rem;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  cursor: pointer;
}
.sidebar {
  width: 220px;
  background: #222;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  transition: left 0.3s;
  z-index: 3000;
}
.sidebar-logo {
  text-align: center;
  margin-bottom: 24px;
}
.logo-img {
  width: 120px;
}
.sidebar-nav {
  flex: 1;
}
.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  border-left: 4px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}
.nav-link.active, .submenu-link.active {
  background: #ff9800;
  border-left: 4px solid #fff;
  color: #fff;
}
.nav-link:hover, .submenu-link:hover {
  background: #333;
}
.icon-home::before { content: "🏠"; margin-right: 12px; }
.icon-users::before { content: "👥"; margin-right: 12px; }
.icon-file::before { content: "📄"; margin-right: 12px; }
.icon-user-plus::before { content: "➕"; margin-right: 8px; }
.icon-list::before { content: "📋"; margin-right: 8px; }
.icon-eye::before { content: "👁️"; margin-right: 8px; }
.icon-plus::before { content: "➕"; margin-right: 8px; }
.submenu-arrow {
  margin-left: auto;
  transition: transform 0.2s;
}
.submenu-arrow.rotated {
  transform: rotate(90deg);
}
.submenu {
  background: #292929;
  padding-left: 0;
  margin: 0;
  list-style: none;
}
.submenu-link {
  display: flex;
  align-items: center;
  padding: 10px 36px;
  color: #fff;
  text-decoration: none;
  font-size: 0.97rem;
  border-left: 4px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}
.main-content {
  flex: 1;
  background: #f7f4f1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.topbar {
  background: #fff;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
}
.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
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
  margin-right: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-name {
  font-weight: 700;
  font-size: 1rem;
  color: #222;
}
.user-role {
  font-size: 0.9rem;
  color: #888;
}
.content-area {
  padding: 32px;
  flex: 1;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    left: -240px;
    top: 0;
    height: 100vh;
    width: 220px;
    box-shadow: 2px 0 12px rgba(0,0,0,0.08);
    transition: left 0.3s;
  }
  .sidebar.open {
    left: 0;
  }
  .sidebar-toggle {
    display: block;
  }
  .main-content {
    padding-left: 0;
  }
  .content-area {
    padding: 16px;
  }
}
</style>