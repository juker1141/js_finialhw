<template>
  <div class="container text-black">
    <div class="row">
      <div class="col-10 offset-1">
        <div class="row my-3">
          <div class="col-12 col-lg-10 offset-lg-1 d-flex justify-content-start">
            <router-link
              class="fontOrbitron fz_20 fz_md_30 text-black
              text-decoration-none" to="/home"
            >Hardware Store</router-link>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-12 col-lg-10 offset-lg-1 d-flex justify-content-start">
            <router-link class="text-black mr-2 text-decoration-none"
            to="/products">Cart</router-link>>
            <div class="text-black mx-2 font-weight-bold">Information</div>>
            <div class="text-secondary ml-2">Payment</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6 offset-lg-1 mt-3 mt-lg-0">
            <div class="text-left fz_24 mb-2">訂單資訊</div>
            <div class="border border-black mb-5">
              <div class="d-flex justify-content-between
              align-items-center border-bottom border-black p-3">
                <div>
                  聯絡資訊<span class="ml-2 fz_14 text-secondary">
                  {{ order.user.name }} / {{ order.user.email }} / {{ order.user.tel }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <span class="material-icons">
                  keyboard_arrow_down
                  </span>
                  <span class="material-icons">
                  keyboard_arrow_up
                  </span>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center p-3">
                <div>
                  地址<span class="ml-2 fz_14 text-secondary">
                  {{ order.user.address }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <span class="material-icons">
                  keyboard_arrow_down
                  </span>
                  <span class="material-icons">
                  keyboard_arrow_up
                  </span>
                </div>
              </div>
            </div>
            <div class="text-left fz_24 mb-2">付款資訊</div>
            <div class="border border-black mb-3 fz_20 flex-column
            d-flex">
              <div class="d-flex justify-content-between p-3">
                付款方式<div>{{ order.payment }}</div></div>
              <div v-if="order.payment === 'ATM'" class="p-3 border-top border-black">
                <div>請使用轉帳至下列號碼</div>
                <div class="d-flex align-items-center justify-content-center
                mt-3 border border-black p-3">00010061234567
                <router-link to="/paycheck" class="btn
                btn-black rounded-0 ml-5" v-if="!this.paid">前往轉帳</router-link>
                <div v-else class="text-success ml-5">轉帳成功！</div>
                </div>
              </div>
              <div v-else class="p-3 border-top border-black">
                <div>請使用下列 QR code 至超商繳費</div>
                <div class="d-flex justify-content-center">
                  <div class="card-img-top rounded-0 border border-black orderImg mt-3"
                  :style="{ background: `url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/iD6Y460uwvAmMrHJGSqx5xWBgsONGu9zdHm5nIWQvdvCWKwQrhZD8Ws6GQbeLqiT0Eb2oxTFnmmJ70PUZ3QE2JL8f1GxP8jUb3ohODAogtwexWgMUZ8VkbSxuyaznt7R.jpg)` }"></div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-black p-2 rounded-0 fz_24 px-6"
              type="button" :disabled="!this.paid">確認付款</button>
            </div>
          </div>
          <div class="col-12 col-lg-5 mt-3 mt-lg-1">
            <ul class="listStyle_none bg-gray p-3 m-0 text-left">
              <li class="d-flex bg-gray mb-2"
              v-for="item in order.products" :key="item.id">
                <div class="card-img-top rounded-0 orderImg_sm"
                :style="{ background: `url(${item.product.imageUrl[0]})` }">
                </div>
                <div class="w-100">
                  <div class="p-2 h-100 w-100 d-flex align-items-center justify-content-between">
                    <div class="font-weight-bold mb-1
                    d-flex align-items-end justify-content-between">
                      {{ item.product.title }}
                      <span class="fz_14 ml-2 fontRoboto font-weight-normal">
                      x {{ item.quantity }}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="text-right">
                      NT {{ item.quantity * item.product.price | toCurrency | DollarSign }}</div>
                    </div>
                  </div>
                </div>
              </li><hr class="my-4 border-secondary">
              <li class="p-2 d-flex justify-content-between">
              購物車金額<span>NT {{ orderTotal | toCurrency | DollarSign }}</span></li>
              <li class="p-2 d-flex justify-content-between">
              運費
              <div v-if="orderTotal > 2000">
              <span class="mr-2 text-danger font-weight-bold">( 滿 2, 000 免運 )</span>NT 0
              </div>
              <div v-else>NT {{ 60 | toCurrency | DollarSign }}</div>
              </li>
              <li class="p-2 d-flex justify-content-between font-weight-bold fz_20">
              總金額
              <div v-if="orderTotal > 2000">NT {{ orderTotal | toCurrency | DollarSign }}
              </div>
              <div v-else>NT {{ orderTotal + 60 | toCurrency | DollarSign }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderTotal: 0,
    };
  },
  computed: {
    order() {
      return this.$store.state.order;
    },
    orderId() {
      return this.$store.state.orderId;
    },
    paid() {
      return this.$store.state.paid;
    },
  },
  watch: {
    order() {
      this.orderTotal = 0;
      this.order.products.forEach((item) => {
        this.orderTotal += (item.quantity * item.product.price);
      });
      return this.orderTotal;
    },
    paid() {
      return this.paid;
    },
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch('getOrder', id);
    },
    writeInLocalStorage() {
      if (!localStorage.getItem('store')) {
        localStorage.setItem('store', JSON.stringify(this.$store.state));
      } else {
        this.$store.replaceState({ ...this.$store.state, ...JSON.parse(localStorage.getItem('store')) });
        this.getOrder(this.orderId);
      }
    },
  },
  created() {
    this.getOrder(this.orderId);
    setTimeout(() => {
      this.writeInLocalStorage();
    }, 0);
  },
};
</script>

<style lang="scss">
.orderImg{
  height: 120px;
  width: 120px;
  background-position: center !important;
  background-size: cover !important;
  &_sm {
    height: 60px;
    width: 60px;
    background-position: center !important;
    background-size: cover !important;
  }
}
.fz_24{
  font-size: 24px;
}
</style>
