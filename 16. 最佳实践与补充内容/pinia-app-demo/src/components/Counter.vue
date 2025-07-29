<template>
  <div class="container">
    <p class="group-title">普通增加</p>
    <div class="btn-group">
      <button class="btn" @click="decrement">-</button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ num }}</div>
      <button class="btn" @click="increment">+</button>
    </div>

    <p class="group-title">Getters数据</p>
    <div class="btn-group">
      <button class="btn" @click="decrement">-</button>
      <div class="num">{{ doubleNum }}</div>
      <button class="btn" @click="increment">+</button>
    </div>

    <p class="group-title">异步增加</p>
    <div class="btn-group">
      <button class="btn" @click="asyncDecrement">-</button>
      <div class="num">{{ num }}</div>
      <button class="btn" @click="asyncIncrement">+</button>
    </div>

    <p class="group-title">store.$reset方法</p>
    <div class="btn-group">
      <button class="btn" @click="store.$reset">重置</button>
    </div>

    <p class="group-title">store.$patch方法</p>
    <div class="btn-group">
      <input type="text" class="numInput" v-model="textModel" />
      <button class="btn" @click="handleStorePatch">设置</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Counter",
};
</script>
<script setup>
import { ref } from "vue";
import { useCounterStore } from "../store/useCounterStore.js";
import { storeToRefs } from "pinia";

const store = useCounterStore();

console.log("Counter.vue", store.secret); // Counter.vue the cake is a lie
console.log("Counter.vue", store.test); // Counter.vue this is a test
console.log("Counter.vue", store.name); // Counter.vue this is a special data of counter

// 订阅
const stopSubscribe = store.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  console.log("subscribe mutation type：", mutation.type); // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  console.log("subscribe mutation storeId：", mutation.storeId); // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  console.log("subscribe mutation payload：", mutation.payload); // 传递给 cartStore.$patch() 的补丁对象。

  console.log(state);
  // state应用：如每当状态发生变化时，将整个 state 持久化到本地存储。
  // localStorage.setItem('cart', JSON.stringify(state))

  /* 打印：使用 store.$patch修改数据才会触发patch object，只是修改state是 undefined
subscribe mutation type： patch object
subscribe mutation storeId： counter
subscribe mutation payload： {num: 100}
Proxy(Object) {num: 100}
  */

  // 取消订阅
  stopSubscribe();
});

// 监听 action
// 传递给它的回调函数会在 action 本身之前执行
store.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
  }) => {
    console.log("name:::", name); // name::: increment
    console.log("store:::", store); // store::: Proxy(Object) {$id: 'counter', $onAction: ƒ, $patch: ƒ, $reset: ƒ, $subscribe: ƒ, …}
    console.log("args:::", args); // args::: [PointerEvent]
  }
);

const { num, doubleNum } = storeToRefs(store);
const { increment, decrement, asyncIncrement, asyncDecrement } = store;

const textModel = ref("");

const handleStorePatch = () => {
  store.$patch({
    // ~~textModel.value将字符串转为数字
    num: ~~textModel.value,
  });
  textModel.value = "";
};
</script>

<style scoped>
.container > .btn-group {
  /* outline: 1px solid red; */
  width: 280px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.num {
  font-size: 32px;
  font-weight: 300;
}

.btn {
  height: 30px;
  outline: none;
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
  padding: 0 10px;
}

.numInput {
  width: 200px;
  height: 30px;
  margin-right: 10px;
}

.group-title {
  text-align: center;
  margin-bottom: 0;
  font-weight: 200;
  font-size: 20px;
}
</style>
