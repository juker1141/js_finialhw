<template>
  <swiper class="swiper" :options="swiperOption">
    <template v-for="(item, index) in products">
      <swiper-slide v-if="item.id !== id" :key="index">
        <a href="#" class="text-decoration-none h-100 w-100 text-black"
        @click.prevent="addSessionStorage(item, item.id); goToProduct(item.id)">
          <div class="card cardSize border-0 m-0">
            <div @click="update" class="overflow-hidden"
            >
              <div class="card-img-top rounded-0 swiperImg" v-if="item.imageUrl"
              :style="{ background: `url(${item.imageUrl[0]})` }"></div>
            </div>
            <div v-if="!item.price || item.price != item.origin_price"
            class="position-absolute salePosition p-2 p-xl-3">
              <div class="text-dark font-weight-bold
              fz_12 fz_lg_16 bg-yellow px-2 rounded-pill">On Sale</div>
            </div>
            <div class="card-body mt-1 p-1 py-lg-3 px-lg-2
            d-flex justify-content-between align-items-center">
              <div class="w-100 d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column align-items-start">
                  <div class="text-left mb-1 fz_12 fz_lg_16 fz_xl_20">
                    {{ item.title }}
                  </div>
                  <div class="text-secondary fz_12 fz_lg_16">{{ item.category }}</div>
                </div>
                <div class="text-left fontRoboto fz_12 fz_lg_16">
                  <div v-if="!item.price || item.price === item.origin_price"
                  >NT {{ item.origin_price | toCurrency | DollarSign }}</div>
                  <div v-else class="d-flex flex-column
                  align-items-end">
                    <del class="text-secondary">
                    NT {{ item.origin_price | toCurrency | DollarSign }}</del>
                    <div class="ml-md-3 ml-lg-0">
                    NT {{ item.price | toCurrency | DollarSign }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </swiper-slide>
    </template>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  name: 'swiper-example-free-mode',
  title: 'Free mode / No fixed positions',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['products', 'id'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        freeMode: true,
      },
      recentlyViewedProducts: [],
    };
  },
  methods: {
    update() {
      this.$emit('update');
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
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: 50% !important;
  margin-right: 20px;
  height: 200px;
  @media (min-width: 768px) {
    width: 40% !important;
    height: 250px;
  }
  @media (min-width: 992px) {
    width: 40% !important;
    height: 400px;
    margin-right: 30px;
  }
  @media (min-width: 1200px) {
    width: 35% !important;
    height: 400px;
  }
  @media (min-width: 1536px) {
    width: 25% !important;
    height: 400px;
  }
}
.swiperImg{
  height: 120px;
  width: 100%;
  transform:scale(1);
  transition: all .5s ease-out;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  @media (min-width: 768px) {
    height: 200px;
  }
  @media (min-width: 992px) {
    height: 300px;
  }
  &:hover {
    filter:opacity(.7);
    transform:scale(1.1);
  }
}
</style>
