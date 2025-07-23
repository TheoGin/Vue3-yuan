import { defineAsyncComponent, h } from "vue";
import Loading from "../components/Loading.vue";
import ErrorComponent from "../components/Error.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  // 控制滚动条速度
  trickleSpeed: 50, // trikle（使）滴，淌；（小批地）慢慢移动；（球）缓慢滚动v.

  // 控制右上角loading是否显示
  showSpinner: false, // spinner 旋床工人；旋式诱饵n.
});

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 延迟
 * @param {*} duration
 */
export function delay(duration) {
  return new Promise((resolve) => {
    if (!duration) {
      duration = getRandom(1000, 5000);
    }
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function getAsyncComponent(path) {
  return defineAsyncComponent({
    // vue2 写法
    // component: () => import("./Block3.vue"),

    // loader: () => import("./Block3.vue"),
    // 模拟异步
    loader: async () => {
      await delay();

      if (Math.random() < 0.5) {
        throw new Error("load error");
      }
      return import(path);
    },
    loadingComponent: Loading, // 当promise在pending状态时，将显示这里的组件
    // errorComponent: ErrorComponent,
    // 插槽写法
    errorComponent: {
      //   render(h) { // vue2的h函数是在reder参数里
      render() {
        // vue3的h函数是在组合式API里，创建虚拟节点在外面也可以
        return h(ErrorComponent, "组件加载出错");
      },
    },
  });
}

export function getAsyncPage(path) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start();
      await delay();
      //   const result = import(path);
      const component_ = await import(path); // 需要等待promise
      NProgress.done();
      return component_;
    },
    loadingComponent: Loading,
  });
}
