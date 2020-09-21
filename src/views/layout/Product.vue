<template>
  <div>
    <div class="container text-black">
      <div class="d-flex justify-content-start mb-4 position-relative">
        <div class="row">
          <div class="col-12 col-lg-9">
            <img :src="product.imageUrl[0]" alt class="img-fluid" />
            <div v-if="!product.price || product.price != product.origin_price"
            class="card-img-overlay d-flex
            align-items-start justify-content-start p-3 mx-3">
            <div class="text-dark font-weight-bold
            fz_14 bg-yellow p-1 rounded">On Sale</div></div>
          </div>
          <div class="col-12 col-lg-5 h_lg_100 d-flex align-items-center
          position-relative position_lg_absolute productInfo">
            <div class="bg-white w-100 p-4 shadow">
              <div class="d-flex mb-1">
                <router-link class="mr-2" :to="`/home`">Home</router-link>>
                <a href="#" class="mx-2" @click.prevent="backToProducts">Products</a>>
                <router-link class="ml-2" :to="`/products`">
                {{ product.category }}</router-link>
              </div>
              <div class="text-left mb-2 fz_36 font-weight-bold">{{ product.title }}</div>
              <div class="text-right mb-3 fontRoboto fz_24 font-weight-bold">
                <div v-if="!product.price || product.price === product.origin_price">
                  NT{{ product.origin_price | toCurrency | DollarSign }}
                </div>
                <div v-else class="d-flex align-items-end flex-column">
                  <del class="text-secondary fz_16 font-weight-normal">
                    NT{{ product.origin_price | toCurrency | DollarSign }}
                  </del>
                  <div class="">NT{{ product.price | toCurrency | DollarSign }}</div>
                </div>
              </div>
              <div class="w-100 d-flex align-items-center">
                <div class="d-flex align-items-center justify-content-between bg-gray w-50 mr-4">
                  <button type="button" class="btn d-flex p-2"
                  @click="num --" :disabled="num === 1">
                    <span class="material-icons">
                    remove
                    </span>
                  </button>
                  <input type="number" min="1"
                  class="border-0 text-center w-50 bg-transparent pl-2" v-model="num">
                  <button type="button" class="btn d-flex p-2"
                  @click="num ++">
                    <span class="material-icons">
                    add
                    </span>
                  </button>
                </div>
                <button type="button" @click="addToCart" class="btn
                p-2 w-50 text-white bg-black rounded-0">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12 col-md-6 mb-3 mb-lg-0 col-lg-4 text-left">
          <div class="fz_24 mb-2">產品特色</div>
          <div>{{ product.content }}</div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 text-left">
          <div class="fz_24 mb-2">產品規格</div>
          <div>{{ product.description }}</div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mb-5">
        <div class="col-12 text-left px-lg-7">
          <h3 class="mb-5">作業手工具</h3>
          <Swiper :products="recentlyViewedProducts" :id="product.id"
          @update="windowReload"></Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .productInfo{
    right:0;
  }
  .position_lg_absolute{
    @media (min-width: 992px) {
      position: absolute !important;
    }
  }
  .h_lg_100{
    @media (min-width: 992px) {
      height: 100%;
    }
  }
</style>

<script>
/* global $ */

import Swiper from '../../components/Swiper.vue';

export default {
  data() {
    return {
      product: {
        imageUrl: [],
      },
      num: 1,
      category: '',
      recentlyViewedProducts: {},
    };
  },
  components: {
    Swiper,
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(url).then((res) => {
        this.$bus.$emit('loadingChange', false);
        this.product = res.data.data;
        this.category = res.data.data.category;
      }).catch(() => {
        this.$bus.$emit('loadingChange', false);
      });
    },
    addToCart(quantity = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: this.product.id,
        quantity: this.num,
      };
      this.$http.post(url, cart)
        .then(() => {
          this.$bus.$emit('message:push', '商品已加入購物車', 'success');
          this.$emit('updateCart');
        }).catch(() => {
          this.$bus.$emit('message:push', '購物車裡已有該商品', 'danger');
        });
    },
    backToProducts() {
      this.category = '全部商品';
      this.$router.push('/products');
    },
    windowReload() {
      setTimeout(() => {
        window.location.reload();
      }, 0);
    },
  },
  created() {
    this.$bus.$emit('loadingChange', true);
    this.getProduct();
    this.recentlyViewedProducts = JSON.parse(sessionStorage.getItem('recentlyViewed'));
    // if ( === 0) {

    // }
  },
  beforeDestroy() {
    this.$bus.$emit('productsCategory', this.category);
  },
};
</script>
