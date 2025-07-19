import { ref, watchEffect } from "vue";
import { fetchTodos, saveTodos } from "../utils/todoStorage";

export default function useTodoList() {
  const todoListRef = ref(fetchTodos());
  // console.log(todoListRef);

  window.todoListRef = todoListRef; // 测试

  watchEffect(() => {
    saveTodos(todoListRef.value);
  });
  return {
    todoListRef,
  };
}
