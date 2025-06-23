<template>
  <div class="layout">
    <!-- Botón hamburguesa solo visible en móvil -->
    <button class="menu-hamburguesa" @click="toggleBarraLateral">
      &#9776;
    </button>
    <nav :class="['barra-lateral', { abierta: barraAbierta }]">
      <ul>
        <li>
          <router-link to="/dashboard">
            <img :src="icons['casa.png']" alt="Home" class="icono" />
            <span>Home</span>
          </router-link>
        </li>

        <!-- Clientes con submenú -->
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
            <li v-if="userRole === 1 || userRole === 3">
              <router-link to="/dashboard/clientes/mis-clientes">
                <img :src="icons['simbolo-de-hombre-y-flecha-derecha.png']" alt="Total Clientes" class="icono" />
                Total Clientes
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Contratos con submenú -->
        <li>
          <div class="menu-toggle" @click="toggleMenu('contratos')">
            <img :src="icons['contrato.png']" alt="Contratos" class="icono" />
            <span>Contratos</span>
          </div>
          <ul v-show="menuAbierto.contratos">
            <li>
              <router-link to="/dashboard/contratos/seguimientocontrato">
                <img :src="icons['noticias.png']" alt="Seguimiento Contrato" class="icono" />
                Seguimiento de Contrato
              </router-link>
            </li>
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

    <!-- Contenido principal -->
    <div class="contenido-principal" @click="cerrarBarraLateralEnMovil">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import "@/layouts/BarraLateralDashboard.css";
import { ref, computed } from 'vue';

// Estado para submenús
const menuAbierto = ref({
  clientes: false,
  contratos: false
});

// Estado para barra lateral (hamburguesa)
const barraAbierta = ref(false);

// Cargar iconos
const icons = ref({});
const images = import.meta.glob("@/assets/iconos/*.png", { eager: true });
icons.value = Object.fromEntries(
  Object.entries(images).map(([path, mod]) => {
    const fileName = path.split("/").pop();
    return [fileName, mod.default];
  })
);

// Rol de usuario
const userRole = computed(() => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return userData ? userData.rol : 3;
});

// Alternar submenús
function toggleMenu(menu) {
  menuAbierto.value[menu] = !menuAbierto.value[menu];
}

// Alternar barra lateral (hamburguesa)
function toggleBarraLateral() {
  barraAbierta.value = !barraAbierta.value;
}

// Cerrar barra lateral al hacer click fuera en móvil
function cerrarBarraLateralEnMovil() {
  if (window.innerWidth <= 900 && barraAbierta.value) {
    barraAbierta.value = false;
  }
}
</script>

<style scoped>
.contenido-principal {
  top: 60px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-left: -55px;
}
</style>