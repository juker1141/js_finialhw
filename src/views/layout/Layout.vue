<template>
  <div class="position-relative">
    <button v-if="windowY >= 500" @click="goToTop" class="position-fixed btn d-flex
    goToTopBtn_position p-1 border-yellow border_5px bg-dark"
    type="button" id="goToTopBtn">
      <span class="material-icons text-yellow font-weight-bold fz_24">
      keyboard_arrow_up
      </span>
    </button>
    <div class="container d-flex justify-content-between
    align-items-center my-3 px-2 position-relative">
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
            <router-link class="text-black px-3 mr-2 text-decoration-none list_hover"
            to="/products">Products</router-link>
          </li>
          <li class="py-3 py-lg-0">
            <router-link class="text-black px-3 mr-2 text-decoration-none list_hover"
            to="/cart">Cart</router-link>
          </li>
          <li class="py-3 py-lg-0">
            <router-link class="text-black px-3 mr-2 text-decoration-none list_hover"
            to="/about">Orders</router-link>
          </li>
          <li class="py-3 py-lg-0">
            <router-link class="text-black px-3 mr-2 text-decoration-none list_hover"
            to="/about">About</router-link>
          </li>
          <li class="py-3 py-lg-0">
            <router-link
              class="text-black btn p-1 d-flex justify-content-center align-items-center"
              to="/login"
            >
              <span class="material-icons">person</span>
            </router-link>
          </li>
        </ul>
        <button
          class="text-black btn ml-2 p-1 d-flex justify-content-center align-items-center"
          type="button"
        >
          <span class="material-icons">shopping_cart</span>
        </button>
      </div>
    </div>
    <router-view />
    <div class="footerBannerImg p-5 p-lg-9 text-white d-flex flex-column align-items-center">
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
              <input type="text" class="form-control form_control bg-transparent border-yellow
              form_control_lg_lg fz_24" placeholder=" 請輸入您的 Email"
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
    <div class="bg-dark p-3 p-lg-5">
      <div class="container d-flex align-items-center justify-content-between">
        <div class="w_100">
          <div class="mb-3">
            <router-link
            class="fontOrbitron fz_30 text-yellow text-decoration-none"
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
                  <i class="fab fa-github-square fz_30"></i>
                </a>
              </li>
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-facebook-square fz_30"></i>
                </a>
              </li>
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-instagram-square fz_30"></i>
                </a>
              </li>
              <li>
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fas fa-envelope-square fz_30"></i>
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
                <i class="fab fa-github-square fz_30"></i>
              </a>
            </li>
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-facebook-square fz_30"></i>
              </a>
            </li>
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-instagram-square fz_30"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fas fa-envelope-square fz_30"></i>
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
    };
  },
  methods: {
    navbarShow() {
      $('.list_position').slideToggle('fast');
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
  },
  created() {
    this.navbarShow();
    this.goToTopBtnShow();
  },
};
</script>

<style lang="scss">
.goToTopBtn_position{
  bottom: 150px;
  right: 30px;
  z-index: 50;
}
.border_5px{
  border-width: 5px;
}
.list_position {
  top: 50px;
  width: 100%;
  left: 0;
  display: none;
  z-index: 30;
  @media (min-width: 768px) {
    top: 60px;
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
.list_hover:hover{
}
.form-control{
  &::-webkit-input-placeholder{
    color: #fecf2f;
  }
  &:-moz-placeholder{
    color: #fecf2f;
  }
  &::-moz-placeholder{
    color: #fecf2f;
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
    background: url(https://images.pexels.com/photos/3930091/pexels-photo-3930091.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat;
  }
  @media (min-width: 992px) {
    background-position: 50% 70% !important;
  }
}
</style>
