<template>
  <div class="text-black mb-5 mb-lg-7">
    <div class="py-5 py-md-7 py-lg-9 fz_30 fz_lg_48">歡迎來到<br class="d-lg-none">
    <span class="fontOrbitron ml-2">Hardware Store</span></div>
    <div class="row mb-3 mx-md-5 mx-lg-7">
      <div class="col-12 col-lg-8">
        <div class="featuresImg featuresImg_1"></div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="h-100 p-5 text-left d-flex align-items-start
        flex-column justify-content-center">
          <h4 class="mb-4">在地經營超過三十年</h4>
          <p>從 1990 年代起， <span class="fontOrbitron">Hardware Store</span> 就開始經營五金批發<br>
          對於各品牌的手工具、電動工具、氣動工具更是瞭若指掌<br>
          若想了解更多資訊，歡迎直接聯繫我們！</p>
          <div class="w-100 text-right"><a href="#" @click.prevent class="mr-3">了解更多</a></div>
        </div>
      </div>
    </div>
    <div class="row mb-3 flex-lg-row-reverse mx-md-5">
      <div class="col-lg-2">
      </div>
      <div class="col-12 col-lg-4">
        <div class="featuresImg featuresImg_2 shadow"></div>
      </div>
      <div class="col-12 col-lg-4 offset-lg-2 bg_lg_gray">
        <div class="h-100 p-5 text-left d-flex align-items-start
        flex-column justify-content-center">
          <h4 class="mb-4">物美價廉</h4>
          <p><span class="fontOrbitron">Hardware Store</span> 有超多你想不到的商品<br>
          還有超多意想不到的活動折扣，怎麼買都划算！！<br>
          你看過我們的商品了嗎？快去看看吧！！！</p>
          <div class="w-100 text-right"><a href="#" @click.prevent class="mr-3">了解更多</a></div>
        </div>
      </div>
    </div>
    <div class="row flex-lg-row-reverse mx-md-5 mx-lg-7">
      <div class="col-12 col-lg-8">
        <div class="featuresImg featuresImg_3"></div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="h-100 p-5 text-left d-flex align-items-start
        flex-column justify-content-center">
          <h4 class="mb-4">快速又方便</h4>
          <p>在 <span class="fontOrbitron">Hardware Store</span> 買東西，今天訂，後天到！<br>
          我們支持多種支付方式，讓你不被現實的距離所拘束！</p>
          <div class="w-100 text-right"><a href="#" @click.prevent class="mr-3">了解更多</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mt_lg_-7{
  margin-top: -64px;
}
.bg_lg_gray{
  @media (min-width: 992px) {
    background: #fecf2f;
  }
}
.featuresImg{
  width: 100%;
  background-size: cover !important;
}
.featuresImg_1{
  background-position: 25% 75% !important;
  background: url(https://images.unsplash.com/photo-1596274646294-748054a0e300?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80) no-repeat;
  filter: sepia(.6);
  height: 250px;
  @media (min-width: 992px) {
    height: 550px;
  }
}
.featuresImg_2{
  background-position: center !important;
  background: url(https://images.unsplash.com/photo-1542992015-4a0b729b1385?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1367&q=80) no-repeat;
  filter:saturate(1);
  height: 250px;
  @media (min-width: 992px) {
    height: 350px;
  }
}
.featuresImg_3{
  background-position: center !important;
  background: url(https://images.pexels.com/photos/4393533/pexels-photo-4393533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat;
  height: 250px;
  @media (min-width: 992px) {
    height: 550px;
  }
}
</style>
