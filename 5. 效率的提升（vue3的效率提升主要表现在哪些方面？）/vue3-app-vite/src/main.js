import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// 在vite构建项目里不支持 commonJS
// require('./index.css') // Uncaught ReferenceError: require is not defined

createApp(App).mount('#app')
