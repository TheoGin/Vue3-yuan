import { reactive, watchEffect } from "vue";

const state = reactive({
  a: 1,
  b: 2,
});

// 一开始会立即执行一次
const stopWatchEffect = watchEffect(() => {
  console.log("watchEffect");

  console.log(state.a);
});

// watchEffect
// 1

state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
// 多次改变，只会输出一次，因为会放入微队列
// watchEffect
// 6

setTimeout(() => {
  stopWatchEffect();
  // 通过调用stop函数，会停止监听

  state.a = 8;
  // 所以watchEffect
}, 1000);


