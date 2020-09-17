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
    <div class="container-fluid">
      <div class="row mb-7 px-lg-7">
        <div class="col-12">
          <div class="row">
            <div :key="item.id" class="col-12 col-md-6 col-lg-4
            mb-5 position-relative" v-for="item in products">
              <router-link class="text-decoration-none text-black"
              :to="`/product/${item.id}`">
                <div class="card cardSize border-0 m-0">
                  <div v-if="item.imageUrl" class="card-img-top rounded-0 cardImg"
                  :style="{ background: `url(${item.imageUrl[0]})` }">
                  </div>
                  <div v-if="!item.price || item.price != item.origin_price"
                  class="card-img-overlay d-flex
                  align-items-start justify-content-end p-3">
                  <div class="text-dark font-weight-bold
                  fz_14 bg-yellow p-1 rounded">On Sale</div></div>
                  <div class="card-body py-3 px-2
                  d-flex justify-content-between align-items-center">
                    <div class="w-100 d-flex justify-content-between align-items-start">
                      <div class="d-flex flex-column align-items-start">
                        <div class="text-left mb-1 fz_20">
                          {{ item.title }}
                        </div>
                        <div class="text-secondary">{{ item.category }}</div>
                      </div>
                      <div class="text-left fontRoboto">
                        <div v-if="!item.price || item.price === item.origin_price"
                        >NT {{ item.origin_price | toCurrency | DollarSign }}</div>
                        <div v-else class="d-flex align-items-center">
                          <del class="text-secondary">
                          NT {{ item.origin_price | toCurrency | DollarSign }}</del>
                          <div class="ml-3">NT {{ item.price | toCurrency | DollarSign }}</div>
                        </div>
                      </div>
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
    addToCart(id, quantity = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http.post(url, cart)
        .then((res) => {
          console.log(res);
          this.$emit('updateCart');
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
  height: 300px;
  background-position: center !important;
  background-size: cover !important;
  @media (min-width: 1200px) {
    height: 560px;
  }
}
.border_nm {
  border-width: 5px !important;
}
.productList_hover {
  color: #121212;
  &:hover {
    color: #121212;
    border-bottom: 3px solid #121212;
  }
}
</style>
