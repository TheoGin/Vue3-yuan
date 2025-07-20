import { computed, ref } from "vue";

export default function useEdit(todoListRef) {
  // const editingTodoRef = ref(todoListRef.value[0]); // 测试
  const editingTodoRef = ref(null); // 当前正在修改的是哪一个todo
  let originTitle = null; // 缓存之前的title值

  function handleTodoEdit(todo) {
    originTitle = todo.title;
    editingTodoRef.value = todo;
  }

  function doneEdit(todo) {
    editingTodoRef.value = null;

    
    const title = todo.title && todo.title.trim();
    if (title) {
      // 如果有内容，前后有空格，去掉空格
      todo.title = title;
    } else {
      // 当完成修改的时候，todo.title为空，则删除这一项
      todoListRef.value.splice(todoListRef.value.indexOf(todo), 1); // 觉得删除代码重复，可以提到util中
    }
  }

  function cancelEdit(todo) {
    editingTodoRef.value = null;
    todo.title = originTitle;
  }

  /* const allCompletedRef = computed({
    get() {
      return todoListRef.value.filter((item) => !item.completed).length === 0;
    },
    set(checked) {
      todoListRef.value.forEach((todo) => {
        todo.completed = checked;
      });
    },
  }); */
  const allCompletedRef = computed(() => {
    // return todoListRef.value.filter((item) => item.completed).length === 0;
    return todoListRef.value.filter((item) => !item.completed).length === 0;
    // 或者
    // return todoListRef.value.every((item) => item.completed);
  });

  function setAllCompletedRef(checked) {
    todoListRef.value.forEach((todo) => {
      todo.completed = checked;
    });
  }

  return {
    editingTodoRef,
    handleTodoEdit,
    doneEdit,
    cancelEdit,
    allCompletedRef,
    setAllCompletedRef,
  };
}
