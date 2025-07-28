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
      <input type="text" class="numInput" v-model="textModel">
      <button class="btn" @click="handleStorePatch">设置</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Counter"
}
</script>
<script setup>
import {ref} from 'vue';
import {useCounterStore} from '../store/useCounterStore.js';
import {storeToRefs} from 'pinia';

const store = useCounterStore()

console.log('Counter.vue', store.secret); // Counter.vue the cake is a lie
console.log('Counter.vue', store.test); // Counter.vue this is a test
console.log('Counter.vue', store.name); // Counter.vue this is a special data of counter

const {num, doubleNum } = storeToRefs(store)
const { increment, decrement, asyncIncrement, asyncDecrement } = store;

const textModel = ref('');

const handleStorePatch = () => {
  store.$patch({
    // ~~textModel.value将字符串转为数字
    num: ~~textModel.value
  });
  textModel.value = '';
}
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
