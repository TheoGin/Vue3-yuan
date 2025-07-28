import Counter from '../components/Counter.vue'
import TodoList from '../components/TodoList.vue'

export default [
    {
        path: '/',
        redirect: '/counter',
        children: [
            {
                path: 'counter',
                // name: 'counter',
                component: Counter,
            },
            {
                path: 'todolist',
                // name: 'todolist',
                component: TodoList,
            },
        ]
    }
]