<template>
  <div class="text-black mb-5 mb-lg-7">
    <div class="py-5 py-md-7 py-lg-9 fz_30_important fz_lg_48">歡迎來到<br class="d-lg-none">
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
          <div class="w-100 text-left mt-5"><a href="#" @click.prevent="changeAboutUs = true"
          data-toggle="modal" data-target="#aboutUsModal" class="mr-3
          btn border-black rounded-0 btn_black_hover">了解更多</a></div>
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
          <div class="w-100 text-left mt-5">
          <router-link to="/products"
          class="mr-3 btn border-black rounded-0
          btn_black_hover">去逛逛</router-link></div>
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
          <div class="w-100 text-left mt-5">
          <a href="#" data-toggle="modal" data-target="#payMethodModal"
          @click.prevent class="mr-3 btn border-black rounded-0 btn_black_hover">了解更多</a></div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="aboutUsModal" tabindex="-1" role="dialog"
    aria-labelledby="aboutUsModalLabel" aria-hidden="true">
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
            <div id="aboutUs" v-if="changeAboutUs" class="row mx-lg-5">
              <div class="col-12 col-lg-7">
                <div class="d-none d-lg-flex">
                  <div class="w-50 mr-3">
                    <div class="h-100 d-flex flex-column">
                      <div class="h-75 w-100 mb-3">
                        <div class="h-100 aboutUsImg aboutUsImg_2"></div></div>
                      <div class="h-25 w-100">
                        <div class="h-100 aboutUsImg aboutUsImg_3"></div></div>
                    </div>
                  </div>
                  <div class="w-50"><div class="h_lg_550px aboutUsImg aboutUsImg_1"></div></div>
                </div>
                <div class="d-block d-lg-none">
                  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="aboutUsImg_carousel aboutUsImg_1"></div>
                      </div>
                      <div class="carousel-item">
                        <div class="aboutUsImg_carousel aboutUsImg_2"></div>
                      </div>
                      <div class="carousel-item">
                        <div class="aboutUsImg_carousel aboutUsImg_3"></div>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls"
                    role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls"
                    role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-5 mt-3 h_lg_550px">
                <div class="d-flex h-100 flex-column justify-content-between">
                  <div class="d-flex h-100 flex-column justify-content-center
                  align-items-center align-items-lg-start mb-5 mb-lg-0">
                    <div class="mb-3 fz_24">從 1990 年代起</div>
                    <div class="mb-3"><span class="fontOrbitron">Hardware Store</span> 就在高雄發跡</div>
                    <div class="mb-3">從一開始 10 坪大的五金行</div>
                    <div class="mb-3">一直到到現在的五金批發業</div>
                    <div class="mb-3">就在今年也加入網路這個大家族了！</div>
                    <div class="mb-3">專門販售各品牌的手工具</div>
                    <div class="mb-3">電動工具、氣動工具以及其配件、耗材</div>
                    <div class="mb-3">我們也常配合企業採購及政府標案</div>
                    <div class="mb-3">如需大量採購煩請填寫以下表單</div>
                    <div>我們將會在最短時間內與您聯繫，謝謝！</div>
                  </div>
                  <div class="d-flex align-items-center justify-content-end">
                    <div id="goToForm" @click="changeAboutUs = !changeAboutUs"
                    class="btn text-white border-white rounded-0 d-flex align-items-center
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
            <div id="aboutUsForm" v-else class="row mx-5">
              <div class="col-12 col-lg-6 offset-lg-3">
                <h3 class="mb-5"><span class="fontOrbitron">Hardware Store</span>
                <br class="d-lg-none"> 聯絡表單</h3>
                <label for="email" class="text-left w-100">Email</label>
                <input id="email" type="email" name="Email"
                class="form-control mb-2">
                <label for="name" class="text-left w-100">聯絡人姓名</label>
                <input id="name" type="text" name="收件人姓名"
                class="form-control mb-2">
                <label for="tel" class="text-left w-100">聯絡電話</label>
                <input id="tel" type="tel" name="聯絡電話"
                class="form-control mb-2">
                <label for="message" class="text-left w-100">需求</label>
                <textarea class="form-control mb-5"
                rows="7" id="message"></textarea>
                <div class="mx-3 d-flex align-items-center justify-content-end">
                  <button type="button" @click="changeAboutUs = !changeAboutUs"
                  class="btn rounded-0 bg_white_hover text_black_hover
                  border-white text-white mr-3">
                    返回
                  </button>
                  <button type="button" class="btn rounded-0 align-items-center
                  bg-yellow submitBtn_hover d-flex"
                  data-toggle="modal" data-target="#alertModal">
                    確認送出
                    <span class="material-icons fz_24 pl-2 text-black d-none submit_hover_arrow">
                    navigate_next
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="alertModal" tabindex="-1" role="dialog"
    aria-labelledby="alertModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="exampleModalCenterTitle"></h5>
            <button type="button" class="btn
            m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons">clear</span>
            </button>
          </div>
          <div class="modal-body">
            感謝您的填寫，我們將會在最短時間內與您聯繫，謝謝！
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-black rounded-0" @click="closeModal">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade pr-0" id="payMethodModal" tabindex="-1" role="dialog"
    aria-labelledby="aboutUsModalLabel" aria-hidden="true">
      <div class="modal-dialog w_max_md_80" role="document">
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
            <div class="row mx-lg-5">
              <div class="d-none d-lg-block col-lg-7">
                <div class="d-flex">
                  <div class="w-50 mr-3"><div class="
                  h_lg_550px paymentImg paymentImg_1"></div></div>
                  <div class="w-50">
                    <div class="h-100 d-flex flex-column">
                      <div class="h-100 paymentImg paymentImg_2 mb-3"></div>
                      <div class="h-100 paymentImg paymentImg_3 mb-3"></div>
                      <div class="h-100 paymentImg paymentImg_4"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-5 h_lg_550px">
                <div class="d-flex h-100 flex-column text-left
                align-items-center justify-content-center">
                  <div class="w-100 d-flex justify-content-center justify-content-lg-start
                  ml-lg-9">如果你是台灣地區的會員</div>
                  <div class="w-100 d-flex justify-content-center justify-content-lg-start
                  ml-lg-9">我們提供以下多種付款方式：</div>
                  <div class="row w-100 mt-5">
                    <div class="col-12 offset-lg-1">
                      <div class="row w-100">
                        <div class="w-50 d-lg-none">
                          <div class="paymentImg paymentImg_1 w-100 h-100 d-lg-none"></div>
                        </div>
                        <div>
                          <ul class="mt-3 ml-7 ml-lg-0">
                            <li class="mb-3">WebATM</li>
                            <li class="mb-3">ATM</li>
                            <li class="mb-3">CVS</li>
                            <li class="mb-3">Barcode</li>
                            <li class="mb-3">Credit</li>
                            <li class="mb-3">ApplePay</li>
                            <li>GooglePay</li>
                          </ul>
                        </div>
                      </div>
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

<script>
/* global $ */

export default {
  data() {
    return {
      changeAboutUs: true,
    };
  },
  methods: {
    closeModal() {
      $('#aboutUsModal').modal('hide');
      $('#alertModal').modal('hide');
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
.mt_lg_-7{
  margin-top: -64px;
}
.btn_black_hover:hover{
  background: #121212;
  color: #fff;
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
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/SI0k3PgbXw9Vm0fLxezuhy68rP3tWE8d9r3RNBgwkgJxQ6Uzxo92FArXNIYxYz1fkf230wSLSomp7donINUvXk292lqYcVWkNU2C7cL2AByU7lQErPBxrT5ABuvFn1IR.jpg) no-repeat;
  filter: sepia(.6);
  height: 250px;
  @media (min-width: 992px) {
    height: 550px;
  }
}
.aboutImg_2{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Gs5UjadWsi9k9z1nzF5mE0phAQUwF9Pb8dIf0MidbXDWpCDceQ32n54fnS0l60Axm28LvJ0vDF1Bw4Ax8m2j3Q0RuGuUosYl9tknK7aSrNHhBtCpkvkYTtJ1WCjyBk1q.jpg) no-repeat;
  filter:saturate(1);
  height: 250px;
  @media (min-width: 992px) {
    height: 350px;
  }
}
.aboutImg_3{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/G2lMzH2lr83fAXxGBEjZDwiMqq931qEe77ogf0oxPLwfRvoKzdQd6HD0zGALnft9DKb0T6ilDuVYEeA2LTW0bkZ1QVXR7WSSGqaN3Xgj2xQldfjM51uAtmExJSOlvMEW.jpeg) no-repeat;
  height: 250px;
  @media (min-width: 992px) {
    height: 550px;
  }
}
.aboutUsImg{
  width: 100%;
  background-size: cover !important;
  &_carousel{
    height: 150px;
    width: 100%;
    background-size: cover !important;
  }
}
.aboutUsImg_1{
  background-position: 50% 75% !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/SI0k3PgbXw9Vm0fLxezuhy68rP3tWE8d9r3RNBgwkgJxQ6Uzxo92FArXNIYxYz1fkf230wSLSomp7donINUvXk292lqYcVWkNU2C7cL2AByU7lQErPBxrT5ABuvFn1IR.jpg) no-repeat;
  filter: sepia(.6);
}
.aboutUsImg_2{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/S2CwRqkSQTpy0VWuX8W7OJ0sGN31jHeZ6yTD5G9MZNeCTCSutcWC0k7ZMKctbVz2qkALUOHneCqH9YHSu89HePTTHQFXRk7I7tJVsrERQw6QH2Gi1qkDC4nNbBk3uO9P.jpg) no-repeat;
}
.aboutUsImg_3{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/QBMT5X8l1LtqFw8TOZQE890CckMIJEw1I69Zen9YrNEG3oHo5WaA2qv8YavqFV79kIKA7VGkRwInGGwKC8T9seTXF6ajgb2rIQszm08MQWGyOkJw61OmNDH2AcunFt2e.jpg) no-repeat;
}
.formBtn_hover:hover{
  color: #000 !important;
  background: #fff;
  .formBtn_hover_arrow{
    display: inline-block !important;
  }
}
.submitBtn_hover:hover{
  font-weight: bold;
  .submit_hover_arrow{
    display: inline-block !important;
  }
}
.paymentImg{
  width: 100%;
  background-size: cover !important;
}
.paymentImg_1{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/BePEQVgDeigWc7MU7oJicTWL0QjOcUO5kxf3vWqKYfwh7b9DD6bBcoVgznIdpbLFLHYbDHv1CK5B51xcDUdLGaQqUvX2xq04UqTzOBjxTEZhxperpw1EgGireLNOKE44.webp) no-repeat;
}
.paymentImg_2{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/5xTm7SESTGAJ3EVfGfCnZTZRP6yTECVnC8v1XOrgKYZH57gnqdbj1JakcuGA4Kwx0aU48UzK1dwdjC3hoEtgcKGwR9TNz0F96hFGnDCIbHbzL1YyQynzYgsO361OKZs2.jpg) no-repeat;
}
.paymentImg_3{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/g11YQ3BkNqojH4N6A6GO5D4jaombuX3WDf2Ux3UrM9797PWrMNaig87UapM7S7h20NZjfsL40GfzfWwh9TTx2Atykkd805ELYpJUf805HRC6gvOki121eS8fJNMaGlfN.jpeg) no-repeat;
}
.paymentImg_4{
  background-position: center !important;
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/731a3tnMpFZ2NzzcPn60x8sJLAkmCVCfGU1tWOiT7KuiKg4e3Z4AJPKbtCgPJ9YcHjqquHDGvb4PnrNwQdOGD3zJ7tZC0nEmulJjfSKVoMpct6htVboRM6zEk1YoKudF.webp) no-repeat;
}
</style>
