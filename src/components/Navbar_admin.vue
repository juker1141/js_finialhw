<template>
  <div class="navbar_adminPosition d-flex align-items-center h-100">
    <nav class="navbar_admin h-100 w-100 bg-adminSecondary">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <h1 class="m-0 mt-6 mb-8">
          <router-link
            class="navbar-brand fontOrbitron fz_20 fz_30_xl p-0 m-0 text-black"
            to="/admin"
          >
            <span class="d-md-block d-none">
              Hardware
              <br class="d-block d-lg-none" />Store
            </span>
            <span class="d-block d-md-none fz_30">H. S.</span>
            <br />
            <span class="fz_30 fz_50_xl">Admin</span>
          </router-link>
        </h1>
        <ul class="listStyle_none w-100 h-100 m-0 p-0 position-relative">
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black textDecoration_none d-flex align-items-center py-2"
              to="/admin"
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
              class="fz_20 text-black textDecoration_none d-flex align-items-center py-2"
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
              class="fz_20 text-black textDecoration_none d-flex align-items-center py-2"
              to="/admin/coupons"
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
              class="fz_20 text-black textDecoration_none d-flex align-items-center py-2"
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
              class="fz_20 text-black textDecoration_none d-flex align-items-center py-2"
              to="/admin/coupons"
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
              class="fz_20 text-black textDecoration_none d-flex align-items-center py-2"
              to="/admin/coupons"
            >
              <span class="material-icons mr-lg-3 pl-xl-7
              pl-lg-4 pl-0 border-0 fz_30">book_online</span>
              <span class="d-none d-lg-block border-0">模擬下單系統</span>
            </router-link>
          </li>
          <li
            class="pb-2 text-left font-weight-bold navbarList_hover d-flex
            justify-content-center justify-content-lg-start"
          >
            <router-link
              class="fz_20 text-black textDecoration_none d-flex align-items-center py-2"
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
    <div class="navbar_showBtn" @mousemove="navberHover()">
      <div class="bg-adminSecondary d-flex align-items-center
      justify-content-center d-lg-none">
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
      $('.navbar_showBtn').hover(() => {
        $('.navbar_showBtn').toggleClass(move);;
      });
    },
  },
};
</script>
