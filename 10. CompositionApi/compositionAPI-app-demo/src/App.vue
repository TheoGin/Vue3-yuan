<template>
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->

  <h1>2025 GDP Top 5</h1>
  <div class="container">
    <Bar1 :gdp="gdp" />
    <Bar2 :gdp="gdp" />
  </div>
  <div class="controls">
    <div class="item" v-for="item in gdp">
      <label>{{ item.country }}</label>
      <input type="number" step="0.001" min="0" v-model="item.value" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Bar1 from "./components/Bar1.vue";
import Bar2 from "./components/Bar2.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Bar1,
    Bar2,
  },
  setup() {
    const gdp = ref([]);
    async function fetchGdp() {
      gdp.value = await fetch("/api/gdp.json").then((resp) => resp.json());
      
      /* // 错误写法
      const res = await fetch("/api/gdp.json");
      if(res) {
        gdp.value = res.json();
      } */
    }
    fetchGdp();
    console.log(gdp);

    return {
      gdp,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.controls {
  margin: 1em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
}
.item label {
  margin: 0 1em;
}
.item input {
  height: 26px;
  font-size: 14px;
}
h1 {
  text-align: center;
}
</style>
