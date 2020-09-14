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
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="createOrder">
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                  <label for="email" class="text-left w-100">Email</label>
                  <input id="email" type="email" name="Email" v-model="form.email"
                    class="form-control form-control-lg mb-2" :class="classes">
                  <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                </validation-provider>
                <div class="row">
                  <div class="col-12 w_max_lg_50 pr-lg-1">
                    <validation-provider rules="required" v-slot="{ errors, classes}">
                      <label for="name" class="text-left w-100">收件人姓名</label>
                      <input id="name" type="text" name="收件人姓名"
                      v-model="form.name" class="form-control form-control-lg mb-2"
                        :class="classes">
                      <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="col-12 w_max_lg_50 pl-lg-1">
                    <validation-provider rules="required|min:8|numeric"
                    v-slot="{ errors, classes }">
                      <label for="tel" class="text-left w-100">聯絡電話</label>
                      <input id="tel" type="tel" name="聯絡電話"
                      v-model="form.tel" class="form-control
                      form-control-lg mb-2" :class="classes">
                      <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                </div>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="address" class="text-left w-100">收件地址</label>
                  <input id="address" type="text" name="收件地址"
                  v-model="form.address" class="form-control form-control-lg mb-2"
                    :class="classes">
                  <span class="invalid-feedback text-right">{{ errors[0] }}</span>
                </validation-provider>
                <validation-provider rules="required" v-slot="{ errors }">
                  <label for="payment" class="text-left w-100">付款方式</label>
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
                <div class="d-flex justify-content-between">
                  <router-link class="d-flex align-items-center
                  text-decoration-none"
                  to="/products">
                    <span class="material-icons">
                    keyboard_arrow_left
                    </span>返回購物車
                  </router-link>
                  <button type="submit" class="bg-black text-white
                  fz_24 rounded-0 px-6" :disabled="invalid">
                  前往付款</button>
                </div>
              </form>
            </validation-observer>
          </div>
          <div class="col-12 col-lg-5 mt-3 mt-lg-1">
            <ul class="listStyle_none bg-gray p-3 m-0 text-left">
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
              <li class="p-2 d-flex justify-content-between">
              購物車金額<span>NT {{ cartTotal | toCurrency | DollarSign }}</span></li>
              <li class="p-2 d-flex justify-content-between">
              運費
              <div v-if="cartTotal > 2000">
              <span class="mr-2 text-danger font-weight-bold">( 滿 2, 000 免運 )</span>NT 0
              </div>
              <div v-else>NT {{ 60 | toCurrency | DollarSign }}</div>
              </li>
              <li class="p-2 d-flex justify-content-between font-weight-bold fz_20">
              總金額
              <div v-if="cartTotal > 2000">NT {{ cartTotal | toCurrency | DollarSign }}
              </div>
              <div v-else>NT {{ cartTotal + 60 | toCurrency | DollarSign }}</div>
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
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      cart: [],
      cartTotal: 0,
      orderId: '',
    };
  },
  watch: {
    cart() {
      this.cartTotal = 0;
      this.cart.forEach((item) => {
        this.cartTotal += (item.quantity * item.product.price);
      });
      return this.cartTotal;
    },
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
        });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http.post(url, this.form)
        .then((res) => {
          if (res.data.data.id) {
            // 跳出提示訊息
            this.orderId = res.data.data.id;
            console.log('這是資訊頁傳出的ID', this.orderId);
            // this.$bus.$emit('orderId', orderId);
            this.$router.push('/payment');
            // 重新渲染購物車
            this.getCart();
          }
        }).catch((error) => {
          console.log(error.response.data.errors);
        });
    },
  },
  created() {
    this.getCart();
  },
  beforeDestroy() {
    console.log('我還拿著id', this.orderId);
    this.$bus.$emit('orderId', this.orderId);
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
.fz_48{
  font-size: 24px;
}
</style>
