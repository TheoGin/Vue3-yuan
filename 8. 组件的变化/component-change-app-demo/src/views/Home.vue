<template>
  <div class="container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="modalVisible = true">打开朦层</button>
      </p>
      <!-- <Modal v-if="modalVisible">
        <button @click="modalVisible = false">关闭蒙层</button>
      </Modal> -->

      <!-- 蒙层应该放在body元素内，放在这不合理 ——》telport元素 -->
      <Teleport to="body">
        <Modal v-if="modalVisible">
          <button @click="modalVisible = false">关闭蒙层</button>
        </Modal>
      </Teleport>
    </div>
    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <div class="block big">
      <h2>
        <Block3> 异步区域3 </Block3>
      </h2>
    </div>
    <div class="block big"><h2>区域4</h2></div>
    <div class="block mid">
      <h2>
        <Block5 />
      </h2>
    </div>
    <div class="block"><h2>区域6</h2></div>
  </div>
</template>

<script>
// import Block3 from "./Block3.vue";
import { ref } from "vue";
import { getAsyncComponent } from "../utils";
import Modal from "../components/Modal.vue";
// import Block5 from "./Block5.vue";
const Block3 = getAsyncComponent("../components/Block3.vue");
const Block5 = getAsyncComponent("../components/Block5.vue");


export default {
  /* 
  components: {
    Block3,
    Block5,
  },
  */
  components: {
    // Block3: defineAsyncComponent(() => import("./Block3.vue")),
    // 对象配置写法
    /* Block3: getAsyncComponent("../components/Block3.vue"),
    Block5: getAsyncComponent("../components/Block5.vue"), */
    Block3,
    Block5,
    Modal,
  },
  setup() {
    const modalVisibleRef = ref(false);

    return {
      modalVisible: modalVisibleRef,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}
.block {
  width: 200px;
  margin: 15px;
  height: 250px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mid {
  width: 300px;
}
.big {
  width: 400px;
}
</style>
