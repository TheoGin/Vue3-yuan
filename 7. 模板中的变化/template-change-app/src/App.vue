<template>
  <div class="container">
    <div class="list">
      <strong>编辑：</strong>
      <div class="list">
        <!-- <CheckEditor 
          v-for="item in sells" 
          :key="item.id" 
          :modelValue="item.sell"
          @update:modelValue="item.sell = $event"
          :title="item.title"
          @update:title="item.title = $event"
        /> -->

        <!-- 上面语法糖 -->
        <CheckEditor
          v-for="item in sells"
          :key="item.id"
          v-model="item.isSell"
          v-model:title.trim="item.title"
        />
      </div>
    </div>
    <div class="list">
      <strong>销售中:</strong>
      <div>
        <!-- v-if 的优先级 现在高于 v-for
          v-if用到v-for中的循环变量就会报错，因为先运行
          v-if Uncaught TypeError: Cannot read properties of undefined (reading 'isSell') 
        -->
        <!-- <template v-for="(item, index) in sells" :key="item.id" v-if="item.isSell"> -->

        <!-- 1. 当使用<template>进行v-for循环时，需要把key值放到<template>中，而不是它的子元素中 -->
        <!-- <template v-for="(item, index) in sells" :key="item.id">
          <span>{{ index + 1 }}.</span>
          <strong>{{ item.title }}</strong>
        </template> -->
        <!-- v-if 和 v-for不能连用，又要控制状态，就不能像上面那样写，而且v-if 和 v-for写法效率有问题，每次修改都要判断全部——》计算属性 -->
        <template v-for="(item, index) in selling" :key="item.id">
          <span>{{ index + 1 }}.</span>
          <strong>{{ item.title }}</strong>
        </template>

        <!-- vue2写法：是给每个元素加:key="item.id" -->
        <!-- <template v-for="(item, index) in sells">
          <span :key="item.id">{{ index + 1 }}.</span>
          <strong :key="item.id">{{ item.title }}</strong>
        </template> -->
      </div>
    </div>
  </div>
  <!-- ---------------账号和手机号切换--------------- -->
  <!-- 在vue切换后，上面两个文本框的值还是一样的；vue3就不会，这是由于：
     2. 当使用v-if v-else-if v-else分支的时候，不再需要指定key值，因为vue3会自动给予每个分支一个唯一的key 
     如果要实现 两个文本框的值还是一样的 切换之后值还一样，可以用v-model绑定同一个变量，而不是用相同的key
   -->
  <div v-if="isAccount">
    <span>账号：</span>
    <input type="text">
   </div>
   <div v-else>
    <span>手机号：</span>
    <input type="text">
   </div>
  <!--   即便要手工给予key值，也必须给予每个分支唯一的key，不能因为要重用分支而给予相同的 key（在vue3会导致功能无效） -->
  <!-- <div v-if="isAccount" :key="1">
    <span>账号：</span>
    <input type="text" />
  </div>
  <div v-else :key="1">
    <span>手机号：</span>
    <input type="text" />
  </div> -->
  <button @click="isAccount = !isAccount">账号和手机号切换</button>
</template>

<script>
import { computed, ref } from "vue";
import CheckEditor from "./components/CheckEditor.vue";

const defaultSells = [
  {
    id: 1,
    sell: true,
    title: "iphone12",
  },
  { id: 2, isSell: false, title: "xiaomi" },
  { id: 3, isSell: true, title: "huawei" },
  { id: 4, isSell: true, title: "vivo" },
];

export default {
  name: "App",
  components: {
    CheckEditor,
  },
  setup() {
    const sellsRef = ref(defaultSells);

    // 正在销售的产品
    const sellingRef = computed(() => {
      return sellsRef.value.filter((item) => item.isSell);
    });

    let isAccountRef = ref(true);

    return {
      sells: sellsRef,
      selling: sellingRef,
      isAccount: isAccountRef,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  width: 880px;
  margin: 50px auto;
}
.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}
strong {
  margin-right: 1em;
}
</style>
