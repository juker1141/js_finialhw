<template>
  <div>
    <section id="carouselBanner_sm" class="carousel slide mb-5 mb-lg-7"
    data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="bg-danger py-3 text-white fz_24">
          開幕限時特價，全品項77折，快輸入 ' HAPPY777 ' 吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-dark py-3 text-yellow fz_24">
            想要獲得更多活動訊息及優惠資訊嗎？快訂閱我們的會員電子報吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-danger py-3 text-white fz_24">
          開幕限時特價，全品項77折，快輸入 ' HAPPY777 ' 吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-dark py-3 text-yellow fz_24">
            想要獲得更多活動訊息及優惠資訊嗎？快訂閱我們的會員電子報吧！</div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="card-deck">
        <div class="row">
          <div :key="item.id" class="col-4 mb-3" v-for="item in products">
            <div class="card">
              <img :src="item.imageUrl" alt="..." class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
                <div class="card-text">
                  <p class="card-text" v-html="item.content">{{ item.content }}</p>
                  <div
                    class="h5"
                    v-if="!item.price || item.price === item.origin_price"
                  >售價 ${{ item.origin_price }}元</div>
                  <div v-else>
                    <del class="h6">原價 ${{ item.origin_price }}元</del>
                    <div class="h5">現在只要 ${{ item.price }}元</div>
                  </div>
                </div>
              </div>
              <router-link :to="`/product/${item.id}`">詳細資訊</router-link>
            </div>
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
      products: { imageUrl: [] },
    };
  },
  created() {
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`;
    this.$http.get(url).then((res) => {
      console.log(res);
      this.products = res.data.data;
    });
  },
};
</script>
