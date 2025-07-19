<template>
  <h1>count: {{ countRef }}</h1>
  <button @click="increase">increase</button>
  <button @click="decrease">decrease</button>
</template>

<script>
import { ref } from 'vue';

function useCount() {
  // 通过ref创建响应式数据
  let countRef = ref(0);
  console.log(countRef); // RefImpl {dep: Dep, __v_isRef: true, __v_isShallow: false, _rawValue: 0, _value: 0}，是一个对象
  console.log(this); // undefined

  function increase() {
    countRef.value++
  }

  function decrease() {
    countRef.value--
  }

  return {
    countRef,
    increase,
    decrease
  }
}

export default {
  name: 'CompositionAPI',
  // setup()函数只会在组件初始化时执行一次
  setup() {
    console.log('所有生命周期钩子函数之前调用')

    // 提取为useCount()

    

    // 可以实现高内聚
    //1. 新增

    //2. 修改

    //3. 删除

    return {
      // countRef,
      // increase,
      // decrease,
      ...useCount()
    }
  }
}
</script>
