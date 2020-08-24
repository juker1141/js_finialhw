<template>
  <div>
    <h2>單一產品頁面</h2>
    <div class="w-100 d-flex justify-content-center mb-4">
      <div class="w-25">
        <img :src="product.imageUrl[0]" alt class="img-fluid" />
      </div>
    </div>
    <h3>{{ product.title }}</h3>
    <h5 class="mb-5">{{ product.content }}</h5>
    <router-link to="/products">回到列表</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: { imageUrl: [] },
    };
  },
  created() {
    console.log(this.$route.params.id);
    const { id } = this.$route.params;
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`;
    this.$http.get(url).then((res) => {
      console.log(res);
      this.product = res.data.data;
    });
  },
};
</script>
