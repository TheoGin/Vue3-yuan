/* import Home from "../views/Home.vue";
import About from "../views/About.vue";

export default [
  { path: "/", component: Home },
  { path: "/about", component: About },
];
 */

import { getAsyncPage } from "../utils";

// 异步加载页面

export default [
  {
    path: "/",
    name: "Home",
    component: getAsyncPage("../views/Home.vue"),
  },
  {
    path: "/About",
    name: "About",
    component: getAsyncPage("../views/About.vue"),
  },
];
