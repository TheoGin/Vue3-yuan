<template>
  <div class="menu-bar-container">
    <div class="logo">
      <h1>logo</h1>
    </div>
    <ul class="nav">
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
    </ul>
    <div class="user">
      <span>{{ user.name }}</span>
    </div>
  </div>
  <img alt="Vue logo" src="./assets/logo.png" :class="user.name" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      user: {
        name: 'sophotheo'
      }
    }
  }
}
</script>
