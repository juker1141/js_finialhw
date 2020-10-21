<template>
  <div class="container">
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
        <div class="row mb-2 mb-lg-5">
          <div class="col-12 col-lg-10 offset-lg-1 d-flex justify-content-start">
            <router-link class="text-black mr-2 text-decoration-none"
            to="/products">Cart</router-link>>
            <div class="text-black mx-2 font-weight-bold">Information</div>>
            <div class="text-secondary ml-2">Payment</div>
          </div>
        </div>
        <div class="row flex-column-reverse flex-lg-row">
          <div class="col-12 col-lg-6 offset-lg-1 mt-3 mt-lg-0">
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="createOrder">
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                  <div class="d-flex justify-content-between">
                    <label for="email" class="text-left w-75">
                    <span class="text-danger mr-1">*</span>Email</label>
                    <div><div class="text-danger">* 為必填項目</div></div>
                  </div>
                  <input id="email" type="email" name="Email" v-model="form.email"
                    class="form-control form-control-lg mb-2" :class="classes">
                  <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                </validation-provider>
                <div class="row">
                  <div class="col-12 w_max_lg_50 pr-lg-1">
                    <validation-provider rules="required" v-slot="{ errors, classes}">
                      <label for="name" class="text-left w-100">
                      <span class="text-danger mr-1">*</span>收件人姓名</label>
                      <input id="name" type="text" name="收件人姓名"
                      v-model="form.name" class="form-control form-control-lg mb-2"
                        :class="classes">
                      <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-12 w_max_lg_50 pl-lg-1">
                    <validation-provider rules="required|min:8|numeric"
                    v-slot="{ errors, classes }">
                      <label for="tel" class="text-left w-100">
                      <span class="text-danger mr-1">*</span>聯絡電話</label>
                      <input id="tel" type="tel" name="聯絡電話"
                      v-model="form.tel" class="form-control
                      form-control-lg mb-2" :class="classes">
                      <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="address" class="text-left w-100">
                  <span class="text-danger mr-1">*</span>收件地址</label>
                  <input id="address" type="text" name="收件地址"
                  v-model="form.address" class="form-control form-control-lg mb-2"
                    :class="classes">
                  <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors }">
                  <label for="payment" class="text-left w-100">
                  <span class="text-danger mr-1">*</span>付款方式</label>
                  <select v-model="form.payment"
                  class="custom-select custom-select-lg mb-2" required>
                    <option value="" selected disabled>請選擇付款方式</option>
                    <option value="WebATM">
                      WebATM
                    </option>
                    <option value="ATM">
                      ATM
                    </option>
                    <option value="CVS">
                      CVS
                    </option>
                    <option value="Barcode">
                      Barcode
                    </option>
                    <option value="Credit">
                      Credit
                    </option>
                    <option value="ApplePay">
                      ApplePay
                    </option>
                    <option value="GooglePay">
                      GooglePay
                    </option>
                  </select>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
                <label for="message" class="text-left w-100">留言</label>
                <textarea class="form-control form-control-lg mb-3" v-model="form.message"
                rows="5" id="message"></textarea>
                <div class="d-flex flex-column-reverse flex-lg-row
                align-items-center justify-content-between">
                  <router-link class="d-flex align-items-center
                  text-decoration-none"
                  to="/products">
                    <span class="material-icons">
                    keyboard_arrow_left
                    </span>返回購物車
                  </router-link>
                  <button type="submit" class="btn btn-black
                  fz_24 rounded-0 px-6 mb-3 mb-lg-0" :disabled="invalid">
                  前往付款</button>
                </div>
              </form>
            </validation-observer>
          </div>
          <div class="col-12 col-lg-5 mt-3 mt-lg-1">
            <div class="bg-gray">
              <div class="p-3 w-100 d_block d-lg-none
                font-weight-bold fz_20">
                <div @click="showCartDetail"
                class="p-2 w-100 d-flex justify-content-between align-items-center">
                  總金額
                  <div class="d-flex align-items-center">
                    <div class="cartDetail_total" v-if="cartTotal > 2000">
                      NT {{ Math.round(cartTotal - couponPrice) | toCurrency | DollarSign }}
                    </div>
                    <div class="cartDetail_total"
                    v-else>NT {{ Math.round(cartTotal - couponPrice)
                    + 60 | toCurrency | DollarSign }}</div>
                    <div class="d-flex align-items-center ml-2">
                      <span class="material-icons showCartDetail_down">
                      keyboard_arrow_down
                      </span>
                      <span class="material-icons d_none showCartDetail_up">
                      keyboard_arrow_up
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-0 mx-3 d_none d-lg-none border-secondary cartDetail_line">
              <ul id="cartDetail" class="listStyle_none d_none d-lg-block p-3 m-0 text-left">
                <li class="d-flex bg-gray mb-2"
                v-for="item in cart" :key="item.product.id">
                  <div class="card-img-top rounded-0 cartImg_sm"
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
                <li class="d-flex align-items-center">
                  <div class="w-100 d-flex mb-2 flex-column align-items-end">
                    <div class="w-100 d-flex">
                      <div class="d-flex w-100 position-relative">
                        <input type="text" v-model="coupon.code"
                        class="form-control rounded-0"
                        id="coupons" placeholder="請輸入優惠卷">
                        <div class="position-absolute loading_position">
                          <div v-if="couponLoading === true"
                          class="spinner-border spinner-border_sm text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                          <span v-if="couponWorking === true"
                          class="material-icons text-success font-weight-bold">
                          done
                          </span>
                          <span v-if="couponWorking === false"
                          class="material-icons text-danger font-weight-bold">
                          close
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-if="couponWorking === false && coupon.code"
                    class="fz_14 mt-2 text-danger text-left
                    ">找不到此優惠卷，請您再次確認</div>
                  </div>
                </li>
                <li class="p-2 d-flex justify-content-between">
                購物車金額
                <div class="d-flex flex-column align-items-end">
                <span>
                NT {{ Math.round(cartTotal) | toCurrency | DollarSign }}</span>
                <span v-if="couponWorking === true && coupon.code" class="text-danger">
                節省 - NT {{ couponPrice | toCurrency | DollarSign }}</span>
                </div></li>
                <li class="p-2 d-flex justify-content-between">
                運費
                <div v-if="cartTotal > 2000">
                <span class="mr-2 text-danger font-weight-bold">( 滿 2, 000 免運 )</span>NT 0
                </div>
                <div v-else>NT {{ 60 | toCurrency | DollarSign }}</div>
                </li>
                <li class="p-2 d-flex justify-content-between font-weight-bold fz_20">
                總金額
                <div v-if="cartTotal > 2000">
                  NT {{ Math.round(cartTotal - couponPrice) | toCurrency | DollarSign }}
                </div>
                <div v-else>
                  NT {{ Math.round(cartTotal - couponPrice) + 60 | toCurrency | DollarSign }}
                </div>
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
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      cartTotal: 0,
      cartTotalCoupon: 0,
      coupon: {},
      couponPrice: 0,
      couponWorking: '',
      couponLoading: false,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  watch: {
    cart() {
      this.cartTotal = 0;
      this.cart.forEach((item) => {
        this.cartTotal += (item.quantity * item.product.price);
      });
      return this.cartTotal;
    },
    'coupon.code': function () {
      this.checkCoupon(this.coupon.code);
    },
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    showCartDetail() {
      $('#cartDetail').slideToggle(300);
      $('.cartDetail_line').toggleClass('d-block');
      $('.showCartDetail_down').toggleClass('d-none');
      $('.showCartDetail_up').toggleClass('d-block');
      $('.cartDetail_total').toggleClass('d-none');
    },
    createOrder() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders`;
      if (this.coupon.code) {
        this.form.coupon = this.coupon.code;
      }
      this.$http.post(url, this.form)
        .then((res) => {
          if (res.data.data.id) {
            // 跳出提示訊息
            this.$store.dispatch('getOrderId', res.data.data.id);
            this.$store.dispatch('payMoney', false);
            if (localStorage.getItem('store')) {
              localStorage.removeItem('store');
            }
            this.$router.push('/payment');
            // 重新渲染購物車
          }
        }).catch(() => {
        });
    },
    checkCoupon(code) {
      this.couponLoading = true;
      this.couponWorking = '';
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/coupon/search`;
      const coupon = {
        code,
      };
      this.$http.post(url, coupon)
        .then((res) => {
          this.couponLoading = false;
          this.couponWorking = true;
          this.coupon = res.data.data;
          let newCartTotal = this.cartTotal;
          this.cartTotalCoupon = 0;
          this.couponPrice = 0;
          if (this.coupon.percent) {
            this.cartTotalCoupon = Math.round(newCartTotal * (this.coupon.percent / 100));
            this.couponPrice = newCartTotal - this.cartTotalCoupon;
            newCartTotal = this.cartTotalCoupon;
          }
        }).catch(() => {
          this.couponLoading = false;
          this.couponWorking = false;
          this.couponPrice = 0;
        });
    },
  },
  created() {
    if (localStorage.getItem('coupon')) {
      this.couponWorking = true;
      this.coupon = JSON.parse(localStorage.getItem('coupon'));
      if (this.coupon.code) {
        setTimeout(() => {
          this.checkCoupon(this.coupon.code);
        }, 0);
      }
    } else {
      this.coupon = {};
    }
    this.getCart();
  },
};
</script>

<style lang="scss">
.cartImg_sm {
  height: 60px;
  width: 60px;
  background-position: center !important;
  background-size: cover !important;
}
.fz_24{
  font-size: 24px !important;
}
</style>
