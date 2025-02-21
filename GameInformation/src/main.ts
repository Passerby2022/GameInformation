import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from '@/router/index.ts';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Aside from '@/components/home/Aside.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.component('Aside', Aside);
app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.mount('#app');
