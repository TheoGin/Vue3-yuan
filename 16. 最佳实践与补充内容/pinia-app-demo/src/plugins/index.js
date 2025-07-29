export function myPlugin1({ options }) {
  // 插件选项主要就是介绍在插件中如何获取传递给插件的数据
  // 官网介绍：https://pinia.vuejs.org/zh/core-concepts/plugins.html#adding-new-options
  console.log('可以拿到自己配置的插件选项options：', options); // 可以拿到自己配置的插件选项options： {actions: {…}, getters: {…}, persist: true, state: ƒ}
  
  // 给所有的仓库添加了一条全局属性
  return { secret: "the cake is a lie" };
}

export function myPlugin2(context) {
  console.log(context);
  /* 会打印两次，因为有两个store
    {store: Proxy(Object), app: {…}, pinia: {…}, options: {…}}
    {store: Proxy(Object), app: {…}, pinia: {…}, options: {…}}

    具体内容：
    app: {_uid: 0, _component: {…}, _props: null, _container: div#app, _context: {…}, …}
    options: {actions: {…}}
    pinia: {_p: Array(3), _a: {…}, _e: EffectScope, install: ƒ, use: ƒ, …}
    store: Proxy(Object) {$id: 'todoList', $onAction: ƒ, $patch: ƒ, $reset: ƒ, $subscribe: ƒ, …}
    */

  const { store } = context;
  store.test = "this is a test";
}

/**
 * 给特定的仓库来扩展内容
 * @param {*} param0
 */
export function myPlugin3({ store }) {
  if (store.$id === "counter") {
    // 为当前 id 为 counter 的仓库来扩展属性
    return {
      name: "this is a special data of counter",
    };
  }
}

function deepClone(obj) {
  // 如果传入的参数不是对象，则直接返回该参数
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 如果传入的参数不是对象，则直接返回该参数
  const newObj = Array.isArray(obj) ? [] : {};

  // 递归遍历原始对象并复制属性和值到新对象中
  for (const k in obj) {
    newObj[k] = deepClone(obj[k]);
  }

  // 返回新对象
  return newObj;
}


/**
 * 重置仓库状态
 */
export function myPluginResetSetupStore({ store }) {
  // 我们首先可以将初始状态深拷贝一份
  const state = deepClone(store.$state);

  store.reset = () => {

    // state本身就是对象，不需要在套对象
    // store.$patch({state});

    // 有问题，会导致第二次重置被污染
    // store.$patch(state);
    
    store.$patch(deepClone(state));
  };
}
