<template>
  <div class="text-black mb-5 mb-lg-7">
    <div class="py-5 py-md-7 py-lg-9 fz_30 fz_lg_48">歡迎來到<br class="d-lg-none">
    <span class="fontOrbitron ml-2">Hardware Store</span></div>
    <div class="row mb-3 mx-md-5 mx-lg-7">
      <div class="col-12 col-lg-8">
        <div class="aboutImg aboutImg_1"></div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="h-100 p-5 text-left d-flex align-items-start
        flex-column justify-content-center">
          <h4 class="mb-4">在地經營超過三十年</h4>
          <p>從 1990 年代起， <span class="fontOrbitron">Hardware Store</span> 就開始經營五金批發<br>
          對於各品牌的手工具、電動工具、氣動工具更是瞭若指掌<br>
          若想了解更多資訊，歡迎直接聯繫我們！</p>
          <div class="w-100 text-right"><a href="#" @click.prevent
          data-toggle="modal" data-target="#exampleModal" class="mr-3">了解更多</a></div>
        </div>
      </div>
    </div>
    <div class="row mb-3 flex-lg-row-reverse mx-md-5">
      <div class="col-lg-2">
      </div>
      <div class="col-12 col-lg-4">
        <div class="aboutImg aboutImg_2 shadow"></div>
      </div>
      <div class="col-12 col-lg-4 offset-lg-2 bg_lg_yellow">
        <div class="h-100 p-5 text-left d-flex align-items-start
        flex-column justify-content-center">
          <h4 class="mb-4">物美價廉</h4>
          <p><span class="fontOrbitron">Hardware Store</span> 有超多你想不到的商品<br>
          還有超多意想不到的活動折扣，怎麼買都划算！！<br>
          你看過我們的商品了嗎？快去看看吧！！！</p>
          <div class="w-100 text-right"><a href="#" @click.prevent class="mr-3">了解更多</a></div>
        </div>
      </div>
    </div>
    <div class="row flex-lg-row-reverse mx-md-5 mx-lg-7">
      <div class="col-12 col-lg-8">
        <div class="aboutImg aboutImg_3"></div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="h-100 p-5 text-left d-flex align-items-start
        flex-column justify-content-center">
          <h4 class="mb-4">快速又方便</h4>
          <p>在 <span class="fontOrbitron">Hardware Store</span> 買東西，今天訂，後天到！<br>
          我們支持多種支付方式，讓你不被現實的距離所拘束！</p>
          <div class="w-100 text-right"><a href="#" @click.prevent class="mr-3">了解更多</a></div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered w_max_md_80" role="document">
      <div class="modal-content bg-blackOP text-white">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="exampleModalLabel"></h5>
          <button type="button" class="btn
          m-0 p-0 d-flex align-items-center close opacity_1"
          data-dismiss="modal" aria-label="Close">
            <span class="material-icons text-white">clear</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row mx-5">
            <div class="col-7">
              <div class="d-flex">
                <div class="w-50 mr-3">
                  <div class="h-100 d-flex flex-column">
                    <div class="h-75 w-100 mb-3">
                      <div class="h-100 aboutUsImg aboutUsImg_2"></div></div>
                    <div class="h-25 w-100">
                      <div class="h-100 aboutUsImg aboutUsImg_3"></div></div>
                  </div>
                </div>
                <div class="w-50"><div class="h_550px aboutUsImg aboutUsImg_1"></div></div>
              </div>
            </div>
            <div class="col-5 h_550px">
              <div class="d-flex h-100 flex-column justify-content-between">
                <div class="d-flex h-100 flex-column justify-content-center align-items-center">
                  <div class="mb-3 fz_24">從 1990 年代起</div>
                  <div class="mb-3"><span class="fontOrbitron">Hardware Store</span> 就在高雄發跡</div>
                  <div class="mb-3">從一開始10坪大的五金行做到現在的五金批發業</div>
                  <div class="mb-3">就在今年也加入網路這個大家族了！</div>
                  <div class="mb-3">專門販售各品牌的手工具</div>
                  <div class="mb-3">電動工具、氣動工具以及其配件、耗材</div>
                  <div class="mb-3">我們也常配合企業採購及政府標案</div>
                  <div class="mb-3">如需大量採購煩請填寫以下表單</div>
                  <div>我們將會在最短時間內與您聯繫，謝謝！</div>
                </div>
                <div class="d-flex align-items-center justify-content-end">
                  <div class="btn text-white border-white rounded-0 d-flex align-items-center
                  p-2 px-5 formBtn_hover">
                    填寫表單
                    <span class="material-icons fz_24 pl-2 text-black d-none formBtn_hover_arrow">
                    navigate_next
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style lang="scss">
.mt_lg_-7{
  margin-top: -64px;
}
.bg_lg_yellow{
  @media (min-width: 992px) {
    background: #fecf2f;
  }
}
.aboutImg{
  width: 100%;
  background-size: cover !important;
}
.aboutImg_1{
  background-position: 25% 75% !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/BIzqAYnOJ9VVk2wUTGxVFyXvUVGvm52beZUQW70jAvDwSHXDLvyjek62b2CvLl7gIlKAHEsOn3sORffJHPVIZ2B0QZkyL2GdTU39A0cgmUMAWyOJ0OHezA1iqYAipAYf.jpg) no-repeat;
  filter: sepia(.6);
  height: 250px;
  @media (min-width: 992px) {
    height: 550px;
  }
}
.aboutImg_2{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/ofBcUDlx03tTlPUA43VtJ1qRJ8jZh56cFBukpYKEe0llmcf4NYINFnllB3YWviTyt4UO0g2B05arlzJeLioAMT5WVzXDKeOHNPQcbImgjWjo5aUCGaDEjYqfbGRwwW08.jpg) no-repeat;
  filter:saturate(1);
  height: 250px;
  @media (min-width: 992px) {
    height: 350px;
  }
}
.aboutImg_3{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/UaIIctwp56XoiJ9G8nFklzl6CLaeY4dY4w7ysDOUbyKyjWtSBK0bn6OMlRKfU7t77ygkEn7dtB1KUzVfSPpcyU3c6wEG80WXDlRgu3bKjeaEsgCrZsZaLjxr5i2oji29.jpeg) no-repeat;
  height: 250px;
  @media (min-width: 992px) {
    height: 550px;
  }
}
.aboutUsImg{
  width: 100%;
  background-size: cover !important;
}
.aboutUsImg_1{
  background-position: 50% 75% !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/BIzqAYnOJ9VVk2wUTGxVFyXvUVGvm52beZUQW70jAvDwSHXDLvyjek62b2CvLl7gIlKAHEsOn3sORffJHPVIZ2B0QZkyL2GdTU39A0cgmUMAWyOJ0OHezA1iqYAipAYf.jpg) no-repeat;
  filter: sepia(.6);
}
.aboutUsImg_2{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/8yGbq2NuwZnfADDZSayJYILMsnHoDGAvEcnRmaJO8yarICrgiHwPhERBUggeuxiV5WtJYiXKJENstxWrwEtVz7TIyRcR5eCaNsZFuZUEnnXXT3WPbI24NZ3Wk63h0Tl9.jpg) no-repeat;
}
.aboutUsImg_3{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9BjrmSggbENmkk9k4IxX6lSsSlvZV7FZheaZhbfznaxHyFkK01AWV4jPu655fDTmCQts6DmxfMuJOe53XSrEahRKb1ArIaBYHL4iJ9rc2nsPOQ7m0RDL5FUzqwH3aWX7.jpg) no-repeat;
}
.formBtn_hover:hover{
  color: #000 !important;
  background: #fff;
  .formBtn_hover_arrow{
    display: inline-block !important;
  }
}

</style>
