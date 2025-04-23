import { createRouter, createWebHistory } from "vue-router";

// Lazy loading de vistas
const Login = () => import("@/components/views/Login.component.vue");
const Error403 = () => import("@/components/views/Error403.vue");
const LoginOlvidarContra = () => import("@/components/views/LoginOlvidarContra.vue");
const Dashboard = () => import("@/components/views/Dashboard.vue");

// Componentes del dashboard
const AreaTrabajo = () => import("@/components/dashboard/AreaTrabajo.vue");

// 📝 Formularios (basado en la estructura de carpetas)
const FormularioVeri = () => import("@/components/formularios/FormularioVeri.vue");
const Formulariocliente=() => import("@/components/formularios/Formulariocliente.component.vue");

// 📋 Tablas
const TablaClientes = () => import("@/components/tablas/TablaClientes.vue");
const TablaMisClientes = () => import("@/components/tablas/TablaTotalclientes.vue");

// 📜 Contratos
const GeneracionContrato = () => import("@/components/contratos/GeneracionContrato.vue");
const SeguimientoContrato = () => import("@/components/contratos/SeguimientoContrato.vue");

const routes = [
    { path: "/", component: Login },
    { path: "/login-olvidar-contra", component: LoginOlvidarContra },
    { path: "/403", component: Error403 },

    {
        path: "/dashboard",
        component: Dashboard,
        children: [
            { path: "", component: AreaTrabajo },

            // 📝 Sección de formularios con los componentes existentes
            {
                path: "formularios",
                children: [
                    { path: "registro-cliente", component: FormularioVeri },
                    { path: "detalle-cliente", component: Formulariocliente }, // Basado en tu estructura
                ],
            },

            { path: "clientes/mis-clientes", component: TablaMisClientes },
            { path: "clientes", component: TablaClientes },


            { path: "contratos/generacioncontrato", component: GeneracionContrato },
            { path: "contratos/seguimientocontrato", component: SeguimientoContrato },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
