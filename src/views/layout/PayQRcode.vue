<template>
  <div class="w-100 h_100vh bg_payQRcode d-flex
  justify-content-center align-items-center">
    <div class="bg-grayOP p-3 text-white mb-9">
      <router-link
        class="fontOrbitron fz_20 fz_md_30 text-white text-decoration-none"
        to="/home"
      >Hardware Store</router-link>
      <div>數位支付平台</div>
      <div class="mb-3">確認付款嗎？</div>
      <button type="button" class="btn fz_24_important
      bg-white text-black rounded-0 p-1 px-5">確認付款</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
    };
  },
  created() {
  },
};
</script>

<style lang="scss">
.bg_payQRcode{
  background: url(https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80) no-repeat;
  background-position: center !important;
  background-size: cover !important;
}
</style>
