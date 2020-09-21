<template>
  <swiper class="swiper" :options="swiperOption">
    <template v-for="(item, index) in products">
      <swiper-slide v-if="item.id !== id" :key="index">
        <router-link class="text-decoration-none h-100 w-100 text-black"
        :to="`/product/${item.id}`">
          <div class="card cardSize border-0 m-0">
            <div v-if="item.imageUrl" @click="update" class="card-img-top rounded-0 swiperImg"
            :style="{ background: `url(${item.imageUrl[0]})` }">
            </div>
            <div v-if="!item.price || item.price != item.origin_price"
            class="card-img-overlay d-flex
            align-items-start justify-content-end p-3">
              <div class="text-dark font-weight-bold
              fz_14 bg-yellow p-1 rounded">On Sale</div>
            </div>
            <div class="card-body mt-1 p-1 py-lg-3 px-lg-2
            d-flex justify-content-between align-items-center">
              <div class="w-100 d-flex justify-content-between align-items-center">
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
    };
  },
  methods: {
    update() {
      this.$emit('update');
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: 80% !important;
  margin-right: 20px;
  height: 320px;
  @media (min-width: 768px) {
    height: 450px;
  }
  @media (min-width: 992px) {
    width: 50% !important;
    height: 550px;
  }
  @media (min-width: 1200px) {
    width: 40% !important;
    height: 550px;
  }
}
.swiperImg{
  height: 220px;
  width: 100%;
  background-position: center !important;
  background-size: cover !important;
  @media (min-width: 768px) {
    height: 350px;
  }
  @media (min-width: 992px) {
    height: 450px;
  }
}
</style>
