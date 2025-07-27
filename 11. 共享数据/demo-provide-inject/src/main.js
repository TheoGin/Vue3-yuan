import { createApp } from "vue";
import provideStore from "./store";
import App from './App.vue';
import router from './router';


const app = createApp(App).use(router);
provideStore(app);
app.mount("#app");

// Provide&Inject不能脱离组件使用： Uncaught TypeError: Cannot read properties of undefined (reading 'whoAmI')
/* import { useStore } from "./store/useLoginUser";
useStore().whoAmI(); */