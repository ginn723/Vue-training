<template>
  <h2>產品列表</h2>
  <div class="container">
  {{ product }}
  <img :src="product.imageUrl" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [],
    };
  },
  methods: {
    getProducts() {
      // $router -> 方法
      // $route -> 物件 -> 取值
      console.log(this.$route);
      // 使用參數做傳遞
      const { id } = this.$route.params;
      // 取遠端資料内容-產品列表
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product;
      });
    },
  },
  mounted() {
    // this.getProduct();
  },
};

</script>
