import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import {createPinia} from "pinia";

// 创建 pinia 实例
const pinia = createPinia();
createApp(App).use(router).use(pinia).mount('#app')
