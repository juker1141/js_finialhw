<template>
  <div class="container h_100vh">
    <navbar class="d-flex justify-content-between align-items-center my-3 px-2 position-relative">
      <button class="btn p-1 justify-content-between align-items-center d-flex d-lg-none"
      type="button" @click="navbarShow">
        <span class="material-icons">menu</span>
      </button>
      <router-link
        class="fontOrbitron fz_30 text-black text-decoration-none"
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
            to="/about">About</router-link>
          </li>
        </ul>
        <button
          class="text-black btn ml-2 p-1 d-flex justify-content-center align-items-center"
          type="button"
        >
          <span class="material-icons">shopping_cart</span>
        </button>
        <router-link
          class="text-black btn p-1 d-flex justify-content-center align-items-center"
          to="/login"
        >
          <span class="material-icons">person</span>
        </router-link>
      </div>
    </navbar>
    <hr />
    <router-view class="container" />
  </div>
</template>

<script>
/* global $ */

export default {
  methods: {
    navbarShow() {
      $('.list_position').slideToggle('fast');
    },
  },
  created() {
    this.navbarShow();
  },
};
</script>

<style lang="scss">
.list_position {
  top: 62px;
  width: 100%;
  left: 0;
  display: none;
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
</style>
