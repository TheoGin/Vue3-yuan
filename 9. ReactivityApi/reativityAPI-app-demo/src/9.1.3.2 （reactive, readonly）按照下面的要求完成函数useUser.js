import { reactive, readonly } from "vue";

function useUser() {
  // 在这里补全函数
  const userOrigin = reactive({});
  const user = readonly(userOrigin);

  const setUserName = (name) => {
    userOrigin.name = name;
  };

  const setUserAge = (age) => {
    userOrigin.age = age;
  };

  return {
    user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
    setUserName, // 这是一个函数，传入用户姓名，用于修改用户的名称
    setUserAge, // 这是一个函数，传入用户年龄，用户修改用户的年龄
  };
}

const { user, setUserName, setUserAge } = useUser();
user.name = "theo"; // [Vue warn] Set operation on key "name" failed: target is readonly. Proxy(Object) {}
console.log(user); // Proxy(Object) { }

setUserName("sophotheo");
setUserAge(18);
console.log(user); // Proxy(Object) {name: 'sophotheo', age: 18}


