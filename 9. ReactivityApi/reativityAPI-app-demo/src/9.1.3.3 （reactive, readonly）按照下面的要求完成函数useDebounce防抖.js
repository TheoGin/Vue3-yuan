import { reactive, readonly } from "vue";

function useDebounce(obj, duration) {
  // 在这里补全函数
  const valueOrigin = reactive(obj);
  const value = readonly(valueOrigin);

  let timerId;
  console.log(Object.entries(valueOrigin)); // [ ['a', 1], ['b', 2] ]
  const setValue = (newObj) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log("changed");

      // Object.assign(valueOrigin, newObj);
      // 或者
      Object.entries(newObj).forEach(([k, v]) => { 
        valueOrigin[k] = v;
      });
    }, duration);
  };

  return {
    value, // 这里是一个只读对象，响应式数据，默认值为参数值
    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
  };
}

const { value, setValue } = useDebounce({ a: 1, b: 2 }, 2000);
console.log(value);
window.value = value;
window.setValue = setValue;

value; // Proxy(Object) {a: 1, b: 2}
setValue({ a: 6 }); // undefined
setValue({ a: 6 }); // undefined
setValue({ a: 6 }); // undefined
// changed
value; // Proxy(Object) {a: 6, b: 2}
