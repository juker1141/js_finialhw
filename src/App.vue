<template>
  <div class="fontNotoSans" id="app">
    <Loading v-if="isLoading"></Loading>
    <router-view />
  </div>
</template>

<script>

import Loading from './components/Loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.$bus.$on('loadingChange', (state) => {
      this.isLoading = state;
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

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
