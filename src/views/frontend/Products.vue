<template>
  <div>
    <section id="carouselBanner_sm" class="carousel slide mb-5 mb-lg-7"
    data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="bg-yellow py-3 text-dark font-weight-bold fz_14 fz_lg_24">
            開幕限時特價，全品項77折，快輸入 ' HAPPY777 ' 吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-dark py-3 text-yellow font-weight-bold fz_14 fz_lg_24">
            想要獲得更多活動訊息及優惠資訊嗎？快訂閱我們的會員電子報吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-yellow py-3 text-dark font-weight-bold fz_14 fz_lg_24">
            開幕限時特價，全品項77折，快輸入 ' HAPPY777 ' 吧！</div>
        </div>
        <div class="carousel-item">
          <div class="bg-dark py-3 text-yellow font-weight-bold fz_14 fz_lg_24">
            想要獲得更多活動訊息及優惠資訊嗎？快訂閱我們的會員電子報吧！</div>
        </div>
      </div>
    </section>
    <div class="container-fluid">
      <div class="my-5">
        <ul class="w-100 listStyle_none d-flex align-items-center
        justify-content-lg-center
        justify-content-between m-0 p-2 rounded overflow_X_auto">
          <li>
            <a href="#" @click.prevent="productsSelect('全部商品')"
            :class="{ 'font-weight-bold' : category === '全部商品',
            'fz_20' : category === '全部商品' }"
            class="px-5 py-2 my-lg-2 text-decoration-none productList_hover">
              全部
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="productsSelect('手工具')"
            :class="{ 'font-weight-bold' : category === '手工具',
            'fz_20' : category === '手工具' }"
            class="px-5 py-2 my-lg-2 text-decoration-none productList_hover">
              手工具
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="productsSelect('量測工具')"
            :class="{ 'font-weight-bold' : category === '量測工具',
            'fz_20' : category === '量測工具' }"
            class="px-5 py-2 my-lg-2 text-decoration-none productList_hover">
              量測工具
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="productsSelect('研磨工具')"
            :class="{ 'font-weight-bold' : category === '研磨工具',
            'fz_20' : category === '研磨工具' }"
            class="px-5 py-2 my-lg-2 text-decoration-none productList_hover">
              研磨工具
            </a>
          </li>
          <li class="">
            <a href="#" @click.prevent="productsSelect('電動工具')"
            :class="{ 'font-weight-bold' : category === '電動工具',
            'fz_20' : category === '電動工具' }"
            class="px-5 py-2 my-lg-2 text-decoration-none productList_hover">
              電動工具
            </a>
          </li>
          <li class="">
            <a href="#" @click.prevent="productsSelect('配件')"
            :class="{ 'font-weight-bold' : category === '配件',
            'fz_20' : category === '配件' }"
            class="px-5 py-2 my-lg-2 text-decoration-none productList_hover">
              配件
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="row mb-7 px-lg-7">
        <div class="col-12">
          <div class="row">
            <template v-for="(item, index) in pagination.currentDataList">
              <div :key="index" class="col-6 px_1 col-md-6 px_md_15 col-lg-4
              mb-md-3 position-relative isShowingProduct">
                <a href="#" class="text-decoration-none text-black"
                @click.prevent="addSessionStorage(item, item.id); goToProduct(item.id)">
                  <div class="card position-relative cardSize border-0 m-0">
                    <div class="overflow-hidden"
                    >
                      <div class="card-img-top rounded-0 cardImg" v-if="item.imageUrl"
                      :style="{ background: `url(${item.imageUrl[0]})` }"></div>
                    </div>
                    <div v-if="!item.price || item.price != item.origin_price"
                    class="position-absolute salePosition p-2 p-lg-3">
                    <div class="text-dark font-weight-bold
                    fz_12 fz_lg_14 bg-yellow p-1 rounded">On Sale</div></div>
                    <div class="card-body pt-2 pt-lg-3 pb-1 py-md-3 px-2
                    d-flex justify-content-between align-items-center">
                      <div
                        class="w-100 d-flex flex-column flex-md-row
                        justify-content-between align-items-start"
                      >
                        <div class="d-flex flex-column align-items-start">
                          <div class="text-left mb-1">
                            {{ item.title }}
                          </div>
                          <div class="text-secondary fz_14">{{ item.category }}</div>
                        </div>
                        <div class="text-left fontRoboto w_100 w_md_auto d-flex
                        justify-content-end">
                          <div v-if="!item.price || item.price === item.origin_price"
                          >NT {{ item.origin_price | toCurrency | DollarSign }}</div>
                          <div v-else class="d-flex flex-column align-items-end">
                            <del class="text-secondary fz_14">
                            NT {{ item.origin_price | toCurrency | DollarSign }}</del>
                            <div class="ml-3 ml-lg-0 ml-xl-3">
                            NT {{ item.price | toCurrency | DollarSign }}</div>
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
    <div class="d-flex justify-content-center mb-9">
      <Pagination
        :pages="pagination"
        @update-pagelist="changePageList"
        @update-page="changePage"
      />
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  data() {
    return {
      products: [],
      category: '全部商品',
      recentlyViewedProducts: [],
      pagination: {
        count: 12,
        current_page: 1,
        currentDataList: [],
        totalDataList: [],
        total_pages: '',
      },
    };
  },
  computed: {
    productsCategory() {
      return this.$store.state.productsCategory;
    },
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?paged=200`;
      this.$http.get(url).then((res) => {
        this.$store.dispatch('loadingChange', false);
        this.products = res.data.data;
        this.pagination.totalDataList = this.products;
        this.pagination.total_pages = Math.ceil(this.pagination.totalDataList.length
        / this.pagination.count);
        this.initPageList();
        if (this.productsCategory) {
          this.productsSelect(this.productsCategory);
        }
      }).catch(() => {
        this.$store.dispatch('loadingChange', false);
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
    },
    goToProduct(itemId) {
      this.$router.push(`/product/${itemId}`);
    },
    productsSelect(category) {
      const vm = this.pagination;
      if (category === '全部商品') {
        this.category = category;
        vm.totalDataList = this.products;
        vm.total_pages = Math.ceil(vm.totalDataList.length
          / vm.count);
        vm.current_page = 1;
      } else {
        this.category = category;
        vm.totalDataList = this.products.filter((item) => item.category === category);
        vm.total_pages = Math.ceil(vm.totalDataList.length
          / vm.count);
        vm.current_page = 1;
      }
      this.initPageList();
    },
    initPageList() {
      this.pagination.currentDataList = [];
      for (let i = ((this.pagination.current_page - 1) * this.pagination.count);
        i < (this.pagination.current_page * this.pagination.count); i += 1) {
        if (this.pagination.totalDataList[i]) {
          this.pagination.currentDataList.push(this.pagination.totalDataList[i]);
        }
      }
    },
    changePage(page) {
      this.pagination.current_page = page;
      this.initPageList();
    },
    changePageList(state) {
      if (state === 'prev') {
        if (this.pagination.current_page > 1) {
          this.pagination.current_page -= 1;
        }
      } else if (state === 'next') {
        if (this.pagination.current_page < this.pagination.total_pages) {
          this.pagination.current_page += 1;
        }
      }
      this.initPageList();
    },
  },
  created() {
    this.$store.dispatch('loadingChange', true);
    setTimeout(() => {
      this.getProducts();
    }, 500);
  },
};
</script>

<style lang="scss">
.cardImg {
  width: 100%;
  height: 150px;
  transform:scale(1);
  transition: transform .8s ease-out;
  background-position: center !important;
  background-size: cover !important;
  @media (min-width: 500px) {
    height: 200px;
  }
  @media (min-width: 768px) {
    height: 230px;
  }
  @media (min-width: 1200px) {
    height: 250px;
  }
  @media (min-width: 1400px) {
    height: 270px;
  }
  &:hover {
    filter:saturate(1.5);
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
.overflow_X_auto {
  overflow-x: auto;
  overflow-y: hidden;
  height: 50px;
  white-space: nowrap;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>
