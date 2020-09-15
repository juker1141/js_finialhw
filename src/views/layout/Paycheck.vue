<template>
  <div class="w-100 h_100vh bg_paycheck d-flex
  justify-content-center align-items-center">
    <div class="bg-grayOP p-4 text-white mb-9">
      <router-link
        class="fontOrbitron fz_30 text-white text-decoration-none"
        to="/home"
      >Hardware Store</router-link>
      <div class="mb-3 fz_30">數位支付平台</div>
      <div v-if="order.amount > 2000" class="mb-4">
      您將支付 NT {{ order.amount | toCurrency | DollarSign}}，確認付款嗎？</div>
      <div v-else class="mb-3">
      您將支付 NT {{ order.amount + 60 | toCurrency | DollarSign}}，確認付款嗎？</div>
      <button type="button" class="btn fz_24_important
      bg-white text-black rounded-0 p-1 px-5" @click="payMoney">確認付款</button>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    payMoney() {
      this.$store.dispatch('payMoney', true);
      localStorage.setItem('store', JSON.stringify(this.$store.state));
      this.$router.push('/payment');
    },
  },
  created() {
    this.$store.replaceState({ ...this.$store.state, ...JSON.parse(localStorage.getItem('store')) });
    setTimeout(() => {
      this.getOrder(this.orderId);
    }, 0);
  },
};
</script>

<style lang="scss">
.bg_paycheck{
  background: url(https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80) no-repeat;
  background-position: center !important;
  background-size: cover !important;
}
</style>
