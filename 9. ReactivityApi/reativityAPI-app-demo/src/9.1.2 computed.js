import { computed, reactive } from 'vue';

const state = reactive({
  a: 1,
  b: 2,
});

const sumRef = computed(() => {
  console.log('computed');

  return state.a + state.b;
})

// 没有用的时候，不会输出 computed

console.log(sumRef.value);
console.log(sumRef.value);
console.log(sumRef.value);
console.log(sumRef.value);
console.log(sumRef.value);
// computed 只会输出一次，因为有缓存

state.a = 5;
state.b = 6;
console.log(sumRef.value);
console.log(sumRef.value);
console.log(sumRef.value);
console.log(sumRef.value);
console.log(sumRef.value);
// computed 还是只会输出一次，因为有缓存