<template>
  <div class="text-white text_xl_black position-relative h_100vh">
    <div class="container d-flex flex-column align-items-center align-items-xl-start">
      <div class="my-3 w-100 d-flex justify-content-start">
        <router-link
          class="fontOrbitron fz_30 text-white text_xl_black text-decoration-none"
          to="/home"
        >Hardware Store</router-link>
      </div>
      <div class="bg-grayOP bg_xl_transparent p-5 p-xl-0 text-center text-xl-left payDone_mt_auto">
        <div class="fz_48 mb-5 font-weight-bold">付款成功！！</div>
        <div class="fz_24 mb-5">我們將馬上為您出貨
        <span class="d-none d-xl-inline-block">，</span>
        <br class="d-block d-xl-none">希望您會喜歡我們的商品！</div>
        <div>接著您可以至
        <router-link class="mr-2" to="/home">首頁</router-link>
        ><router-link class="ml-2" to="/order">我的訂單</router-link> 中查詢運送狀況</div>
      </div>
      <router-link class="text-white bg-black
      text-decoration-none fz_24 px-9 py-2 mt-9 mt-xl-7 font-weight-bold"
      to="/products">繼續購物</router-link>
    </div>
    <div class="payDoneImg h_100vh position-absolute"></div>
  </div>
</template>

<style lang="scss">
.text_xl_black{
  @media (min-width: 1200px) {
    color: #121212 !important;
  }
}
.bg_xl_transparent{
  @media (min-width: 1200px) {
    background: transparent !important;
  }
}
.payDone_mt_auto{
  margin-top: 10%;
}
.payDoneImg {
  background: url(https://images.unsplash.com/photo-1580401884879-27237ae4468e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2978&q=80) no-repeat;
  top: 0;
  right: 0;
  width: 100%;
  z-index: -10;
  background-position: 35% 10% !important;
  @media (min-width: 1200px) {
    width: 50%;
    background-position: 30% 10% !important;
  }
}
</style>
