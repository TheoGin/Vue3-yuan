import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useCounterStore } from "./useCounterStore";

// 不能写在这
// const counterStore = useCounterStore();
export const useTodoListStore = defineStore(
  "todoList",
  () => {
    const counterStore = useCounterStore();
    const otherCounter = computed(() => counterStore.doubleNum * 3);

    const state = reactive({
      todos: [
        {
          text: "学习 Pinia",
          isCompleted: true,
        },
        {
          text: "打羽毛球",
          isCompleted: false,
        },
        {
          text: "玩游戏",
          isCompleted: true,
        },
      ],
      count: 1,
    });

    // 使用 vue 里面的计算属性来做 getters
    const doubleCount = computed(() => {
      return state.count * 2;
    });

    function addTodo(text) {
      console.log(state.todos);

      state.todos.push({
        text: text,
        isCompleted: false,
      });
    }

    function handleDel(index) {
      state.todos[index].isCompleted = !state.todos[index].isCompleted;
    }

    function removeTodo(index) {
      console.log(index);
      state.todos.splice(index, 1);
    }

    function handleAddCount() {
      state.count++;
    }

    return {
      state,
      doubleCount,
      addTodo,
      handleDel,
      removeTodo,
      handleAddCount,
      otherCounter,
    };
  },
  {
    persist: true,
  }
);
