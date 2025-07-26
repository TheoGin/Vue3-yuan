import { computed, ref, watch } from "vue";
import gsap from "gsap";

const colors = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];

// bars -> gdp -> props.gdp
export default function useGDP(gdp, maxSize) {
  // { "country": "美国", "value": 21.428 } --->{ "country": "美国", "value": 21.428, size: 400, color: #fff }
  const maxValue = computed(() => {
    return Math.max(...gdp.value.map((item) => item.value));
  });

  const bars = ref([]);

  const targetBars = computed(() => {
    return gdp.value.map((item, index) => {
      return {
        ...item,
        // 当前value / 最大value = 所求x / maxSize
        size: (item.value / maxValue.value) * maxSize,
        color: colors[index % gdp.value.length],
      };
    });
  });

  watch(
    targetBars,
    () => {
        console.log( targetBars.value.length);
        
      // 将bars变化到targetBars
      for (let i = 0; i < targetBars.value.length; i++) {
        if (!bars.value[i]) {
          bars.value[i] = {
            ...targetBars.value[i],
            size: 0,
            value: 0,
          };
        }

        // gsap.to(bars, {
        // 将bars.value[i]中的属性 逐步变化到targetBars.value[i]，而不是整个bars
        gsap.to(bars.value[i], {
          ...targetBars.value[i],
          duration: 1,
        });
      }
    },
    {
      deep: true, // 深度监听。在所有嵌套的变更时都会被触发
    }
  );

  return {
    bars,
  };
}
