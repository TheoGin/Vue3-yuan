<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <span v-if="loading">loading...</span>
    <template v-else-if="user">
      <span>xxx</span>
      <a class="ml-5" href="" @click.prevent="handleLogout">退出</a>
    </template>
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view />
</template>
<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter()

    const handleLogout = async () => {
      await store.dispatch('loginUser/loginOut');
      router.push('/login')
    }
    
    return {
      loading: computed(() => store.state.loginUser.loading),
      user: computed(() => store.state.loginUser.user),
      handleLogout
    }
  },
};
</script>
<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav .ml-5 {
  margin-left: 5px;
}
</style>

