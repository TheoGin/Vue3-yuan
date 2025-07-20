<template>
  <div id="app" data-v-app="">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus="" autocomplete="off" placeholder="What needs to be done?"
          v-model="newTodoRef" @keyup.enter="addTodo" />
        <!-- 在键盘弹起的时候触发 -->
      </header>
      <!-- 当没了todo列表的时候，不显示 -->
      <section class="main" v-show="todoListRef.length > 0">
        <!-- 
          v-model="allCompletedRef"
          等价于
          :checked="allCompletedRef"
          @change="setAllCompletedRef($event.target.checked)"
          -->
        <input 
          id="toggle-all" 
          class="toggle-all" 
          type="checkbox"
          :checked="allCompletedRef"
          @change="setAllCompletedRef($event.target.checked)"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li 
            class="todo" 
            :class="{completed: todo.completed, editing: todo === editingTodoRef}" 
            v-for="todo in filteredTodosRef" :key="todo.id"
            @dblclick="handleTodoEdit(todo)"
          >
            <div class="view">
              <!-- 左边check状态相当于是它一个透明的checkbox盖在这上面的，它这里看实际上是一个背景图，就是label的背景图 -->
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label>{{ todo.title }}</label>
              <button class="destroy" @click="handleTodoDelete(todo)"></button>
            </div>
            <input 
              v-model="todo.title" 
              class="edit" 
              type="text" 
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.escape="cancelEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <!-- 当没了todo列表的时候，不显示 -->
      <footer class="footer" v-show="todoListRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainingNumRef }}</strong>
          <!-- 剩余个数为 1 的时候，item为单数，否则为复数items -->
          <span>item{{ remainingNumRef === 1 ? '' : 's' }} left</span>
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ selected: visibilityType === 'all' }">All</a></li>
          <li><a href="#/active" :class="{ selected: visibilityType === 'active' }">Active</a></li>
          <li><a href="#/completed" :class="{ selected: visibilityType === 'completed' }">Completed</a></li>
        </ul>
        <!-- <button class="clear-completed" style="display: none"> -->
        <button class="clear-completed" v-show="completedNumRef > 0" @click="handleClearCompleted">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList.js";
import useNewTodo from "./composition/useNewTodo.js";
import useFilter from "./composition/useFilterTodo.js";
import useEditTodo from "./composition/useEditTodo.js";
import useDeleteTodo from "./composition/useDeleteTodo.js";

export default {
  name: 'App',
  setup() {
    const { todoListRef } = useTodoList();

    return {
      todoListRef,
      ...useNewTodo(todoListRef),
      ...useFilter(todoListRef),
      ...useEditTodo(todoListRef),
       ...useDeleteTodo(todoListRef),
    }
  }
}
</script>
