<template>
  <div>
    <!--<section id="carouselBanner_sm" class="carousel slide mb-5 mb-lg-7"
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
    </section>-->
    <ProductsNavbar/>
    <div class="container">
      <div class="card-deck">
        <div class="row mb-7">
          <div class="col-12 col-lg-2">
            <router-view/>
          </div>
          <div class="col-12 col-lg-10">
            <div class="row">
              <div :key="item.id" class="col-4 mb-5 position-relative" v-for="item in products">
                <router-link class="text-decoration-none text-black"
                :to="`/product/${item.id}`">
                  <div class="card cardSize border-0 m-0">
                    <img :src="item.imageUrl" alt="..." class="card-img-top rounded-0 cardImg" />
                    <div v-if="!item.price || item.price != item.origin_price"
                    class="card-img-overlay d-flex
                    align-items-start justify-content-end p-3">
                    <div class="text-dark font-weight-bold
                    fz_14 bg-yellow p-1 rounded">On Sale</div></div>
                    <div class="card-body p-2 d-flex justify-content-between align-items-center">
                      <div>
                        <div class="card-title text-left mb-1 font-weight-bold fz_20">
                        {{ item.title }}</div>
                        <div class="card-text text-left fontRoboto">
                          <div v-if="!item.price || item.price === item.origin_price"
                          >NT {{ item.origin_price | toCurrency | DollarSign }}</div>
                          <div v-else class="d-flex align-items-end">
                            <div class="mr-2">NT {{ item.price | toCurrency | DollarSign }}</div>
                            <del class="text-secondary fz_14">
                            NT {{ item.origin_price | toCurrency | DollarSign }}</del>
                          </div>
                        </div>
                      </div>
                      <div>
                        <a href="#" class="p-2" @click.prevent="show">
                          <span class="material-icons text-black fz_30">
                          add_shopping_cart
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div class="position-absolute">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination :pages="pagination" @update-pages="getProducts"/>
    </div>
  </div>
</template>

<script>
import ProductsNavbar from './ProductsNavbar.vue';

export default {
  data() {
    return {
      products: { imageUrl: [] },
      pagination: {},
    };
  },
  components: {
    ProductsNavbar,
  },
  methods: {
    getProducts(num = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${num}&paged=9`;
      this.$http.get(url).then((res) => {
        console.log(res);
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.cardImg {
  width: 100%;
  height: 220px;
}
.border_nm {
  border-width: 5px !important;
}
.productList_hover {
  color: #121212;
  &:hover {
    color: #121212;
    border-bottom: 3px solid #B2815D;
  }
}
</style>
