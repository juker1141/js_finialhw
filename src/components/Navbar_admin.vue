<template>
  <div class="navbarAdminPosition navbarAdminStyle d-flex
  align-items-center bg-adminSecondary h_100vh">
    <nav class="navbarAdmin h-100 bg-adminSecondary w-100">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <h1 class="m-0 mt-6 mb-8">
          <router-link
            class="navbar-brand fontOrbitron fz_20 fz_md_24 fz_xl_30 p-0 m-0 text-black"
            to="/admin"
          >
            <span class="d-md-block d-none">
              Hardware
              <br class="d-block d-lg-none" />Store
            </span>
            <span class="d-block d-md-none">H. S.</span>
            <br />
            <span class="fz_xl_48">Admin</span>
          </router-link>
        </h1>
        <ul class="listStyle_none w-100 h-100 m-0 p-0 position-relative">
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black text-decoration-none d-flex align-items-center py-2"
              to="/admin/home"
            >
              <span class="material-icons mr-lg-3 pl-xl-7
              pl-lg-4 pl-0 border-0 fz_30">home</span>
              <span class="d-none d-lg-block border-0">首頁</span>
            </router-link>
          </li>
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black text-decoration-none d-flex align-items-center py-2"
              to="/admin/products"
            >
              <span class="material-icons mr-lg-3 pl-xl-7
              pl-lg-4 pl-0 border-0 fz_30">list_alt</span>
              <span class="d-none d-lg-block border-0">產品列表</span>
            </router-link>
          </li>
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black text-decoration-none d-flex align-items-center py-2"
              to="/admin/orderlist"
            >
              <span class="material-icons mr-lg-3 pl-xl-7
              pl-lg-4 pl-0 border-0 fz_30">receipt_long</span>
              <span class="d-none d-lg-block border-0">訂單列表</span>
            </router-link>
          </li>
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black text-decoration-none d-flex align-items-center py-2"
              to="/admin/coupons"
            >
              <span
                class="material-icons mr-lg-3 pl-xl-7
                pl-lg-4 pl-0 border-0 fz_30"
              >local_activity</span>
              <span class="d-none d-lg-block border-0">優惠卷</span>
            </router-link>
          </li>
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black text-decoration-none d-flex align-items-center py-2"
              to="/admin/picturelibrary"
            >
              <span class="material-icons mr-lg-3 pl-xl-7
              pl-lg-4 pl-0 border-0 fz_30">photo_library</span>
              <span class="d-none d-lg-block border-0">圖片庫</span>
            </router-link>
          </li>
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black text-decoration-none d-flex align-items-center py-2"
              to="/admin/simulateorder"
            >
              <span class="material-icons mr-lg-3 pl-xl-7
              pl-lg-4 pl-0 border-0 fz_30">book_online</span>
              <span class="d-none d-lg-block border-0">模擬下單系統</span>
            </router-link>
          </li>
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start" @click="signout()"
          >
            <router-link
              class="fz_20 text-black text-decoration-none d-flex align-items-center py-2"
              to="/home"
            >
              <span class="material-icons mr-lg-3 pl-xl-7
              pl-lg-4 pl-0 border-0 fz_30">meeting_room</span>
              <span class="d-none d-lg-block border-0">登出</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="navbar_showBtn bg-adminSecondary d-flex align-items-center
      justify-content-center d-lg-none" @click="navberHover()">
      <div class="d-flex align-items-center
      justify-content-center">
        <span class="material-icons text-black">
          chevron_right
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {

  methods: {
    navberHover() {
      $('.navbarAdminPosition').toggleClass('move');
    },
    signout() {
      // 將cookie清空即為登出
      document.cookie = 'testToken=; expires=; path=/';
    },
  },
};
</script>

<style lang="scss">
.navbarAdminPosition {
  padding: 0;
  position: fixed;
  top: 0 !important;
  bottom: 0;
  width: 25%;
  left: -25%;
  z-index: 100;
  @media (min-width: 768px) {
    width: 20%;
    left: -20%;
  }
  @media (min-width: 992px) {
    width: 25%;
    left: 0;
  }
}
.navbarAdminStyle {
  @media (min-width: 992px) {
    overflow-y: auto;
  }
}
.navbarList_hover :hover {
  border-left: 6px solid #2a8356;
  padding: 0 40% 0 42%;
  @media (min-width: 992px) {
    border-left: 8px solid #2a8356;
    padding: 0;
  }
}
.main_admin {
  margin-left: 0;
  @media (min-width: 992px) {
    margin-left: 25%;
  }
}
.navbar_showBtn {
  padding: 0;
  position: absolute;
  z-index: 20;
  top: 50%;
  bottom: 50%;
  right: -24px;
  height: 100px;
  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
}
.move {
  left: 0 !important;
}
</style>
