import { reactive, readonly, ref} from 'vue';

// 1. reactive
const state = reactive({
  a: 1,
  b: 2,
});

console.log(state); // Proxy(Object) {a: 1, b: 2}

// 2. readonly
// immutable 不可改变的
const immutableState = readonly(state);
immutableState.a = 3; // [Vue warn] Set operation on key "a" failed: target is readonly. 

console.log(immutableState); // Proxy(Object) {a: 1, b: 2}

state.a = 66;
console.log(state); // Proxy(Object) {a: 66, b: 2}
// 2.1 因为 immutableState -> state -> {a: 66, b: 2}，所以state的改变会影响immutableState
console.log(immutableState); // Proxy(Object) {a: 66, b: 2}

// 2.2 但是 他们不是同一地址
console.log(immutableState === state); // false

// 3. ref
const stateRef = ref(state);
console.log(stateRef === state); // false
console.log(stateRef.value === state); // true
console.log(stateRef); // RefImpl {dep: Dep, __v_isRef: true, __v_isShallow: false, _rawValue: {…}, _value: Proxy(Object)}
/* ref
{
  get value() {
    ...
  },
  set value() {
    ...
  }
}
*/
