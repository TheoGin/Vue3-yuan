<script>
import { reactive, readonly, ref, toRefs } from "vue";

function usePosition() {
  const pos = reactive({ x: 1, y: 2 });
  return toRefs(pos);
}

function useBook() {
  const books = ref([]);
  return {
    books,
  };
}

function useLoginUser() {
  const user = readonly({
    isLogin: false,
    loginId: null,
  });
  return {
    ...toRefs(user)
  };
}
export default {
  setup() {
    const obj = {
      ...usePosition(),
      ...useBook(),
      ...useLoginUser(),
    };
    console.log(obj);
    return obj;
  },
};
</script>
