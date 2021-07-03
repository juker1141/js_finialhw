<template>
  <div class="container text-black">
    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1">
        <div class="row my-3">
          <div class="col-12 col-lg-10 offset-lg-1 d-flex justify-content-start">
            <router-link
              class="fontOrbitron fz_20 fz_md_30 text-black
              text-decoration-none" to="/home"
            >Hardware Store</router-link>
          </div>
        </div>
        <div class="row mb-2 mb-lg-5">
          <div class="col-12 col-lg-10 offset-lg-1 d-flex justify-content-start">
            <a class="text-black mr-2 text-decoration-none"
            to="/home" @click="getCart('/home')">Home</a>>
            <a class="text-black mx-2 text-decoration-none"
            to="/order" @click="getCart('/orderlist')">Order</a>>
            <div class="ml-2 text-black font-weight-bold">Payment</div>
          </div>
        </div>
        <div class="row flex-column-reverse flex-lg-row">
          <div class="col-12 col-lg-6 offset-lg-1 mt-3 mt-lg-0">
            <div class="text-left fz_24 mb-2">訂單資訊</div>
            <div v-if="orderLoading" class="border border-black mb-3 mb-lg-5">
              <div class="d-flex flex-column">
                <div @click="showOrderInfo" class="d-flex justify-content-between
                align-items-center border-bottom border-black p-3">
                  <div class="d-flex align-items-center">
                    聯絡資訊<span class="ml-2 fz_14
                    text-secondary text-truncate w_max_150px w_max_lg_230px">
                    {{ order.user.name }} / {{ order.user.email }} / {{ order.user.tel }}</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="material-icons showOrderInfo_down">
                    keyboard_arrow_down
                    </span>
                    <span class="material-icons d_none showOrderInfo_up">
                    keyboard_arrow_up
                    </span>
                  </div>
                </div>
                <ul id="orderInfo" class="text-left d_none
                listStyle_none m-0 p-3 border-bottom border-black">
                  <li>姓名 ： {{ order.user.name }}</li>
                  <li>信箱 ： {{ order.user.email }}</li>
                  <li>電話 ： {{ order.user.tel }}</li>
                </ul>
              </div>
              <div class="d-flex justify-content-between align-items-center p-3">
                <div>
                  地址<span class="ml-2 fz_14 text-secondary">
                  {{ order.user.address }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <span class="material-icons">
                  gps_fixed
                  </span>
                </div>
              </div>
            </div>
            <div class="text-left fz_24 mb-2">付款資訊</div>
            <div class="border border-black mb-3 fz_20 flex-column
            d-flex">
              <div class="d-flex justify-content-between p-3">
                付款方式<div>{{ order.payment }}</div></div>
              <div v-if="order.payment === 'WebATM' || order.payment === 'ATM'"
              class="p-3 border-top border-black">
                <div>請使用轉帳至下列號碼</div>
                <div class="d-flex flex-column flex-lg-row
                align-items-center justify-content-center
                mt-3 border border-black p-3">00010061234567
                <router-link to="/paycheck" class="btn
                btn-black rounded-0 ml-lg-5" v-if="!this.paid">前往轉帳</router-link>
                <div v-else class="text-success ml-lg-5">轉帳成功！</div>
                </div>
              </div>
              <div v-else class="p-3 border-top border-black">
                <div>請按按鈕進行繳費</div>
                <div class="d-flex flex-column align-items-center justify-content-center">
                  <router-link to="/paycheck" class="btn
                  btn-black rounded-0 mt-3" v-if="!this.paid">前往繳費</router-link>
                  <div v-else class="text-success mt-3">轉帳成功！</div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center justify-content-lg-end">
              <button @click="paidOrder" class="btn btn-black
              p-2 rounded-0 fz_24 px-6"
              type="button" :disabled="!this.paid">確認付款
                <div class="spinner-border text-light ml-2" v-if="isPaying" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </button>
            </div>
          </div>
          <div class="col-12 col-lg-5 mt-3 mt-lg-1">
            <div class="bg-gray">
              <div class="p-2 p-lg-3 w-100 d_block d-lg-none
              font-weight-bold fz_20">
                <div @click="showOrderDetail"
                class="p-2 w-100 d-flex justify-content-between align-items-center">
                  總金額
                  <div class="d-flex align-items-center">
                    <div class="orderDetail_total" v-if="orderTotal > 2000">
                      NT {{ orderTotal | toCurrency | DollarSign }}
                    </div>
                    <div class="orderDetail_total"
                    v-else>NT {{ orderTotal + 60 | toCurrency | DollarSign }}</div>
                    <div class="d-flex align-items-center ml-2">
                      <span class="material-icons showOrderDetail_down">
                      keyboard_arrow_down
                      </span>
                      <span class="material-icons d_none showOrderDetail_up">
                      keyboard_arrow_up
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-0 mx-3 d_none d-lg-none border-secondary orderDetail_line">
              <ul id="orderDetail" class="listStyle_none d_none d-lg-block p-3 m-0 text-left">
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
                <li v-if="order.coupon"
                class="p-2 fz_14 text-secondary d-flex justify-content-between">
                優惠卷<span>{{ order.coupon.code }}</span></li>
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
  </div>
</template>

<script>
/* global $ */

export default {
  data() {
    return {
      orderTotal: 0,
      isPaying: false,
    };
  },
  computed: {
    order() {
      return this.$store.state.order;
    },
    orderLoading() {
      return this.$store.state.orderLoading;
    },
    orderId() {
      return this.$store.state.orderId;
    },
    paid() {
      return this.$store.state.paid;
    },
  },
  watch: {
    orderId() {
      this.getOrder(this.orderId);
    },
    order() {
      this.orderTotal = 0;
      if (this.orderLoading) {
        // this.writeInLocalStorage();
        this.order.products.forEach((item) => {
          this.orderTotal += (item.quantity * item.product.price);
        });
      }
      if (this.order.coupon) {
        this.orderTotal = Math.round(this.orderTotal * (this.order.coupon.percent / 100));
      }
      return this.orderTotal;
    },
    paid() {
      return this.paid;
    },
    cartBlockShow() {
      return this.$store.state.cartBlockShow;
    },
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch('getOrder', id);
      // if (!this.order) {
      //   this.$store.replaceState({ ...this.$store.state,
      // ...JSON.parse(localStorage.getItem('store')) });
      // }
    },
    getCart(address) {
      this.$store.dispatch('getCart');
      setTimeout(() => {
        this.$router.push(address);
      }, 500);
    },
    showOrderInfo() {
      $('#orderInfo').slideToggle(0);
      $('.showOrderInfo_down').toggleClass('d-none');
      $('.showOrderInfo_up').toggleClass('d-block');
    },
    showOrderDetail() {
      $('#orderDetail').slideToggle(300);
      $('.orderDetail_line').toggleClass('d-block');
      $('.showOrderDetail_down').toggleClass('d-none');
      $('.showOrderDetail_up').toggleClass('d-block');
      $('.orderDetail_total').toggleClass('d-none');
    },
    writeInLocalStorage() {
      this.$store.dispatch('messagePush', 'clear');
    },
    paidOrder() {
      this.isPaying = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}/paying`;
      this.$http.post(url)
        .then(() => {
          this.isPaying = false;
          this.$store.dispatch('messagePush',
            {
              message: '付款成功',
              status: 'success',
            });
          this.$router.push('/paydone');
        }).catch(() => {
          this.$store.dispatch('messagePush',
            {
              message: '付款失敗，請再嘗試看看',
              status: 'danger',
            });
        });
    },
  },
  created() {
    this.getOrder(this.orderId);
    this.writeInLocalStorage();
    this.$store.dispatch('cartBlockisShow', false);
    window.addEventListener('storage', (event) => {
      this.isPaying = true;
      // this.$store.replaceState({ ...this.$store.state,
      // ...JSON.parse(localStorage.getItem('store')) });
      setTimeout(() => {
        this.isPaying = false;
      }, 1000);
    });
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
