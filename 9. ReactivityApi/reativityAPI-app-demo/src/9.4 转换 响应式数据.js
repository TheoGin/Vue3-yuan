import { reactive, ref, toRef, toRefs, unref } from "vue";

const countRef = ref(1);

console.log(countRef); // RefImpl {dep: Dep, __v_isRef: true, __v_isShallow: false, _rawValue: 1, _value: 1}

// 1）unref：将响应式数据变为普通数据
const count = unref(countRef);
console.log(count); // 1

// 2）toRef：得到一个响应式对象某个属性的ref格式
const state = reactive({
  a: 1,
  b: 2
});


const aRef = toRef(state, 'a');
console.log(aRef); // RefImpl {dep: Dep, __v_isRef: true, __v_isShallow: false, _rawValue: 1, _value: 1}

aRef.value++;

// 2.1）因为都是响应式数据，所以会互相影响
console.log(state); // Proxy(Object) {a: 2, b: 2}

state.a = 6;

// 2.2）因为都是响应式数据，所以会互相影响
console.log(aRef); // {_object: Proxy(Object), _key: 'a', _defaultValue: undefined, __v_isRef: true, _value: 1}

// 3）toRefs：把一个响应式对象的所有属性转换为ref格式，然后包装到一个plain-object中返回
const stateRef = toRefs(state);
console.log(stateRef); // {a: ObjectRefImpl, b: ObjectRefImpl}


