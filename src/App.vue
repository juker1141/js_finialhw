<template>
  <div class="fontNotoSans position-relative h-100" id="app">
    <Loading v-if="isLoading"></Loading>
    <Toast/>
    <div v-if="isDarkShadyOn" @click="closeCart"
    class="bg-blackOP position-fixed h-100 w-100 zIndex_40 top_0"></div>
    <router-view class="position-relative d-flex flex-column h-100"/>
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
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    isDarkShadyOn() {
      return this.$store.state.isDarkShadyOn;
    },
  },
  methods: {
    closeCart() {
      // 點擊黑幕時關閉購物車視窗
      this.$store.dispatch('cartBlockisShow', false);
      setTimeout(() => {
        this.$store.dispatch('darkShadyChange', false);
      }, 200);
    },
  },
  created() {
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
  min-height: 100%;
}
</style>
