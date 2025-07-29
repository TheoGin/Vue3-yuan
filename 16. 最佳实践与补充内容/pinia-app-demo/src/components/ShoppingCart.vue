<template>
  <div class="container">
    <table>
      <thead>
        <th>商品名</th>
        <th>单价</th>
        <th>数量</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartData" :key="item._id">
          <td class="name">
            <img :src="item.image" alt="" class="img" />
            {{ item.name }}
          </td>
          <td class="price">
            {{ item.price }}
          </td>
          <td>
            <button @click="decrement(index)">-</button>
            {{ item.count }}
            <button @click="increment(index)">+</button>
          </td>
          <td>
            {{ item.count * item.price }}
          </td>
          <td>
            <button @click="handleDel(index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="totalPrice">总价：{{ totalPrice }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCartStore } from "../store/useCartStore";

export default {
  // vue2写法
  /*  data: () => {
    return {
      ...mapState(useCartStore, ["cartData"]),
    };
  }, */
  computed: {
    ...mapState(useCartStore, ["cartData", "totalPrice"]),
    // vue2计算属性需要用mapGetters，新版Pinia把mapGetters和mapState都合并写成mapState
    // ...mapGetters(useCartStore, ["cartData"]),
  },
  methods: {
    ...mapActions(useCartStore, ["increment", "decrement", 'removeCart']),
    handleDel(index) {
      if(confirm(`你确定要删除【${this.cartData[index].name}】吗`)) {
        this.removeCart(index);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 900px;
  margin: 20px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.img {
  width: 80px;
  vertical-align: middle;
}
tr {
  /* outline: 1px solid; */
  border-bottom: 1px solid #ccc;
  height: 100px;
  line-height: 100px;
}
td {
  line-height: 80px;
  /* text-align: center; */
  padding: 0 5px;
}
td:not(:first-child) {
  text-align: center;
}

.td {
  width: 10%;
}
.totalPrice {
  text-align: right;
  font-size: 18px;
  font-weight: 300;
}
</style>
