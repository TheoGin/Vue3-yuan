/* 
// vue2写法
import Router from 'vue-router';
new Router() */

import { createRouter, createWebHistory } from "vue-router";
import routes from './routes.js';

export default createRouter({
    // model: 'history', // vue2写法
    history: createWebHistory(),
    routes
})
