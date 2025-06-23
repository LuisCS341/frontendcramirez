import { createRouter, createWebHistory } from "vue-router";

// Vistas principales
import Login from "@/views/Login.vue";
import Error403 from "@/views/Error403.vue";
import LoginOlvidarContra from "@/views/LoginOlvidarContra.vue";
import Dashboard from "@/views/Dashboard.vue";

// Dashboard
import AreaTrabajo from "@/components/dashboard/AreaTrabajo.vue";

// Formularios
import Verificacion from "@/components/formularios/Verificacion/Verificacion.vue";
import PrincipalComponent from "@/components/formularios/Principal/Principal.component.vue";

// Tablas
import TablaClientes from "@/components/tablas/TablaClientes.vue";
import TablaMisClientes from "@/components/tablas/TablaTotalclientes.vue";

// Contratos
import GeneracionContrato from "@/components/contratos/GeneracionContrato.vue";
import SeguimientoContrato from "@/components/contratos/SeguimientoContrato.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: "/", 
      name: "Login",
      component: Login,
      meta: { requiresAuth: false }
    },
    { 
      path: "/login-olvidar-contra", 
      name: "OlvidarContra",
      component: LoginOlvidarContra,
      meta: { requiresAuth: false }
    },
    { 
      path: "/403", 
      name: "Error403",
      component: Error403,
      meta: { requiresAuth: false }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        { 
          path: "", 
          name: "AreaTrabajo",
          component: AreaTrabajo,
          meta: { requiresAuth: true }
        },
        {
          path: "formularios/registro-cliente",
          name: "RegistroCliente",
          component: Verificacion,
          meta: { requiresAuth: true, allowedRoles: [1, 2, 3] }
        },
        {
          path: "formularios/detalle-cliente",
          name: "DetalleCliente",
          component: PrincipalComponent,
          meta: { requiresAuth: true, allowedRoles: [1, 2, 3] }
        },
        { 
          path: "clientes", 
          name: "Clientes",
          component: TablaClientes,
          meta: { requiresAuth: true, allowedRoles: [2, 3] } // Solo colaboradores y admin
        },
        { 
          path: "clientes/mis-clientes", 
          name: "MisClientes",
          component: TablaMisClientes,
          meta: { requiresAuth: true, allowedRoles: [1, 3] } // Solo jefes y admin
        },
        { 
          path: "contratos/generacioncontrato", 
          name: "GenerarContrato",
          component: GeneracionContrato,
          meta: { requiresAuth: true, allowedRoles: [1, 2, 3] }
        },
        { 
          path: "contratos/seguimientocontrato", 
          name: "SeguimientoContrato",
          component: SeguimientoContrato,
          meta: { requiresAuth: true, allowedRoles: [1, 2, 3] }
        }
      ]
    },
    // Redirección para rutas no encontradas
    { 
      path: "/:pathMatch(.*)*", 
      redirect: "/" 
    }
  ]
});

// Guard de navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = parseInt(localStorage.getItem('userRole') || 2);
  
  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } 
  // Si el usuario no tiene el rol requerido
  else if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
    next('/403');
  } 
  // Todo está bien, continuar
  else {
    next();
  }
});

export default router;