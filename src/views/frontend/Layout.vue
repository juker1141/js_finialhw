<template>
  <div>
    <section id="navbar"
    class="w-100 position-fixed
    navbarPosition zIndex_30 bg-white">
      <button v-if="windowY >= 500" @click="goToTop" class="position-fixed btn d-flex
      goToTopBtn_position p-1 border-yellow border_5px bg-dark"
      type="button" id="goToTopBtn">
        <span class="material-icons text-yellow font-weight-bold fz_24">
        keyboard_arrow_up
        </span>
      </button>
      <div class="container-fluid d-flex justify-content-between
      align-items-center my-2 my-lg-3 px-5 position-relative">
        <button class="btn p-1 justify-content-between align-items-center d-flex d-lg-none"
        type="button" @click="navbarShow">
          <span class="material-icons">menu</span>
        </button>
        <router-link
          class="fontOrbitron fz_20 fz_md_30 text-black text-decoration-none"
          to="/home"
        >Hardware Store</router-link>
        <div class="d-flex align-items-center">
          <ul
            class="listStyle_none bg-gray bg_lg_transparent
            zIndex_10 position_absolute position_lg_relative
            align-items-center d-lg-flex m-0 p-0 pt-2 pb-3 p-lg-0 list_position">
            <li class="py-3 py-lg-0">
              <a href="#" @click="goToPage('/products')"
              class="text-black px-3 mr-2 text-decoration-none list_hover">商品</a>
            </li>
            <li class="py-3 py-lg-0">
              <a href="#" @click="goToPage('/orderlist')"
              class="text-black px-3 mr-2 text-decoration-none list_hover"
              >訂單</a>
            </li>
            <li class="py-3 py-lg-0">
              <a href="#" @click="goToPage('/about')"
              class="text-black px-3 mr-2 text-decoration-none list_hover"
              >關於我們</a>
            </li>
            <li class="py-3 py-lg-0">
              <a href="#" @click="goToPage('/login')"
                class="text-black btn p-1 d-flex justify-content-center align-items-center"
                >
                <span class="material-icons">person</span>
              </a>
            </li>
          </ul>
          <button @click="openCart"
            class="text-black btn ml-2 p-1 d-flex justify-content-center
            align-items-center position-relative"
            type="button">
            <span class="material-icons">shopping_cart</span>
            <div v-if="cart.length >= 1"
            class="position-absolute cartNum bg-danger d-flex align-items-center
            justify-content-center text-white rounded-circle fz_12">
              {{ cart.length }}
            </div>
          </button>
        </div>
      </div>
    </section>
    <div id="cartBlock" :class="{ 'active' : cartBlockShow }"
    class="h-100 bg-white text-black position-fixed zIndex_40 p-4 px-5 p-lg-6 cartBlockPosition">
      <div class="d-flex justify-content-between mb-5">
        <div class="fz_30_important fz_md_36 font-weight-bold text-black">購物車</div>
        <div class="d-flex align-items-center">
          <button @click="closeCart"
          class="btn d-flex align-items-center p-0" type="button">
            <span class="material-icons fz_30_important fz_md_36">
            close
            </span>
          </button>
        </div>
      </div>
      <div>
        <ul class="listStyle_none m-0 p-0">
          <li class="d-flex bg-gray mb-2 text-black"
          v-for="item in cart" :key="item.product.id">
            <div class="card-img-top rounded-0 cartImg"
            :style="{ background: `url(${item.product.imageUrl[0]})` }">
            </div>
            <div class="w-100 position-relative">
              <div v-if="loadingProduct === item.product.id"
              class="d-flex align-items-center justify-content-center
              h-100 w-100 position-absolute bg-blackOP">
                <div class="spinner-border text-white" id="loadingIcon" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="p-3 h-100 w-100 d-flex flex-column justify-content-between">
                <div class="d-flex flex-column align-items-start">
                  <div class="font-weight-bold w-100 mb-1 d-flex justify-content-between">
                    {{ item.product.title }}
                    <div class="d-flex align-items-center">
                      <button @click="deleteCartProduct(item.product.id)"
                      class="btn d-flex align-items-center p-0" type="button">
                        <span class="material-icons">
                        close
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="text-left fontRoboto">
                    <div
                    v-if="!item.product.price || item.product.price === item.product.origin_price"
                    >NT {{ item.product.origin_price | toCurrency | DollarSign }}</div>
                    <div v-else class="d-flex align-items-end">
                      <div class="mr-2">NT {{ item.product.price | toCurrency | DollarSign }}</div>
                      <del class="text-secondary fz_14">
                      NT {{ item.product.origin_price | toCurrency | DollarSign }}</del>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center w-50">
                    <button type="button" class="btn d-flex p-0" :disabled="item.quantity === 1"
                    @click="item.quantity --; updateCartQuantity(item.product.id, item.quantity)">
                      <span class="material-icons">
                      remove
                      </span>
                    </button>
                    <input type="number" min="1"
                    @change="updateCartQuantity(item.product.id, item.quantity)"
                    class="border-0 text-center w-50 bg-transparent pl-2"
                    v-model.number="item.quantity">
                    <button type="button" class="btn d-flex p-0"
                    @click="item.quantity ++; updateCartQuantity(item.product.id, item.quantity)">
                      <span class="material-icons">
                      add
                      </span>
                    </button>
                  </div>
                  <div class="text-right font-weight-bold">
                  NT {{ item.quantity * item.product.price | toCurrency | DollarSign }}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="d-flex justify-content-end p-3">
        <div class="w-25 d-none d-lg-flex justify-content-end">
          <span v-if="couponWorking === true && cart.length >= 1" class="material-icons
          fz_36 text-success pr-2">
            done
          </span>
        </div>
        <div class="w-100 w_lg_75 text-secondary d-flex flex-column">
          <div class="d-flex mb-2 flex-column">
            <div class="d-flex justify-content-between">
              <span v-if="couponWorking === true && cart.length >= 1" class="material-icons
              fz_36 text-success d-block d-lg-none pr-2">
                done
              </span>
              <input type="text" v-model="couponCode"
              class="form-control w-75 rounded-0"
              id="coupons" placeholder="請輸入優惠卷">
              <button class="btn btn-yellow ml-auto px-2 rounded-0 d-flex align-items-cneter"
              type="button" @click="checkCoupon(couponCode)"><span class="material-icons">
              send
              </span></button>
            </div>
            <div v-if="couponWorking === false" class="fz_14 mt-2 text-danger text-left
            ">找不到此優惠卷，請您再次確認</div>
          </div>
          <div v-if="cartTotal"
          class="d-flex justify-content-between mb-1 align-items-center">
            購物車金額
            <span v-if="couponWorking === true">
            NT {{ Math.round(cartTotal - couponPrice) | toCurrency | DollarSign }}</span>
            <span v-else>
            NT {{ Math.round(cartTotal) | toCurrency | DollarSign }}</span></div>
            <span v-if="couponWorking === true && cart.length >= 1"
            class="text-danger text-right mb-2">
            節省 - NT {{ couponPrice | toCurrency | DollarSign }}</span>
            <span v-if="cart.length === 0"
            class="text-danger text-right mb-2">
            購物車內沒有東西，無法使用折價卷</span>
          <div v-else
          class="d-flex justify-content-between mb-1 align-items-center">
          購物車金額<div>NT 0</div></div>
          <div v-if="cartTotal > 2000"
          class="d-flex justify-content-between align-items-center mb-1">
          運費<div><span class="text-danger mr-2 font-weight-bold">
          ( 滿 $ 2, 000 免運 )</span>NT 0</div></div>
          <div v-else class="d-flex
          justify-content-between align-items-center mb-1">
          運費<div>NT {{ 60 | toCurrency | DollarSign }}</div></div>
          <div v-if="cartTotal > 2000"
          class="d-flex mb-3 justify-content-between align-items-center
          font-weight-bold fz_20 text-black">
          總金額<div>NT {{ Math.round(cartTotal - couponPrice) | toCurrency | DollarSign }}</div></div>
          <div v-else class="d-flex mb-3 font-weight-bold fz_20
          justify-content-between align-items-center text-black">
          總金額<div>
          NT {{ Math.round(cartTotal - couponPrice) + 60 | toCurrency | DollarSign }}</div></div>
          <div class="d-flex justify-content-end">
          <button @click="closeCart(); toInformationPage()" type="button"
          class="btn bg-black text-white rounded-0 fz_30_important px-5 w-100 w_lg_75"
          :disabled="cart.length === 0">
          前往結帳</button></div>
          <div v-if="cart.length === 0"
          class="text-danger text-right mt-5 fz_20 fz_lg_24">您的購物車沒有東西！！</div>
        </div>
      </div>
    </div>
    <router-view class="navbar_mt" id="main" @updateCart="getcart"/>
    <div id="subscribe"
    class="footerBannerImg p-5 p-lg-9 text-white d-flex flex-column align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-8 col-lg-7 text-left">
            <div class="mb-3 mb-lg-6 fz_16 fz_lg_30">
            想要獲得更多<br class="d-lg-none">活動訊息及優惠資訊嗎？<br></div>
            <div class="mb-3 mb-lg-6 fz_20 fz_lg_30">趕快訂閱我們吧！</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-7">
            <div class="input-group mb-3">
              <input type="text" class="form-control text-yellow
              form_control bg-transparent border-yellow
              form_control_lg_lg fz_lg_24 form-control_yellow" placeholder=" 請輸入您的 Email"
              aria-label="Example text with button addon" aria-describedby="button-addon1">
              <div class="input-group-prepend">
                <button class="btn btn-yellow fz_14 fz_lg_24
                font-weight-bold px-2 px-lg-5 rounded-right
                text-black" type="button"
                id="button-addon1">訂閱每月電子報</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" class="bg-dark p-3 p-lg-5">
      <div class="container d-flex align-items-center justify-content-between">
        <div class="w_100">
          <div class="mb-3">
            <router-link
            class="fontOrbitron fz_30_important text-yellow text-decoration-none"
            to="/home">
            Hardware Store
            </router-link><br class="d-lg-none">
            <span class="fz_14 text-yellow">© 2020. All Rights Reserved.</span>
          </div>
          <div class="d-flex d-lg-none
          flex-column-reverse justify-content-center align-items-center">
            <ul class="listStyle_none
            p-0 m-0 text-yellow d-flex align-items-center fz_14">
              <li class="mr-3">聯絡我們</li>
              <li class="mr-3">隱私權聲明</li>
              <li>服務條款</li>
            </ul>
            <ul class="listStyle_none justify-content-end
            p-0 m-0 mb-3 d-flex align-items-center fz_14">
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-github-square fz_30_important"></i>
                </a>
              </li>
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-facebook-square fz_30_important"></i>
                </a>
              </li>
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-instagram-square fz_30_important"></i>
                </a>
              </li>
              <li>
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fas fa-envelope-square fz_30_important"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul class="listStyle_none justify-content-end
          text-left p-0 m-0 mb-3 d-none d-lg-flex align-items-center fz_14">
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-github-square fz_30_important"></i>
              </a>
            </li>
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-facebook-square fz_30_important"></i>
              </a>
            </li>
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-instagram-square fz_30_important"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fas fa-envelope-square fz_30_important"></i>
              </a>
            </li>
          </ul>
          <ul class="listStyle_none
          text-left p-0 m-0 text-yellow d-none d-lg-flex align-items-center fz_14">
            <li class="mr-3">聯絡我們</li>
            <li class="mr-3">隱私權聲明</li>
            <li>服務條款</li>
          </ul>
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
      windowY: '',
      cartTotal: 0,
      loadingProduct: '',
      toPathName: '',
      fromPathName: '',
      couponCode: '',
      couponWorking: '',
      coupon: {},
      cartTotalCoupon: 0,
      couponPrice: 0,
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartBlockShow() {
      return this.$store.state.cartBlockShow;
    },
  },
  watch: {
    cart() {
      this.getcart();
      this.cartTotal = 0;
      if (this.cart.length === 0) {
        this.cartTotal = 0;
        if (this.couponCode) {
          this.checkCoupon(this.couponCode);
        }
        return this.cartTotal;
      } if (this.cart.length >= 1) {
        this.cart.forEach((item) => {
          this.cartTotal += (item.quantity * item.product.price);
        });
        if (this.couponCode) {
          this.checkCoupon(this.couponCode);
        }
      }
      return this.cartTotal;
    },
  },
  methods: {
    navbarShow() {
      $('.list_position').slideToggle('fast');
    },
    goToPage(link) {
      const w = $(window).width();
      if (w < 992) {
        $('.list_position').slideToggle('fast');
      }
      this.$router.push(link).catch(() => {});
    },
    goToTop() {
      /* 按下GoTop按鈕時的事件 */
      $('html,body').animate({ scrollTop: 0 }, 'slow');/* 返回到最頂上 */
      return false;
    },
    goToTopBtnShow() {
      /* 偵測卷軸滑動時，往下滑超過400px就讓GoTop按鈕出現 */
      $(window).scroll(() => {
        this.windowY = window.scrollY;
      });
    },
    openCart() {
      $('#cartBlock').toggleClass('active');
      this.$store.dispatch('darkShadyChange', true);
      this.$store.dispatch('cartBlockisShow', true);
    },
    closeCart() {
      $('#cartBlock').toggleClass('active');
      setTimeout(() => {
        this.$store.dispatch('darkShadyChange', false);
      }, 200);
    },
    getcart() {
      this.$store.dispatch('getCart');
    },
    updateCartQuantity(id, quantity) {
      this.loadingProduct = id;
      $('#loadingIcon').addClass('d-inline-block');
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http.patch(url, cart)
        .then(() => {
          this.loadingProduct = '';
          this.getcart();
          if (this.couponCode) {
            this.checkCoupon(this.couponCode);
          }
        });
    },
    deleteCartProduct(id) {
      this.loadingProduct = id;
      $('#loadingIcon').addClass('d-inline-block');
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.loadingProduct = '';
          this.getcart();
        });
    },
    checkCoupon(code) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/coupon/search`;
      const coupon = {
        code,
      };
      this.$http.post(url, coupon)
        .then((res) => {
          this.couponWorking = true;
          this.coupon = res.data.data;
          let newCartTotal = this.cartTotal;
          this.cartTotalCoupon = 0;
          this.couponPrice = 0;
          if (this.cart.length >= 1) {
            if (this.coupon.percent) {
              this.cartTotalCoupon = Math.round(newCartTotal * (this.coupon.percent / 100));
              this.couponPrice = newCartTotal - this.cartTotalCoupon;
              newCartTotal = this.cartTotalCoupon;
            }
          }
        }).catch(() => {
          if (this.couponCode) {
            this.couponWorking = false;
          }
          localStorage.removeItem('coupon');
        });
    },
    toInformationPage() {
      if (!localStorage.getItem('coupon')) {
        localStorage.setItem('coupon', JSON.stringify(this.coupon));
      } else {
        localStorage.removeItem('coupon');
      }
      setTimeout(() => {
        this.$router.push('/information').catch(() => {});
      }, 500);
    },
    hideFooter() {
      if (this.$route.path === '/login'
      || this.$route.path === '/information'
      || this.$route.path === '/payment'
      || this.$route.path === '/paycheck'
      || this.$route.path === '/paydone') {
        $('#subscribe').addClass('d_none_important');
        $('#footer').addClass('d_none_important');
        $('#navbar').addClass('d_none_important');
        $('#main').removeClass('navbar_mt');
      } else {
        $('#subscribe').removeClass('d_none_important');
        $('#footer').removeClass('d_none_important');
        $('#navbar').removeClass('d_none_important');
        $('#main').addClass('navbar_mt');
      }
    },
  },
  created() {
    this.navbarShow();
    this.goToTopBtnShow();
    this.getcart();
    setInterval(this.hideFooter, 0);
  },
  beforeRouteUpdate(to, from, next) {
    this.toPathName = to.fullPath;
    this.fromPathName = from.fullPath;
    if (this.fromPathName === '/information') {
      if (this.toPathName === '/payment') {
        next();
      } else {
        this.$store.dispatch('cartBlockisShow', true);
        this.$store.dispatch('darkShadyChange', true);
      }
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.d_none_important{
  display: none !important;
}
.navbarPosition {
  top: 0;
}
.cartBlockPosition{
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  right: -100%;
  width: 100%;
  transition: all .5s ease-out .2s;
  &.active {
    right: 0%;
  }
  @media (min-width: 992px) {
    width: 40%;
    right: -40%;
  }
  @media (min-width: 1400px) {
    width: 30%;
    right: -30%;
  }
}
.navbar_mt {
  margin-top: 50px;
  @media (min-width: 768px) {
    margin-top: 77px;
  }
}
.goToTopBtn_position {
  bottom: 150px;
  right: 30px;
  z-index: 50;
}
.border_5px {
  border-width: 5px;
}
.list_position {
  top: 42px;
  width: 100%;
  left: 0;
  display: none;
  z-index: 30;
  @media (min-width: 768px) {
    top: 52px;
  }
  @media (min-width: 992px) {
    top: 0;
  }
}
.bg_lg_transparent{
  @media (min-width: 992px) {
    background-color:transparent !important;
  }
}
.form-control{
  &_yellow{
    &::-webkit-input-placeholder{
      color: #fecf2f;
      font-size: 16px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
    &:-moz-placeholder{
      color: #fecf2f;
      font-size: 16px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
    &::-moz-placeholder{
      color: #fecf2f;
      font-size: 16px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
  }
}
.w_100{
  width: 100%;
  @media (min-width: 992px) {
    width: auto;
  }
}
.form_control_lg_lg {
  @media (min-width: 992px) {
    height: 50px;
    padding: 8px 16px;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  }
}
.footerBannerImg{
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/xmI2A2YPHdkHGViAW26w27QRcnsX9EdnqMNYpgR7lZVZopsY3ycMRkqOcXvCZsk8fhI09j9qbM2rvAzBEgnTTeo9DpfQh4mUrGcOLB4thlzPH2496r5bpAgirBKtc3hz.jpg) no-repeat;
  width: 100%;
  background-position: 30% 100% !important;
  background-size: cover !important;
  @media (min-width: 576px) {
    background-position: 50% 70% !important;
    background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/utQwKWxQLrvVbi0avlUogKazBWCHheWQhaJ6tgMtX2D7cU07ETkkVVXas3gACT1o5cHfn3cpMHJwfgGD5ZFooSw0a5ksvRtXoZsyq7inS2KJx4Lsy7vcB8Rcmn4QeT9s.jpg) no-repeat;
  }
  @media (min-width: 992px) {
    background-position: 50% 70% !important;
  }
}
.cartNum{
  bottom: 0px;
  right: 0px;
  width: 16px;
  height: 16px;
}
.cartImg{
  height: 120px;
  width: 120px;
  background-position: center !important;
  background-size: cover !important;
}
</style>
