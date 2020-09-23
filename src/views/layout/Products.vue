<template>
  <div>
    <section id="carouselBanner_sm" class="carousel slide mb-5 mb-lg-7"
    data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="bg-danger py-3 text-white fz_lg_24">
          開幕限時特價，全品項77折，快輸入 ' HAPPY777 ' 吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-dark py-3 text-yellow fz_lg_24">
            想要獲得更多活動訊息及優惠資訊嗎？快訂閱我們的會員電子報吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-danger py-3 text-white fz_lg_24">
          開幕限時特價，全品項77折，快輸入 ' HAPPY777 ' 吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-dark py-3 text-yellow fz_lg_24">
            想要獲得更多活動訊息及優惠資訊嗎？快訂閱我們的會員電子報吧！</div>
        </div>
      </div>
    </section>
    <div class="container-fluid">
      <div class="w-100 d-flex justify-content-center my-5">
        <ul class="w-100 listStyle_none d-flex align-items-center
        justify-content-lg-center
        justify-content-between m-0 p-2 rounded">
          <li>
            <a href="#" @click.prevent="productsSelect = '全部商品'
            ; getProducts()"
            class="px-mg-3 px-lg-5 py-2 my-lg-2 text-decoration-none productList_hover">
              全部
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="productsSelect = '手工具'
            ; getProducts()"
            class="px-mg-3 px-lg-5 py-2 my-lg-2 text-decoration-none productList_hover">
              手工具
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="productsSelect = '量測工具'
            ; getProducts()"
            class="px-mg-3 px-lg-5 py-2 my-lg-2 text-decoration-none productList_hover">
              量測工具
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="productsSelect = '研磨工具'
            ; getProducts()"
            class="px-mg-3 px-lg-5 py-2 my-lg-2 text-decoration-none productList_hover">
              研磨工具
            </a>
          </li>
          <li class="">
            <a href="#" @click.prevent="productsSelect = '電動工具'
            ; getProducts()"
            class="px-mg-3 px-lg-5 py-2 my-lg-2 text-decoration-none productList_hover">
              電動工具
            </a>
          </li>
          <li class="">
            <a href="#" @click.prevent="productsSelect = '配件'
            ; getProducts()"
            class="px-mg-3 px-lg-5 py-2 my-lg-2 text-decoration-none productList_hover">
              配件
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mb-7 px-lg-7">
        <div class="col-12">
          <div class="row">
            <template v-for="item in products">
              <div :key="item.id" class="col-12 col-md-6 col-lg-4
              mb-5 position-relative isShowingProduct"
              v-show="productsSelect === '全部商品' || item.category === productsSelect">
                <a href="#" class="text-decoration-none text-black"
                @click.prevent="addSessionStorage(item, item.id)">
                  <div class="card position-relative cardSize border-0 m-0">
                    <div class="overflow-hidden"
                    >
                      <div class="card-img-top rounded-0 cardImg" v-if="item.imageUrl"
                      :style="{ background: `url(${item.imageUrl[0]})` }"></div>
                    </div>
                    <div v-if="!item.price || item.price != item.origin_price"
                    class="position-absolute salePosition p-3">
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
                </a>
                <div class="position-absolute">
                </div>
              </div>
            </template>
          </div>
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
      products: [],
      productsSelect: '全部商品',
      recentlyViewedProducts: [],
      pagination: {},
    };
  },
  methods: {
    getProducts(num = 1) {
      this.$bus.$emit('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url).then((res) => {
        this.$bus.$emit('loadingChange', false);
        this.products = res.data.data;
        this.pagination = {
          count: this.products.length,
          currentPage: 1,
          per_page: 9,
          total: 18,
          total_pages: Math.ceil(this.products.length / 9),
        };
        console.log(this.pagination);
      }).catch(() => {
        this.$bus.$emit('loadingChange', false);
      });
    },
    addSessionStorage(product, itemId) {
      if (sessionStorage.getItem('recentlyViewed')) {
        this.recentlyViewedProducts = (JSON.parse(sessionStorage.getItem('recentlyViewed')));
      }
      this.recentlyViewedProducts.push(product);
      const set = new Set();// 這邊取出暫存資料不重複的部分
      const result = this.recentlyViewedProducts
        .filter((item) => (!set.has(item.id) ? set.add(item.id) : false));
      // 將不重複的部分上傳至storage
      sessionStorage.setItem('recentlyViewed', JSON.stringify(result));
      this.$router.push(`/product/${itemId}`);
    },
  },
  created() {
    this.$bus.$on('productsCategory', (state) => {
      this.productsSelect = state;
    });
    setTimeout(() => {
      this.getProducts();
    }, 0);
  },
};
</script>

<style lang="scss">
.cardImg {
  width: 100%;
  height: 300px;
  transform:scale(1);
  transition: all .8s ease-out;
  background-position: center !important;
  background-size: cover !important;
  @media (min-width: 1200px) {
    height: 350px;
  }
  @media (min-width: 1400px) {
    height: 500px;
  }
  &:hover {
    -webkit-filter:opacity(.7);
    transform:scale(1.05);
  }
}
.salePosition{
  right: 0;
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
