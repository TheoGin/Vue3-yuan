<template>
  <h1>count: {{ count }}</h1>
  <button @click="increase">increase</button>
  <button @click="decrease">decrease</button>
</template>

<script>
  export default {
    name: 'OptionAPI',
    data() {
      return {
        count: 0
      }
    },
    methods: {
      increase(){
        console.log(this); // Proxy(Object) {increase: ƒ, …}，跟vue2不一样，给Vue组件实例加了一层代理
        this.count++;
      },
      decrease(){
        this.count--;
      }
    }
  }
</script>