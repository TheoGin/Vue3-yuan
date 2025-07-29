<template>
  <div class="container">
    <div class="input-container">
      <p class="numInput">
        自己仓库的Getter数据：{{ doubleCount }}
      </p>
      <button class="btn" @click="handleAddCount">+1</button>
    </div>

    <div class="input-container">
      <p class="numInput">
        其他仓库的Getter数据：{{ otherCounter }}
      </p>
    </div>

    <div class="input-container">
      <p class="numInput">
        <!-- 组合式写法的store没有store.$reset ——》可以通过插件实现
        Uncaught Error: 🍍: Store "todoList" is built using the setup syntax and does not implement $reset().
        -->
        <!-- <button class="btn" @click="store.$reset">还原初始状态</button> -->
        <button class="btn" @click="store.reset">还原初始状态</button>
      </p>
    </div>

    <div class="input-container">
      <input type="text" class="numInput" v-model="newText">
      <button class="btn" @click="handleAddTodo">添加</button>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in state.todos" :key="index">
        <div :class="{del: item.isCompleted}" @click="handleDel(index)">{{ item.text }}</div>
        <div class="close" @click="handleClose(index)">X</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useTodoListStore} from "../store/useTodoListStore";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const store = useTodoListStore();
const {state, doubleCount, otherCounter} = storeToRefs(store);
const {addTodo, handleDel, removeTodo, handleAddCount} = store;
const newText = ref('');

console.log('TodoList.vue', store.secret); // TodoList.vue the cake is a lie
console.log('TodoList.vue', store.test); // TodoList.vue this is a test
console.log('TodoList.vue', store.name); // TodoList.vue undefined


const handleAddTodo = () => {
  const value = newText.value && newText.value.trim();
  if (value) {
    addTodo(value);
    newText.value = '';
  } else {
    alert('请输入内容');
  }

}

const handleClose = (index) => {
  console.log(index)
  const res = window.confirm(`
    是否要删除当前的项目：
    ${state.value.todos[index].text}
    完成状态：${state.value.todos[index].isCompleted ? '已完成' : '未完成'}
  `)
  if (res) {
    removeTodo(index)
  }
}
</script>

<style scoped>
.container {
  width: 300px;
  /* outline: 1px solid blue; */
  margin: 20px auto;
}

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* outline: 1px solid; */
}

.numInput {
  width: 75%;
  height: 30px;
}

.btn {
  /* width: 20%; */
  cursor: pointer;
}

.list {
  margin-top: 20px;
}

.item {
  /* outline: 1px solid; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.close {
  width: 20px;
  height: 20px;
  /* border: 1px solid; */
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
  background-color: rgb(243, 83, 83);
  color: #fff;
  font-weight: 400;
  cursor: pointer;
}

.del {
  text-decoration: line-through;
}
</style>
