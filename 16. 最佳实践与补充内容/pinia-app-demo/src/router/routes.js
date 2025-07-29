import Cart from '../components/ShoppingCart.vue'
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
            {
                path: 'cart',
                // name: 'cart',
                component: Cart,
            },
        ]
    }
]