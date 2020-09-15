<template>
  <div class="fontNotoSans position-relative" id="app">
    <Loading v-if="isLoading"></Loading>
    <div v-if="darkShadyOn" @click="closeCart"
    class="bg-grayOP position-fixed h-100 w-100 zIndex_40 top_0"></div>
    <Toast />
    <router-view class="position-relative"/>
  </div>
</template>

<script>

import Loading from './components/Loading.vue';
import Toast from './components/Toasts.vue';

export default {
  /* eslint-disable */
  components: {
    Loading,
    Toast,
  },
  data() {
    return {
      isLoading: false,
      darkShadyOn: false,
    };
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
    this.$bus.$on('loadingChange', (state) => {
      this.isLoading = state;
    });
    this.darkShadyOn = false;
    this.$bus.$on('darkShadyChange', (state) => {
      this.darkShadyOn = state;
    });
    //在頁面載入時讀取sessionStorage裡的狀態資訊
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))));
    }
    //在頁面重新整理時將vuex裡的資訊儲存到sessionStorage裡
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state));
    });
      /* 註：此範例為複製全部sessionStorage內資料 */
    (() => {
      // 判斷當前頁面是否存在sessionStorage
      if (!window.sessionStorage.length) {
        // 若不存在則加上一個localStorage Item, Key = getSessionStorageData
        window.localStorage.setItem('getSessionStorageData', Date.now());
      }
      // 增加window監聽事件'storage'
      window.addEventListener('storage', (event) => {
        // 如果偵聽到的事件是key是getSessionStorageData
        if (event.key === 'getSessionStorageData') {
          // 再新增一個localstorage Item, key = sessionStorageData，value就是當前的sessionStorage
          window.localStorage.setItem('sessionStorageData', JSON.stringify(window.sessionStorage));
          // 刪除localstorage中key = sessionStorageData的item
          window.localStorage.removeItem('sessionStorageData');
        }
        // 如果偵聽到的事件是key是sessionStorageData, 且當前的sessionStorage是空的
        if (event.key === 'sessionStorageData' && !window.sessionStorage.length) {
          // 把sessionStorageData的資料parse出來
          const data = JSON.parse(event.newValue);
          // 賦值到當前頁面的sessionStorage中
          for (let key in data) {
            window.sessionStorage.setItem(key, data[key]);
          };
        }
      })
    })();
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
