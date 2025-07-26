<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  renderTracked(e) {
    console.log(e);
    /* renderTracked：渲染vdom收集到的每一次依赖时（调试模版中用到响应式数据的收集依赖）
      {effect: ReactiveEffect, target: {…}, type: 'get', key: 'msg'}
      {effect: ReactiveEffect, target: {…}, type: 'get', key: 'count'}
    */
  },
  renderTriggered(e) {
    console.log(e);
    /* renderTriggered：某个依赖变化导致组件重新渲染时（调试模版中用到响应式数据的派发更新）
      {effect: ReactiveEffect, target: {…}, type: 'set', key: 'count', newValue: 1, …}

      // 由于模版中依赖到的数据发生变化，所以会重新运行render函数
      {effect: ReactiveEffect, target: {…}, type: 'get', key: 'msg'}
      {effect: ReactiveEffect, target: {…}, type: 'get', key: 'count'}
    */
  }
};
</script>
