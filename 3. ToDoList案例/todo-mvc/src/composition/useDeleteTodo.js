export default function useDelete(todoListRef) {
  const handleTodoDelete = (todo) => {
    const index = todoListRef.value.indexOf(todo);
    todoListRef.value.splice(index, 1);
  };

  const handleClearCompleted = () => {
    /* const clearArr = todoListRef.value.filter((todo) => todo.completed);
    clearArr.forEach(todo => {
        handleTodoDelete(todo);
    }) */
   // 简化写法，直接重新赋值
   todoListRef.value = todoListRef.value.filter((todo) => !todo.completed);
  };

  return {
    handleTodoDelete,
    handleClearCompleted,
  };
}
