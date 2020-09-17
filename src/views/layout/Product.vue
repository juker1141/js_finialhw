<template>
  <div class="container mt-5 text-black">
    <div class="d-flex justify-content-start mb-4 position-relative">
      <div class="row">
        <div class="col-9">
          <img :src="product.imageUrl[0]" alt class="img-fluid" />
          <div v-if="!product.price || product.price != product.origin_price"
          class="card-img-overlay d-flex
          align-items-start justify-content-start p-3 mx-3">
          <div class="text-dark font-weight-bold
          fz_14 bg-yellow p-1 rounded">On Sale</div></div>
        </div>
        <div class="col-5 h-100 d-flex align-items-center
        position-absolute productInfo">
          <div class="bg-white w-100 p-4 shadow">
            <div class="d-flex mb-1">
              <router-link class="mr-2" :to="`/home`">Home</router-link>>
              <router-link class="mx-2" :to="`/products`">Products</router-link>>
              <router-link class="ml-2" :to="`/products/handtools`">
              {{ product.category }}</router-link>
            </div>
            <div class="text-left mb-2 fz_48 font-weight-bold">{{ product.title }}</div>
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
              <button type="button" class="btn
              p-2 w-50 text-white bg-black rounded-0">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-4 text-left">
        <div class="fz_24 mb-2">產品特色</div>
        <div>{{ product.content }}</div>
      </div>
      <div class="col-4 text-left">
        <div class="fz_24 mb-2">產品規格</div>
        <div>{{ product.description }}</div>
      </div>
    </div>
    <router-link :to="`/products/${product.category}`">回到列表</router-link>
  </div>
</template>

<style lang="scss">
  .productInfo{
    right: 0;
  }
</style>

<script>
export default {
  data() {
    return {
      product: {
        imageUrl: [],
      },
      num: 1,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(url).then((res) => {
        console.log(res);
        this.product = res.data.data;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
