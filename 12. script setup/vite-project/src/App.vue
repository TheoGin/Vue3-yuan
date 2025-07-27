<template>
  <div class="container">
    <Carousel ref="compRef" :imgs="datas" @change="handleChange"></Carousel>
    <div class="current">
      <button
        class="btn"
        @click="change(currentIndex - 1)"
        :disabled="currentIndex === 0"
      >
        左
      </button>
      {{ currentIndex }}
      <button
        class="btn"
        @click="change(currentIndex + 1)"
        :disabled="currentIndex === datas.length - 1"
      >
        右
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Carousel from "./components/Carousel.vue";

const currentIndex = ref(0);

console.log(import.meta.url); // http://localhost:5173/src/App.vue?t=1753602245802
const datas = [
  // new URL(字符串, import.meta.url) 只能放字符串儿模板，字符串是可以的，如果说你要动态的话，在某一个地方可以拼接上变量，这是可以的，它会给你进行分析啊，但是不能直接把一个变量放到这个位置，那它分析不出来了。因为它在编译的时候呢，是还没有运行的状态，没有运行的状态的话，它是不知道这个变量的值是多少，但是如果说你在这个地方用一个变量来替换的话就可以了，是因为它就这样处理了，它把这个目录下边的所有的jpg文件全部给你生成到打包目录。
  new URL(`./assets/Wallpaper1.jpg`, import.meta.url),
  new URL(`./assets/Wallpaper2.jpg`, import.meta.url),
// import.meta.url拿到当前文件的路径，相对当前文件的路径去找到图片 ——》转换为最终打包后的路径
  new URL(`./assets/Wallpaper3.jpg`, import.meta.url),
  new URL(`./assets/Wallpaper4.jpg`, import.meta.url),
];

const compRef = ref(null);
function handleChange(newIndex) {
  currentIndex.value = newIndex;
}
function change(i) {
  // ref.value可以拿到这个组件的实例，这个组件里边提供了一个switchTo方法
  if (compRef.value) {
    compRef.value.switchTo(i);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.current {
  display: flex;
  column-gap: 10px;
  margin-top: 30px;
  align-items: center;
}
.btn {
  border: none;
  outline: none;
  background: #409eff;
  color: #fff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.btn:hover {
  background: #66b1ff;
}
.btn:active {
  background: #3a8ee6;
}
.btn:disabled {
  background: #66b1ff80;
  cursor: not-allowed;
}
</style>
