import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import {createPinia} from "pinia";
import { myPlugin1, myPlugin2, myPlugin3, myPluginResetSetupStore } from './plugins';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia();
pinia.use(myPlugin1);
pinia.use(myPlugin2);
pinia.use(myPlugin3);
pinia.use(myPluginResetSetupStore);
pinia.use(myPluginResetSetupStore);

// 使用第三方插件
pinia.use(piniaPluginPersistedstate)

createApp(App).use(router).use(pinia).mount('#app')
