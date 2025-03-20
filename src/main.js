import { createApp } from 'vue';
import App from './App.vue';
import router from "@/routes.js";

const app = createApp(App);

if (import.meta.env.MODE === 'production') {
    app.config.globalProperties.$devtools = false;
}

app.use(router);
app.mount('#app');
