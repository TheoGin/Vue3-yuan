import { reactive, ref, watch } from "vue";

const state = reactive({
  a: 1,
  b: 2,
});

// 1. watch监听普通数据
// watch(state.a, (newValue, oldValue) => {
// [Vue warn]: Invalid watch source:  1 A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.
// 1.1 需要传一个箭头函数，因为 state.a 是表达式，算出来是 1 ；除非是ref
/* watch(() => state.a, (newValue, oldValue) => {
  console.log("newValue: ", newValue);
  console.log("oldValue: ", oldValue);
}, {
  immediate: true
}); */
// newValue:  1
// oldValue:  undefined

// 1.2 没有配置immediate: true，一开始不会执行，只有依赖的数据发生变化才会执行。
watch(
  () => state.a,
  (newValue, oldValue) => {
    console.log("newValue: ", newValue);
    console.log("oldValue: ", oldValue);
  }
);

state.a = 6;
// newValue:  6
// oldValue:  1

// 2. watch监听 ref数据，不需要写箭头函数
const countRef = ref(0);
watch(countRef, (newValue, oldValue) => {
  console.log("newValue: ", newValue);
  console.log("oldValue: ", oldValue);
});

countRef.value++;
// newValue:  1
// oldValue:  0

setTimeout(() => {
  countRef.value = 0;
  // 2. watch监听 多个数据
  watch(
    [() => state.a, countRef],
    ([newValue1, newValue2], [oldValue1, oldValue2]) => {
      console.log("newValue1: ", newValue1);
      console.log("oldValue1: ", oldValue1);

      console.log("newValue2: ", newValue2);
      console.log("oldValue2: ", oldValue2);
    }
  );

  countRef.value++;
  countRef.value++;
  countRef.value++;
  countRef.value++;
  // 多次改变，只会输出一次，因为会放入微队列，watchEffect也一样
  /* 
  newValue1:  6
  oldValue1:  6
  newValue2:  4
  oldValue2:  0
  */
});
