import { computed, onMounted, onUnmounted, ref } from "vue";
import { filter } from "../utils/todoStorage";

// 不属于组件写在外面
const validHash = ["all", "active", "completed"];

// hash -> 筛选方式 -> 筛选列表
export default function useFilter(todoListRef) {
  // 展示列表默认为全部
  const visibilityType = ref("all");

  // 提取出来，方便在组件卸载的时候移除
  function onHashChange() {
    // 可能是 #abc 或 #/abc。 ? 匹配前面的子表达式零次或一次。
    const hash = location.hash.replace(/#\/?/, "");

    if (validHash.includes(hash)) {
      visibilityType.value = hash;
    } else {
      // 不是上面三种情况，就把hash栏值为空，然后展示列表改为全部'all'
      window.location.hash = "";
      visibilityType.value = "all";
    }
  }

  // 1. 组件挂载完成的生命周期函数
  onMounted(() => {
    window.addEventListener("hashchange", onHashChange);
  });

  // 2. 组件销毁过后的生命周期函数
  onUnmounted(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  // 根据 筛选方式 和 筛选列表 的出筛选结果 ——》最好用计算属性，因为如果筛选方式没有变，可以用缓存，变了就会重新计算。计算属性也是ref
  const filteredTodosRef = computed(() => {
    return filter(todoListRef.value, visibilityType.value);
  });

  // 剩余需要完成的个数
  const remainingNumRef = computed(() => {
    return filter(todoListRef.value, "active").length;
  });

  // 已完成的个数
  const completedNumRef = computed(() => {
    return filter(todoListRef.value, "completed").length;
  });

  return {
    visibilityType,
    filteredTodosRef,
    remainingNumRef,
    completedNumRef,
  };
}
