<template>
  <div class="layout">
    <!-- Botón hamburguesa siempre visible -->
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

const menuAbierto = ref({
  clientes: false,
  contratos: false
});
const barraAbierta = ref(false);

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
  return userData ? userData.rol : 3;
});

function toggleMenu(menu) {
  menuAbierto.value[menu] = !menuAbierto.value[menu];
}
function toggleBarraLateral() {
  barraAbierta.value = !barraAbierta.value;
}
function cerrarBarraLateralEnMovil() {
  if (barraAbierta.value) {
    barraAbierta.value = false;
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.menu-hamburguesa {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 2100;
  background: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  font-size: 2rem;
  cursor: pointer;
  transition: background 0.2s;
}
.menu-hamburguesa:hover {
  background: #f0f0f0;
}
.barra-lateral {
  position: fixed;
  left: -220px;
  top: 0;
  width: 200px;
  height: 100vh;
  background: #222;
  color: #fff;
  z-index: 2000;
  transition: left 0.3s;
  overflow-y: auto;
  padding-top: 60px;
}
.barra-lateral.abierta {
  left: 0;
}
.contenido-principal {
  flex: 1;
  margin-left: 0;
  transition: margin-left 0.3s;
  width: 100vw;
  min-height: 100vh;
  background: #f7f7f7;
  overflow-y: auto;
  padding: 24px;
}
@media (min-width: 901px) {
  .barra-lateral.abierta ~ .contenido-principal {
    margin-left: 200px;
    width: calc(100vw - 200px);
  }
}
@media (max-width: 900px) {
  .barra-lateral {
    width: 180px;
    left: -220px;
  }
  .barra-lateral.abierta {
    left: 0;
  }
  .contenido-principal {
    margin-left: 0 !important;
    width: 100vw !important;
    padding: 16px 4vw;
  }
}
</style>