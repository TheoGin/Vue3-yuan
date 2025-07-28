import {defineStore} from "pinia";

export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            num: 0
        }
    },
    getters: {
        doubleNum: (state) => state.num * 2,
    },
    actions: {
        increment() {
            this.num++;
        },
        decrement() {
            this.num--;
        },
        async asyncIncrement() {
            await new Promise(resolve => setTimeout(resolve, 1000))
            this.num++;
        },
        async asyncDecrement() {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })
            this.num--;
        },
    },
    persist: true
})