<template>
  <div class="w_max_100 p-0">
    <section
      id="carouselBannerControls"
      class="carousel slide mb-5 mb-lg-7"
      data-ride="carousel"
    >
      <div class="carousel-inner fontRaleway">
        <div class="carousel-item active">
          <div
            class="indexBannerImg indexBannerImg_1 text-black p-5 px-9 flex-lg-row
              d-flex flex-column align-items-center border-black border_nm border-top
              border-bottom border_lg_lg justify-content-center"
          >
            <div class="mr-lg-6 mt-5 mt-lg-0 mb-2 mb-lg-0">
              <div
                class="fz_36 fz_lg_64 text-center text-lg-left w-100 font-weight-bold"
              >
                開幕慶！
              </div>
              <div class="fz_lg_24 text-center text-lg-left w-100">
                即日起至 10/31 止<br />可使用 77 折折價卷
              </div>
            </div>
            <div
              class="border border-black bg-white border_nm px-2 fz_36 fz_lg_64"
            >
              HAPPY777
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="indexBannerImg indexBannerImg_2 border-black border-top
            border-bottom border_lg_lg border_nm"></div>
          <div class="carousel-caption carouselTitle_position">
            <h3 class="fz_36 fz_md_72 font-weight-bold font-italic">
              Do It Yourself !
            </h3>
          </div>
        </div>
        <div class="carousel-item">
          <div
            class="indexBannerImg indexBannerImg_3 border-black border-top
            border-bottom border_lg_lg border_nm"
          ></div>
          <div class="carousel-caption carouselTitle_position">
            <h3 class="fz_36 fz_md_64 font-weight-bold font-italic">
              Create It Yourself
            </h3>
          </div>
        </div>
        <div class="carousel-item">
          <div
            class="indexBannerImg indexBannerImg_4 border-black border-top
            border-bottom border_lg_lg border_nm"
          ></div>
          <div class="carousel-caption carouselTitle_position">
            <h3 class="fz_36 fz_md_72 font-weight-bold font-italic">
              Do It Yourself !
            </h3>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselBannerControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselBannerControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </section>
    <div class="container mb-5 mb-lg-7 text-black">
      <div class="row mb-5 mb-lg-7">
        <div class="col-12 col-lg-8">
          <h3 class="text-left m-0 pl-3">活動訊息</h3>
          <div class="text-left pt-5">
            <ul class="listStyle_none m-0 p-3">
              <li class="d-flex">
                <span class="mr-3">9/25</span>免運活動開跑，現在就開始逛逛吧
              </li>
              <hr />
              <li class="d-flex">
                <span class="mr-3">9/15</span>
                <div>
                  <span class="fontOrbitron">Hardware Store </span>
                  邀您一起做公益，消費滿2000元，就會捐贈其 5% 作為公益
                </div>
              </li>
              <hr />
              <li class="d-flex">
                <span class="mr-3">9/10</span>新品發布，更多好玩有趣的就在今天
              </li>
              <hr />
              <li class="d-flex">
                <span class="mr-4">9/6</span>
                <div>
                  <span class="fontOrbitron">Hardware Store </span>
                  線上商城開幕慶，全館 77 折，搶好康就趁現在！！
                </div>
              </li>
              <hr />
              <li class="d-flex">
                <span class="mr-3">8/25</span>
                <div>
                  <span class="fontOrbitron">Hardware Store </span>
                  線上商城準備中，現在加入，馬上抽好禮
                </div>
              </li>
              <hr />
            </ul>
          </div>
        </div>
        <div class="col-4 d-none d-lg-block">
          <h3 class="text-left text-black m-0 pb-5">新品報到</h3>
          <section
            id="carouselNewProductsControls"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner fontRaleway">
              <div class="carousel-item active cardSize">
                <div
                  class="h-100 w-100 bg-dark d-flex align-items-center justify-content-center"
                >
                  <h3 class="font-weight-bold fz_40 text-yellow">新品報到</h3>
                </div>
              </div>
              <div
                v-for="item in newProducts"
                :key="item.id"
                class="carousel-item cardSize"
              >
                <div
                  class="card border-yellow border_lg w-100 h-100"
                  style="width: 18rem"
                >
                  <img
                    :src="item.imageUrl[0]"
                    class="card-img-top img-fluid cardImg"
                    alt="..."
                  />
                  <div class="card-body bg-dark">
                    <div
                      class="d-flex justify-content-between align-items-center mb-5"
                    >
                      <div
                        class="card-title mb-0 text-white fz_24 font-weight-bold"
                      >
                        {{ item.title }}
                      </div>
                      <span class="badge badge-yellow fz_14 text-black">{{
                        item.category
                      }}</span>
                    </div>
                    <div class="card-text text-left text-white fz_24 mt-3">
                      <div
                        class="mt-6"
                        v-if="!item.price || item.price === item.origin_price"
                      >
                        NT {{ item.price | toCurrency | DollarSign }} 元
                      </div>
                      <div v-else>
                        <div class="fz_20 mb-2">
                          <s>NT {{ item.origin_price | toCurrency | DollarSign }}</s> 元
                        </div>
                        <div>
                          NT {{ item.price | toCurrency | DollarSign }} 元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselNewProductsControls"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselNewProductsControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </section>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mb-5 mb-lg-7">
        <div class="col-12 px-lg-7 text-left text-black">
          <h3 class="mb-5 container">作業手工具</h3>
          <Swiper :products="handTools"></Swiper>
        </div>
      </div>
    </div>
    <div class="d-flex w-100 footerNews_height position-relative mb-5 mb-lg-7">
      <div
        class="text-left zIndex_10 container footerNews_mt w-lg-50 text-white"
      >
        <div
          class="fz_20 fz_xl_24 px-3 pt-3 px-lg-5 pt-lg-5 pb-0 mb-0 bg-blackOP"
        >
          在地永續經營 <span class="d-none d-xl-inline-block">，</span
          ><br class="d-block d-xl-none" />
          <span class="fontOrbitron"> Hardware Store </span
          ><br class="d-block d-xl-none" />
          邀您一起做公益
        </div>
        <div class="fz_20 fz_xl_24 p-3 p-lg-5 pt-0 bg-blackOP">
          在 <span class="fontOrbitron">Hardware Store</span> 購買商品時
          <span class="d-none d-xl-inline-block">，</span
          ><br class="d-block d-xl-none" />
          只要您購物滿 2, 000 元<br />
          我們就將其訂單的 5% 捐贈給慈善基金會<br />
          <div class="fz_20 fz_xl_24 mt-3">買越多，愛心多更多！</div>
        </div>
      </div>
      <div class="footerNewsImg h-100 p-6"></div>
    </div>
    <div class="container">
      <div class="row mb-5 mb-lg-9">
        <div class="col-12 text-left text-black">
          <h3 class="mb-5">更多工具</h3>
          <div class="row mb-xl-7">
            <div class="col-12 col-lg-4 mb-4 mb-lg-0">
              <a
                href="#"
                class="text-decoration-none"
                @click="
                  category = '量測工具';
                  toTheCategory();
                "
              >
                <div
                  class="moreProductsImg moreProductsImg_1 position-relative"
                ></div>
                <div
                  class="moreProductsTitle position-absolute w-100 d-flex justify-content-start p-3"
                >
                  <div
                    class="text-black bg-white rounded-pill font-weight-bold
                    fz_lg_20 ml-3 py-1 px-3"
                  >
                    量測工具
                  </div>
                </div>
              </a>
            </div>
            <div class="col-12 col-lg-4 mb-4 mb-lg-0">
              <a
                href="#"
                class="text-decoration-none"
                @click="
                  category = '電動工具';
                  toTheCategory();
                "
              >
                <div
                  class="moreProductsImg moreProductsImg_2 position-relative"
                ></div>
                <div
                  class="moreProductsTitle position-absolute w-100 d-flex justify-content-start p-3"
                >
                  <div
                    class="text-black bg-white rounded-pill font-weight-bold
                    fz_lg_20 ml-3 py-1 px-3"
                  >
                    電動工具
                  </div>
                </div>
              </a>
            </div>
            <div class="col-12 col-lg-4 mb-4 mb-lg-0">
              <a
                href="#"
                class="text-decoration-none"
                @click="
                  category = '配件';
                  toTheCategory();
                "
              >
                <div
                  class="moreProductsImg moreProductsImg_3 position-relative"
                ></div>
                <div
                  class="moreProductsTitle position-absolute w-100 d-flex justify-content-start p-3"
                >
                  <div
                    class="text-black bg-white rounded-pill font-weight-bold
                    fz_lg_20 ml-3 py-1 px-3"
                  >
                    配件
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper.vue';

export default {
  data() {
    return {
      products: [],
      newProducts: [],
      handTools: [],
      category: '',
    };
  },
  components: {
    Swiper,
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url).then((res) => {
        this.products = res.data.data;
        this.shuffle(this.products);
        this.newProducts = this.products.slice(0, 5);
        this.products.forEach((item) => {
          if (item.category === '手工具') {
            this.handTools.push(item);
          }
        });
      });
    },
    shuffle(array) {
      /* eslint no-param-reassign: "error" */
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    toTheCategory() {
      this.$store.dispatch('categoryChange', this.category);
      setTimeout(() => {
        this.$router.push('/products');
      }, 500);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.footerNews_mt {
  margin-top: 50px;
  @media (min-width: 992px) {
    margin-top: 113px;
  }
}
.border_nm {
  border-width: 5px !important;
}
.border_lg {
  border-width: 10px !important;
}
.border_lg_lg {
  @media (min-width: 992px) {
    border-width: 10px !important;
  }
}
.footerNews_height {
  height: 400px;
  @media (min-width: 992px) {
    height: 500px;
  }
}
.carouselTitle_position {
  bottom: 27%;
}
.cardSize {
  @media (min-width: 992px) {
    height: 450px;
  }
}
.cardImg {
  @media (min-width: 992px) {
    height: 250px;
  }
}
.moreProductsTitle {
  top: 0;
  left: 0;
}
.moreProductsImg {
  height: 200px;
  width: 100%;
  background-position: center !important;
  background-size: cover !important;
  &_1 {
    background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/JKhUZ6vowAL4E5ds06fqsqO3CuHdcTNdYcOP28E4sns3fuZG8FBV2i02WtseCv8beAzudpoiKsS7XEm9WJN5MNpAGoxvxUUbMOY0WUpJfoZ8dU8xP9UqiJPzrvI3s4Xu.jpeg)
      no-repeat;
  }
  &_2 {
    background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/1kvf3WXGTqKDMP2PG5TJiYDHFmjws2l03PjDGYeqNmjKVotifRRp3lBhBap1Pq4A3eHo4KdCJ58v61lxrRDcbzGF4oAuRy8R0t9q0e6YbemMlGHfs1euJGYmQRmdxQe3.jpeg)
      no-repeat;
  }
  &_3 {
    background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/sd36mrTLSmkIgPhbG3AItU1cHyE3Bfjj3Ko7GQ4yBInTZ8FGyhwgLLLqevLGjVm8vNAyT3DZSaw3BpkHOBDvyRKk8YbZZQqSSYGCrsfZ8cdedu5GTwvqayu2grnf118G.webp)
      no-repeat;
  }
  @media (min-width: 768px) {
    height: 300px;
  }
  @media (min-width: 992px) {
    height: 360px;
  }
  @media (min-width: 1200px) {
    height: 400px;
  }
}
.footerNewsImg {
  position: absolute;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/FpXdjXq8W3OaVcefVCJr737h66WePd0W26Wh7uUNOpEPtMp7FbmcgslKIqnBNi79iQXpXZoSjDsg08BKpVklCYXPNB5RJVnZYfBji8cInm4pq9cSIx0iA7FRe2UmUhsk.jpg)
    no-repeat;
  width: 100%;
  right: 0;
  background-position: 50% 40% !important;
  background-size: cover !important;
}
.indexBannerImg {
  height: 250px;
  width: 100%;
  background-position: center !important;
  background-size: cover !important;
  @media (min-width: 992px) {
    height: 400px;
    background-position: top !important;
  }
}
.indexBannerImg_1 {
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Kp1zlrUogu4r1oYTZ8EofL3nyoKbQCsHNTJgyoBZu4N8qJ5MSHK2cQKP7FrKcd6cL2b0MoQT6vXqFom9IgnfX32wNkWA9SDho0yMdrPlhJNofADgfC6lQ0dRv9nrIvRM.jpeg)
    no-repeat;
  background-position: 50% 70% !important;
}
.indexBannerImg_2 {
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Nv6eBI7d2TyRawt2tmnOXExnW0qPvspajgPPSTs4wJAlsNGzwTAeu2CL20rnoQN743zQP6Ir6Xmh9BYstkaP08ag8rvAOD6TDFnyMEeW4RRKwM3mc2GTpeY7Tm27GEZd.jpg)
    no-repeat;
}
.indexBannerImg_3 {
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/bLQrxAxNw4usYtBCgXkhfUshMAn2SkeJztDOhoeMmBkf9NU1KLTo9hs0BHNGkcKMGDrm5e6O98XVxw65iAlbKC2qiquOGCby6cGMYe73NhTJc5H9v79s9U5GecoobjSs.webp)
    no-repeat;
}
.indexBannerImg_4 {
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/BDnIXPAtTnVdhVPFMtxqJuc9I9EFdQNcWenCxNJMKLREOK4x9RsqCuH1fUVTFpi07gWpkGf2Xf6FIBcQ8a24jxAaWVIZxwUFUqECUNwiGlxlb0YgSU9uwza53azaIRU5.jpg)
    no-repeat;
}
</style>
