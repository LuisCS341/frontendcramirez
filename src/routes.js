import { createRouter, createWebHistory } from "vue-router";

import Login from "@/components/views/Login.component.vue";
import Error403 from "@/components/views/Error403.vue";
import LoginOlvidarContra from "@/components/views/LoginOlvidarContra.vue";
import Dashboard from "@/components/views/Dashboard.vue";

// Dashboard
import AreaTrabajo from "@/components/dashboard/AreaTrabajo.vue";

// Formularios
import FormularioVeri from "@/components/formularios/FormularioVeri.vue";
import Formulariocliente from "@/components/formularios/Formulariocliente.component.vue";

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
                    path: "formularios/registro-cliente",
                    component: FormularioVeri,
                },
                {
                    path: "formularios/detalle-cliente",
                    component: Formulariocliente,
                },
                { path: "clientes", component: TablaClientes },
                { path: "clientes/mis-clientes", component: TablaMisClientes },
                { path: "contratos/generacioncontrato", component: GeneracionContrato },
                { path: "contratos/seguimientocontrato", component: SeguimientoContrato },
            ],
        },
    ],
});
