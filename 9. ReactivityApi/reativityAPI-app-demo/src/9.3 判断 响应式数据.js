import { computed, isProxy, isReactive, isReadonly, isRef, reactive, readonly, ref } from "vue";

const stateReactive = reactive({
  count: 0,
});

// isReactive：判断某个数据是否是通过reactive创建的
console.log(isReactive(stateReactive)); // true

// isProxy：判断某个数据是否是由reactive或readonly
console.log(isProxy(stateReactive)); // true

const stateReadonly = readonly(stateReactive);

// isReadonly：判断某个数据是否是通过readonly创建的
console.log(isReadonly(stateReadonly)); // true
console.log(isReadonly(stateReactive)); // false
console.log(isProxy(stateReadonly)); // true

const stateRef = ref(2);

// isRef:判断某个数据是否是一个ref对象
console.log(isRef(stateRef)); // true

const sumRef = computed(() => {
  return stateRef.value + stateReactive.count;
})

console.log(sumRef.value); // 2
console.log(isRef(sumRef)); // true