<template>
  <div class="w_max_100 p-0">
    <section id="carouselBannerControls" class="carousel slide mb-7"
    data-ride="carousel">
      <div class="carousel-inner fontRaleway">
        <div class="carousel-item active">
          <div class="indexBannerImg indexBannerImg_1"></div>
          <div class="carousel-caption carouselTitle_position">
            <h3 class="fz_36 fz_md_72 font-weight-bold font-italic">Do It Yourself !</h3>
          </div>
        </div>
        <div class="carousel-item">
          <div class="indexBannerImg indexBannerImg_2"></div>
          <div class="carousel-caption carouselTitle_position">
            <h3 class="fz_36 fz_md_72 font-weight-bold font-italic">
            Create It Yourself !</h3>
          </div>
        </div>
        <div class="carousel-item">
          <div class="indexBannerImg indexBannerImg_3"></div>
          <div class="carousel-caption carouselTitle_position">
            <h3 class="fz_36 fz_md_72 font-weight-bold font-italic">Do It Yourself !</h3>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselBannerControls"
      role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselBannerControls"
      role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </section>
    <div class="container mb-8">
      <div class="row mb-7">
        <div class="col-8">
          <h3 class="text-left">活動訊息</h3>
          <div class="h_25 text-left pt-5">
            <ul class="listStyle_none m-0 p-3">
              <li><span class="mr-3">9/25</span>免運活動開跑，現在就開始逛逛吧<hr></li>
              <li><span class="mr-3">9/15</span>
              <span class="fontOrbitron">Hardware Store </span>邀您一起做公益，消費滿2000元 ...<hr></li>
              <li>
              <span class="mr-3">9/10</span>新品發布，更多好玩有趣的就在今天
              <hr></li>
              <li><span class="mr-4">9/6</span><span class="fontOrbitron">Hardware Store </span>
              線上商城開幕慶，全館77折，搶好康就趁現在！！<hr></li>
              <li><span class="mr-3">8/25</span><span class="fontOrbitron">Hardware Store </span>
              線上商城準備中，現在加入，馬上抽好禮<hr></li>
            </ul>
          </div>
        </div>
        <div class="col-4">
          <h3 class="text-left m-0 pb-5">新品報到</h3>
          <section id="carouselNewProductsControls" class="carousel slide mb-7"
          data-ride="carousel">
            <div class="carousel-inner fontRaleway">
              <div class="carousel-item active cardSize">
                <div class="h-100 w-100 bg-dark
                d-flex align-items-center justify-content-center">
                  <h3 class="font-weight-bold font-italic text-yellow">新品報到</h3>
                </div>
              </div>
              <div v-for="item in newProducts" :key="item.id" class="carousel-item cardSize">
                <div class="card border-0 w-100 h-100" style="width: 18rem;">
                  <img :src="item.imageUrl[0]" class="card-img-top img-fluid cardImg" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselNewProductsControls"
            role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselNewProductsControls"
            role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </section>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <div class="h_25 featuresImg featuresImg_1"></div>
        </div>
        <div class="col-6">
          <div class="h_25 p-5 text-left d-flex align-items-start
          flex-column justify-content-center">
            <h4 class="mb-4">在地經營超過三十年</h4>
            <p>從 1990 年代起， <span class="fontOrbitron">Hardware Store</span> 就開始經營五金批發<br>
            對於各品牌的手工具、電動工具、氣動工具更是瞭若指掌<br>
            若想了解更多資訊，歡迎直接聯繫我們！</p>
            <div class="w-100 text-right"><a href="#" class="mr-3">了解更多</a></div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <div class="h_25 p-5 text-left d-flex align-items-start
          flex-column justify-content-center">
            <h4 class="mb-4">物美價廉</h4>
            <p><span class="fontOrbitron">Hardware Store</span> 有超多你想不到的商品<br>
            還有時不時舉辦的活動折扣，怎麼買都划算！！<br>
            你看過我們的商品了嗎？快去看看吧！！！</p>
            <div class="w-100 text-right"><a href="#" class="mr-3">了解更多</a></div>
          </div>
        </div>
        <div class="col-6">
          <div class="h_25 featuresImg featuresImg_2"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="h_25 featuresImg featuresImg_3"></div>
        </div>
        <div class="col-6">
          <div class="h_25 p-5 text-left d-flex align-items-start
          flex-column justify-content-center">
            <h4 class="mb-4">快速又方便</h4>
            <p>在 <span class="fontOrbitron">Hardware Store</span> 買東西，今天訂，後天到！<br>
            我們支持多種支付方式，讓你不被現實的距離所拘束！</p>
            <div class="w-100 text-right"><a href="#" class="mr-3">了解更多</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex w-100 h_500 position-relative mb-8">
      <div class="text-left zIndex_10 mt_113 ml-9 text-white">
        <h2 class="fz_36 px-5 pt-5 pb-0 mb-0 bg-grayOP">在地永續經營，
        <span class="fontOrbitron"> Hardware Store</span> 邀您一起做公益</h2>
        <p class="fz_24 p-5 pt-0 bg-grayOP">在 <span class="fontOrbitron">Hardware Store</span> 購買商品時
        ，只要您購物滿2000元<br>
        我們就將其訂單的 5% 捐贈給慈善基金會<br>
        <span class="fz_30 mt-3">買越多，愛心多更多！</span></p>
      </div>
      <div class="footerNewsImg h-100 p-6 mr-9"></div>
    </div>
    <div class="footerBannerImg p-9 text-white d-flex flex-column align-items-center">
      <div class="container">
        <div class="row w-100">
          <div class="col-7 text-left">
            <h2 class="mb-6">想要獲得更多活動訊息及優惠資訊嗎？<br></h2>
            <h2 class="mb-7">趕快訂閱我們吧！</h2>
            <div class="input-group mb-3">
              <input type="text" class="form-control form-control-lg fz_24" placeholder=""
              aria-label="Example text with button addon" aria-describedby="button-addon1">
              <div class="input-group-prepend">
                <button class="btn btn-yellow fz_24 font-weight-bold px-5 rounded-right
                text-black" type="button"
                id="button-addon1">訂閱每月電子報</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      newProducts: [],
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data;
          this.shuffle(this.products);
          this.newProducts = this.products.slice(0, 5);
        });
    },
    shuffle(array) {
      /* eslint no-param-reassign: "error" */
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.h_25{
  height: 400px;
}
.mt_113{
  margin-top: 113px;
}
.h_500{
  height: 500px;
}
.carouselTitle_position{
  bottom: 27%;
}
.cardSize{
  height: 450px;
}
.cardImg{
  width: 100%;
  height: 260px;
}
.footerNewsImg{
  position: absolute;
  background: url(https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) no-repeat;
  width: 70%;
  margin-left: 25%;
  background-position: 50% 30% !important;
  background-size: cover !important;
}
.footerBannerImg{
  background: url(https://images.pexels.com/photos/3930091/pexels-photo-3930091.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat;
  width: 100%;
  background-position: 50% 70% !important;
  background-size: cover !important;
}
.indexBannerImg {
  height: 400px;
  width: 100%;
  background-position: top !important;
  background-size: cover !important;
}
.featuresImg{
  height: 400px;
  width: 100%;
  background-size: cover !important;
}
.featuresImg_1{
  background-position: 25% 75% !important;
  background: url(https://images.unsplash.com/photo-1596274646294-748054a0e300?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80) no-repeat;
  -webkit-filter: sepia(.6);
}
.featuresImg_2{
  background-position: center !important;
  background: url(https://images.unsplash.com/photo-1542992015-4a0b729b1385?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1367&q=80) no-repeat;
  -webkit-filter:saturate(1);
}
.featuresImg_3{
  background-position: 25% 75% !important;
  background: url(https://images.pexels.com/photos/4393533/pexels-photo-4393533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat;
}
.indexBannerImg_1 {
  background: url(https://images.unsplash.com/photo-1502343019212-cc6a09783255?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)
    no-repeat;
}
.indexBannerImg_2 {
  background: url(https://images.pexels.com/photos/3773836/pexels-photo-3773836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
    no-repeat;
}
.indexBannerImg_3 {
  background: url(https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80)
    no-repeat;
}
</style>
