<template>
  <div class="fontNotoSans position-relative" id="app">
    <Loading v-if="isLoading"></Loading>
    <Toast/>
    <div v-if="darkShadyOn" @click="closeCart"
    class="bg-grayOP position-fixed h-100 w-100 zIndex_40 top_0"></div>
    <router-view class="position-relative"/>
  </div>
</template>

<script>

import Loading from '@/components/Loading.vue';
import Toast from '@/components/Toasts.vue';

export default {
  components: {
    Loading,
    Toast,
  },
  data() {
    return {
      darkShadyOn: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    closeCart() {
      // 點擊黑幕時關閉購物車視窗
      this.$bus.$emit('cartBlockIsShow', false);
      setTimeout(() => {
        this.darkShadyOn = false;
      }, 200);
    },
  },
  created() {
    // this.$bus.$on('loadingChange', (state) => {
    //   this.isLoading = state;
    // });
    this.darkShadyOn = false;
    this.$bus.$on('darkShadyChange', (state) => {
      this.darkShadyOn = state;
    });
    window.addEventListener('storage', (event) => {
      this.$store.replaceState({ ...this.$store.state, ...JSON.parse(localStorage.getItem('store')) });
    });
  },
};
</script>

<style lang="scss">
@import './assets/scss/all.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
