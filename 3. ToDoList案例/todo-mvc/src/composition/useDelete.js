export default function useDelete(todoListRef) {
  const handleTodoDelete = (todo) => {
    const index = todoListRef.value.indexOf(todo);
    todoListRef.value.splice(index, 1);
  };

  const handleClearCompleted = () => {
    const clearArr = todoListRef.value.filter((todo) => todo.completed);
    clearArr.forEach(todo => {
        handleTodoDelete(todo);
    })
  };

  return {
    handleTodoDelete,
    handleClearCompleted,
  };
}
