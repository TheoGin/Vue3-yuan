<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <span v-if="loading">loading...</span>
    <template v-else-if="user">
      <span>{{ user.name }}</span>
      <a class="ml-5" href="" @click.prevent="handleLoginOut">退出</a>
    </template>
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view />
</template>

<script>
import { computed, provide } from "vue";
import { useStore } from "./store/useLoginUser";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const store = useStore();
    store.whoAmI();

    const router = useRouter();
    const handleLoginOut = async () => {
      await store.loginOut();
      router.push("/login");
    };

    // provide('count', ref(66))
    console.log(store.state.user);
    

    return {
      loading: computed(() => store.state.loading),
      user: computed(() => store.state.user),
      handleLoginOut,
    };
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
