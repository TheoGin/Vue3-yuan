import { ref } from "vue";
import { generateId } from "../utils/todoStorage";

export default function useNewTodo(todoListRef) {
  const newTodoRef = ref(""); // 新任务的标题，默认为空字符串

  function addTodo() {
    // 需要去掉空格，还要防止undefined.trim()
    const value = newTodoRef.value && newTodoRef.value.trim();
    // const value = newTodoRef.value.trim();
    if (!value) {
      return;
    }

    // 生成一个任务对象，将其加入到任务列表中
    const todo = {
      id: generateId(), // 如果title一样，方便唯一标识
      title: value,
      completed: false, // 是否完成
    };

    todoListRef.value.push(todo);
    newTodoRef.value = "";
  }

  return {
    newTodoRef,
    addTodo,
  };
}
