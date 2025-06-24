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

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Login },
        { path: "/login-olvidar-contra", component: LoginOlvidarContra },
        { path: "/403", component: Error403 },
        {
            path: "/dashboard",
            component: Dashboard,
            children: [
                { path: "", component: AreaTrabajo },
                {
                    path: "clientes/registrar",
                    component: Verificacion,
                },
                {
                    path: "formularios/detalle-cliente",
                    component: PrincipalComponent,
                },
                { path: "clientes", component: TablaClientes },
                { path: "clientes/mis-clientes", component: TablaMisClientes },
                { path: "contratos/generacioncontrato", component: GeneracionContrato },
                { path: "contratos/seguimientocontrato", component: SeguimientoContrato },
            ],
        },
    ],
});
