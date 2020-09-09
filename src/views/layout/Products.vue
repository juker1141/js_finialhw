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
          <div class="col-12 col-lg-2">
            <ul class="listStyle_none m-0 p-2 rounded">
              <li class="mb-2">
                <a href="#" class="text-decoration-none d-flex
                align-items-center w-100 d-block productList_hover">
                  <i class="fas fa-tools mr-3"></i>全部商品
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-decoration-none d-flex
                align-items-center w-100 d-block productList_hover">
                  <i class="fas fa-screwdriver mr-3"></i>起子
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-decoration-none d-flex
                align-items-center w-100 d-block productList_hover">
                  <i class="fas fa-wrench mr-3"></i>板手
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-decoration-none d-flex
                align-items-center w-100 d-block productList_hover">
                  <i class="fas fa-ruler mr-3"></i>尺
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="text-decoration-none d-flex
                align-items-center w-100 d-block productList_hover">
                  <i class="fas fa-hammer mr-3"></i>鐵鎚
                </a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-10">
            <div class="row">
              <div :key="item.id" class="col-4 mb-3" v-for="item in products">
                <div class="card cardSize shadow border-0 m-0">
                  <img :src="item.imageUrl" alt="..." class="card-img-top cardImg" />
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <div class="card-text">
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
  methods: {
    getProducts(num = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${num}&paged=9`;
      this.$http.get(url).then((res) => {
        console.log(res);
        this.products = res.data.data;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.cardSize{
  height: 400px;
}
.cardImg{
  width: 100%;
  height: 250px;
}
.border_nm{
  border-width: 5px !important;
}
.productList_hover{
  height: 56px;
  color: #121212;
  position: relative;
  &:hover {
    font-weight: bold;
    font-size: 20px;
    color: #121212 !important;
  }
}
</style>
