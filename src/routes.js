import { createRouter, createWebHistory } from 'vue-router';

// ✅ Importación directa de vistas
import Login from '@/components/views/Login.component.vue';
import Error403 from '@/components/views/Error403.vue';
import LoginOlvidarContra from '@/components/views/LoginOlvidarContra.vue';
import Dashboard from '@/components/views/Dashboard.vue';

// ✅ Componentes del dashboard
import AreaTrabajo from '@/components/dashboard/AreaTrabajo.vue';

// 📝 Formularios
import FormularioVeri from '@/components/formularios/FormularioVeri.vue';
import Formulariocliente from '@/components/formularios/Formulariocliente.component.vue';

// 📋 Tablas
import TablaClientes from '@/components/tablas/TablaClientes.vue';
import TablaMisClientes from '@/components/tablas/TablaTotalclientes.vue';

// 📜 Contratos (descomentar si lo necesitas)
import GeneracionContrato from '@/components/contratos/generacionContrato.vue';
import SeguimientoContrato from '@/components/contratos/SeguimientoContrato.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/login-olvidar-contra', component: LoginOlvidarContra },
    { path: '/403', component: Error403 },

    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '', component: AreaTrabajo },

            // 📝 Formularios
            {
                path: 'formularios',
                children: [
                    { path: 'registro-cliente', component: FormularioVeri },
                    { path: 'detalle-cliente', component: Formulariocliente },
                ],
            },

            // 📋 Tablas
            { path: 'clientes/mis-clientes', component: TablaMisClientes },
            { path: 'tablaclientes', component: TablaClientes },

            // 📜 Contratos
            { path: 'contratos/generacion', component: GeneracionContrato },
            { path: 'contratos/seguimiento', component: SeguimientoContrato },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
