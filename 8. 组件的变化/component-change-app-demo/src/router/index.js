/* 
// vue2写法
import Router from 'vue-router';
new Router() */

import { createRouter, createWebHashHistory } from "vue-router";
import routes from './routes.js';

export default createRouter({
    // model: 'history', // vue2写法
    history: createWebHashHistory(),
    routes
})
