import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/views/Login.component.vue";
import Error403 from "@/components/views/Error403.vue";
import LoginOlvidarContra from "@/components/views/LoginOlvidarContra.vue";
import AreaTrabajo from "@/components/Dashboard/AreaTrabajo.vue";
import FormularioVeri from "@/components/Formularios/FormularioVeri.vue";
import TablaClientes from "@/components/Tablas/TablaClientes.vue";
import TablaMisClientes from "@/components/Tablas/TablaMisclientes.vue";
import GeneracionContrato from "@/components/Contratos/generacionContrato.vue";
import SeguimientoContrato from "@/components/Contratos/SeguimientoContrato.vue";
import FormularioclienteComponent from "@/components/Formulariocliente.component.vue";
import GeneradorDeContratosComponent from "@/components/GeneradorDeContratos.component.vue";
import Dashboard from "@/components/views/Dashboard.vue";

const routes = [
    { path: "/", component: Login },
    { path: "/login-olvidar-contra", component: LoginOlvidarContra },
    {
        path: "/dashboard", component: Dashboard,
        children: [
            {
                path: "",
                component: AreaTrabajo,
            },
            {
                path: "registrar-cliente",
                component: FormularioVeri,
            },
            {
                path:"MisClientes",
                component: TablaMisClientes,
            },
            {
                path:"Clientes",
                component: TablaClientes,
            },
            {
                path:"Generacion-Contrato",
                component: GeneracionContrato,
            },
            {
                path:"Seguimiento-Contrato",
                component: SeguimientoContrato,
            },
        ],
    },

    { path: "/403", component: Error403 },
    { path: "/formulario-clientes", component: FormularioclienteComponent },
    { path: "/generador-de-contratos", component: GeneradorDeContratosComponent },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
