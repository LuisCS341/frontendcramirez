<template>
  <!-- Contenedor principal del dashboard -->
  <div class="dashboard-container">

    <!-- Barra lateral de navegación (se oculta en móviles) -->
    <aside class="sidebar">
      <!-- Logo de la aplicación -->
      <div class="sidebar-logo">
        <!--<img src="@/assets/logo.svg" alt="Logo App" class="logo-img"> -->
      </div>

      <!-- Menú de navegación -->
      <nav class="sidebar-nav">
        <ul class="nav-menu">

          <!-- Ítem de menú simple -->
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link" active-class="active">
              <i class="icon-home"></i>
              <span class="nav-text">Inicio</span>
            </router-link>
          </li>

          <!-- Ítem de menú con submenú (Clientes) -->
          <li class="nav-item has-submenu" :class="{open: isSubmenuOpen('clientes')}">
            <div class="submenu-header" @click="toggleSubmenu('clientes')">
              <i class="icon-users"></i>
              <span class="nav-text">Clientes</span>
              <i class="submenu-arrow" :class="{rotated: isSubmenuOpen('clientes')}"></i>
            </div>
            <ul class="submenu" v-show="isSubmenuOpen('clientes')">
              <li class="submenu-item" v-if="hasPermission('create_client')">
                <router-link to="/clientes/registrar" class="submenu-link">
                  <i class="icon-user-plus"></i>
                  <span>Registrar Cliente</span>
                </router-link>
              </li>
              <li class="submenu-item" v-if="hasPermission('view_own_clients')">
                <router-link to="/clientes/mis-clientes" class="submenu-link">
                  <i class="icon-list"></i>
                  <span>Mis Clientes</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Ítem de menú con submenú (Contratos) -->
          <li class="nav-item has-submenu" :class="{open: isSubmenuOpen('contratos')}">
            <div class="submenu-header" @click="toggleSubmenu('contratos')">
              <i class="icon-file"></i>
              <span class="nav-text">Contratos</span>
              <i class="submenu-arrow" :class="{rotated: isSubmenuOpen('contratos')}"></i>
            </div>
            <ul class="submenu" v-show="isSubmenuOpen('contratos')">
              <li class="submenu-item">
                <router-link to="/contratos/seguimiento" class="submenu-link">
                  <i class="icon-eye"></i>
                  <span>Seguimiento</span>
                </router-link>
              </li>
              <li class="submenu-item">
                <router-link to="/contratos/generar" class="submenu-link">
                  <i class="icon-plus"></i>
                  <span>Generar Contrato</span>
                </router-link>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
    </aside>

    <!-- Área principal de contenido -->
    <div class="main-content">

      <!-- Barra superior con controles -->
      <header class="topbar">
        <!-- Botón para mostrar/ocultar menú en móviles -->
        <button class="menu-toggle" @click="toggleSidebar">
          <i class="icon-menu"></i>
        </button>

        <!-- Espacio para título de página -->
        <h1 class="page-title">{{ currentPageTitle }}</h1>

        <!-- Menú de usuario -->
        <div class="user-menu" @click.stop="toggleUserMenu">
          <div class="user-avatar">
            <img :src="user.avatar" :alt="user.name">
          </div>
          <div class="user-info">
            <span class="user-name">{{ user.name }}</span>
            <span class="user-role">{{ user.role }}</span>
          </div>
          <transition name="fade">
            <div class="user-dropdown" v-show="isUserMenuOpen" @click.stop>
              <button @click="logout" class="dropdown-item">
                <i class="icon-log-out"></i> Cerrar sesión
              </button>
            </div>
          </transition>
        </div>
      </header>

      <!-- Contenido dinámico de la página -->
      <div class="content-area">
        <router-view></router-view>

        <!-- Widgets del dashboard (según permisos) -->
        <div class="dashboard-widgets" v-if="$route.path === '/dashboard'">

          <!-- Widgets para administradores -->
          <template v-if="user.role === 'admin'">
            <div class="widget-row">
              <performance-chart />
              <contracts-chart />
            </div>
          </template>

          <!-- Widgets para operadores -->
          <template v-else>
            <div class="widget-row">
              <clients-widget />
              <contracts-widget />
              <time-widget />
              <goals-widget />
            </div>
            <div class="widget-row">
              <performance-chart />
              <contracts-chart />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./areastyle.css"></style>
<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import ContratosGenerados from "@/components/graficos/ContratosGenerados.vue";
import GraficoContratos from "@/components/graficos/GraficoContratos.vue";
import GraficoRendimientoMes from "@/components/graficos/GraficoRendimientoMes.vue";
import ClientesRegistrados from "@/components/graficos/ClientesRegistrados.vue";
import TiempoCliente from "@/components/graficos/TiempoCliente.vue";
import MetaDia from "@/components/graficos/MetaDia.vue";
import "@/layouts/BarraSuperiorDashboard.css";
import "@/layouts/BarraLateralDashboard.css";

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
    const router = useRouter();
    const mostrarCerrarSesion = ref(false);
    const menuAbierto = ref({
      clientes: false,
      contratos: false
    });

    // Estado del usuario
    const usuario = ref({
      nombre: "Usuario",
      rol: "Desconocido",
      rolId: null
    });

    // Mapeo de roles
    const rolesMap = {
      1: "Jefe",
      2: "Operador",
      3: "Supervisor"
    };

    // Cargar iconos dinámicamente
    const icons = ref({});
    const images = import.meta.glob("@/assets/iconos/*.png", { eager: true });
    icons.value = Object.fromEntries(
        Object.entries(images).map(([path, mod]) => {
          const fileName = path.split("/").pop();
          return [fileName, mod.default];
        })
    );

    // Cargar datos del usuario
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          usuario.value = {
            nombre: userData.nombre || "Usuario",
            rol: rolesMap[userData.rol] || "Desconocido",
            rolId: parseInt(userData.rol, 10)
          };
          console.log("Rol detectado:", usuario.value.rolId);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error al cargar datos de usuario:", error);
        return false;
      }
    };

    // Métodos
    const toggleUserMenu = () => {
      mostrarCerrarSesion.value = !mostrarCerrarSesion.value;
    };

    const toggleSubmenu = (menu) => {
      menuAbierto.value[menu] = !menuAbierto.value[menu];
    };

    const cerrarSesion = () => {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      router.push("/login");
    };

    const cerrarSiClickFuera = (event) => {
      if (!event.target.closest(".usuario")) {
        mostrarCerrarSesion.value = false;
      }
    };

    // Inicialización
    onMounted(() => {
      if (!loadUserData()) {
        console.warn("No se detectó usuario, redirigiendo a login");
        router.push("/login");
      }
      document.addEventListener("click", cerrarSiClickFuera);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", cerrarSiClickFuera);
    });

    // Computados
    const isAdmin = computed(() => usuario.value.rolId === 1);
    const isSupervisor = computed(() => usuario.value.rolId === 3);
    const isOperador = computed(() => usuario.value.rolId === 2);

    return {
      usuario,
      mostrarCerrarSesion,
      menuAbierto,
      icons,
      rolesMap,
      toggleUserMenu,
      toggleSubmenu,
      cerrarSesion,
      isAdmin,
      isSupervisor,
      isOperador
    };
  }
};
</script>