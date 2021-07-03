<template>
  <div class="text-white text_xl_black position-relative h_100vh">
    <div class="container d-flex flex-column align-items-center align-items-xl-start">
      <div class="my-3 w-100 d-flex justify-content-start">
        <router-link
          class="fontOrbitron fz_30_important text-white text_xl_black text-decoration-none"
          to="/home"
        >Hardware Store</router-link>
      </div>
      <div class="bg-blackOP bg_xl_transparent
      px-2 py-5 p-lg-5 p-xl-0 text-center text-xl-left payDone_mt_auto">
        <div class="fz_48 mb-5 font-weight-bold">付款成功！！</div>
        <div class="fz_24 mb-5">我們將馬上為您出貨
        <span class="d-none d-xl-inline-block">，</span>
        <br class="d-block d-xl-none">希望您會喜歡我們的商品！</div>
        <div>接著您可以至
        <a class="mr-2 font-weight-bold" to="/home" @click="getCart('/home')">首頁</a>
        ><a class="ml-2 font-weight-bold" to="/orderlist" @click="getCart('/orderlist')">
        我的訂單</a> 中查詢運送狀況</div>
      </div>
      <a
        class="text-black text_xl_white bg-yellow bg_xl_black
        text-decoration-none fz_24 px-9 py-2 mt-9 mt-xl-7 font-weight-bold"
        to="/products"
        @click="getCart('/products')"
      >
        繼續購物
      </a>
    </div>
    <div class="payDoneImg h_100vh position-absolute"></div>
  </div>
</template>

<script>
export default {
  methods: {
    getCart(address) {
      this.$store.dispatch('getCart');
      setTimeout(() => {
        this.$router.push(address);
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.text_xl_black{
  @media (min-width: 1200px) {
    color: #121212 !important;
  }
}
.text_xl_white{
  @media (min-width: 1200px) {
    color: #fff !important;
  }
}
.bg_xl_transparent{
  @media (min-width: 1200px) {
    background: transparent !important;
  }
}
.bg_xl_black{
  @media (min-width: 1200px) {
    background: #121212 !important;
  }
}
.payDone_mt_auto{
  margin-top: 20%;
}
.payDoneImg {
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/A5alFEBJwxiwq3VtuMPGZnLKA3GUA2dm9Xr4Pq7PhMF9VYx3WvBhysasINNnqIOIw2tPrXLDVAveMJWyUS0ZX0oDM9JIKvv6pfcM2V79ab3K9dcM4Crchgm4rTq2PXJn.jpg) no-repeat;
  top: 0;
  right: 0;
  width: 100%;
  z-index: -10;
  background-position: 35% 10% !important;
  @media (min-width: 1200px) {
    width: 50%;
    background-position: 30% 10% !important;
  }
}
</style>
