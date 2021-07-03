<template>
  <div class="w-100 h_100vh bg_paycheck d-flex
  justify-content-center align-items-center">
    <div class="bg-blackOP p-4 text-white mb-9">
      <router-link
        class="fontOrbitron fz_30_important text-white text-decoration-none"
        to="/home"
      >Hardware Store</router-link>
      <div class="mb-3 fz_30_important">數位支付平台</div>
      <div v-if="!isPaid">
        <div v-if="order.amount > 2000" class="mb-4">
        您將支付 NT <span class="fz_24">{{ Math.round(order.amount) | toCurrency | DollarSign}}</span>
        ，確認付款嗎？</div>
        <div v-else class="mb-3">
        您將支付 NT <span class="fz_24">
          {{ Math.round(order.amount) + 60 | toCurrency | DollarSign}}</span>
        ，確認付款嗎？</div>
        <button type="button" class="btn fz_24_important
        bg-primary text-white rounded-0 p-1 px-5" @click="payMoney">確認付款</button>
      </div>
      <router-link v-else to="/payment" class="text-decoration-none text-white
      fz_24_important">
      <div class="bg-success p-3 px-5">付款成功！<br>點擊回到原頁面確認</div></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPaid: false,
    };
  },
  computed: {
    order() {
      return this.$store.state.order;
    },
    orderId() {
      return this.$store.state.orderId;
    },
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch('getOrder', id);
      this.$store.dispatch('loadingChange', false);
    },
    payMoney() {
      this.$store.dispatch('payMoney', true);
      localStorage.setItem('store', JSON.stringify(this.$store.state));
      this.isPaid = true;
      // this.$router.push('/payment');
    },
  },
  created() {
    this.$store.dispatch('loadingChange', true);
    this.$store.replaceState({ ...this.$store.state, ...JSON.parse(localStorage.getItem('store')) });
    setTimeout(() => {
      this.getOrder(this.orderId);
    }, 0);
  },
};
</script>

<style lang="scss">
.bg_paycheck{
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/WKEKFrARE3wM25Vu09weWZnn2Kln3u7BXhG6WRJBxLu5Us8PpQ92BtxOsAzkbLGtwNWP46C1Y9GIDluURSqnOxNYcTsip0WJoexybmMxNN33B18DSUbljnMph0tqD5hv.jpg) no-repeat;
  background-position: center;
  background-size: cover;
}

</style>
