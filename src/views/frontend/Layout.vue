<template>
  <div>
    <!-- ... 這裡是表頭navbar開始 ... -->
    <section id="navbar"
    class="w-100 position-fixed
    navbarPosition zIndex_30 bg-white">
      <button v-if="windowY >= 500" @click="goToTop" class="position-fixed btn d-flex
      goToTopBtn_position p-1 border-yellow border_5px bg-dark"
      type="button" id="goToTopBtn">
        <span class="material-icons text-yellow font-weight-bold fz_24">
        keyboard_arrow_up
        </span>
      </button>
      <div class="container d-flex justify-content-between
      align-items-center my-2 my-lg-3 px-5 position-relative">
        <button class="btn p-1 justify-content-between align-items-center d-flex d-lg-none"
        type="button" @click="navbarShow">
          <span class="material-icons">menu</span>
        </button>
        <router-link
          class="fontOrbitron fz_20 fz_md_30 text-black text-decoration-none"
          to="/home"
        >Hardware Store</router-link>
        <div class="d-flex align-items-center">
          <ul
            class="listStyle_none bg-gray bg_lg_transparent
            zIndex_10 position_absolute position_lg_relative
            align-items-center d-lg-flex m-0 p-0 pt-2 pb-3 p-lg-0 list_position">
            <li class="py-3 py-lg-0">
              <a href="#" @click.prevent="goToPage('/products')"
              class="text-black px-3 mr-2 text-decoration-none list_hover">商品</a>
            </li>
            <li class="py-3 py-lg-0">
              <a href="#" @click.prevent="goToPage('/orderlist')"
              class="text-black px-3 mr-2 text-decoration-none list_hover"
              >訂單</a>
            </li>
            <li class="py-3 py-lg-0">
              <a href="#" @click.prevent="goToPage('/about')"
              class="text-black px-3 mr-2 text-decoration-none list_hover"
              >關於我們</a>
            </li>
            <li class="py-3 py-lg-0">
              <a href="#" @click.prevent="goToPage('/login')"
                class="text-black btn p-1 d-flex justify-content-center align-items-center"
                >
                <span class="material-icons">person</span>
              </a>
            </li>
          </ul>
          <button @click="openCart"
            class="text-black btn ml-2 p-1 d-flex justify-content-center
            align-items-center position-relative"
            type="button">
            <span class="material-icons">shopping_cart</span>
            <div v-if="cart.length >= 1"
            class="position-absolute cartNum bg-danger d-flex align-items-center
            justify-content-center text-white rounded-circle fz_12">
              {{ cart.length }}
            </div>
          </button>
        </div>
      </div>
    </section>
    <!-- ... 這裡是表頭navbar結束 ... -->
    <!-- ... 這裡是購物車側欄開始 ... -->
    <div
      id="cartBlock" :class="{ 'active' : cartBlockShow }"
      class="container h-100 bg-white text-black position-fixed
      zIndex_40 py-4 cartBlockPosition"
    >
      <div class="d-flex justify-content-between mb-5">
        <div class="fz_30_important fz_md_36 font-weight-bold text-black">購物車</div>
        <div class="d-flex align-items-center">
          <button @click="closeCart"
          class="btn d-flex align-items-center p-0" type="button">
            <span class="material-icons fz_30_important fz_md_36">
            close
            </span>
          </button>
        </div>
      </div>
      <div>
        <ul class="listStyle_none m-0 p-0">
          <li class="d-flex bg-gray mb-2 text-black"
          v-for="item in cart" :key="item.product.id">
            <div class="card-img-top rounded-0 cartImg"
            :style="{ background: `url(${item.product.imageUrl[0]})` }">
            </div>
            <div class="w-100 position-relative">
              <div v-if="loadingProduct === item.product.id"
              class="d-flex align-items-center justify-content-center
              h-100 w-100 position-absolute bg-blackOP">
                <div class="spinner-border text-white" id="loadingIcon" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="p-3 h-100 w-100 d-flex flex-column justify-content-between">
                <div class="d-flex flex-column align-items-start">
                  <div class="font-weight-bold w-100 mb-1 d-flex justify-content-between">
                    {{ item.product.title }}
                    <div class="d-flex align-items-center">
                      <button @click="deleteCartProduct(item.product.id)"
                      class="btn d-flex align-items-center p-0" type="button">
                        <span class="material-icons">
                        close
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="text-left fontRoboto">
                    NT {{ item.product.price | toCurrency | DollarSign }}
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center justify-content-between w-50">
                    <button type="button" class="btn d-flex p-0" :disabled="item.quantity === 1"
                    @click="item.quantity --; updateCartQuantity(item.product.id, item.quantity)">
                      <span class="material-icons">
                      remove
                      </span>
                    </button>
                    <input v-if="productCartQuantity === item.product.id" type="number" min="1"
                    @blur="updateCartQuantity(item.product.id, editQuantity)"
                    class="border-0 text-center w-50 bg-transparent"
                    v-model.number="editQuantity">
                    <div @click="productCartQuantity = item.product.id;
                    editQuantity = item.quantity"
                    v-else>{{ item.quantity }}</div>
                    <button type="button" class="btn d-flex p-0"
                    @click="item.quantity ++; updateCartQuantity(item.product.id, item.quantity)">
                      <span class="material-icons">
                      add
                      </span>
                    </button>
                  </div>
                  <div class="text-right font-weight-bold">
                  NT {{ item.quantity * item.product.price | toCurrency | DollarSign }}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="d-flex justify-content-end p-3">
        <div class="w_lg_75 w_100 text-secondary d-flex flex-column">
          <div class="d-flex mb-2 flex-column">
            <div class="d-flex justify-content-between position-relative">
              <input type="text" v-model="couponCode"
              class="form-control rounded-0"
              id="coupons" placeholder="請輸入優惠卷"
              :disabled="cart.length === 0">
              <div class="position-absolute loading_position">
                <div v-if="couponLoading === true"
                class="spinner-border spinner-border_sm text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <span v-if="couponWorking === true"
                class="material-icons text-success font-weight-bold">
                done
                </span>
                <span v-if="couponWorking === false"
                class="material-icons text-danger font-weight-bold">
                close
                </span>
              </div>
            </div>
            <div v-if="couponWorking === false" class="fz_14 mt-2 text-danger text-left
            ">找不到此優惠卷，請您再次確認</div>
          </div>
          <div>
            <div v-if="cartTotal"
            class="d-flex justify-content-between mb-1 align-items-center">
              購物車金額
              <span>
              NT {{ Math.round(cartTotal) | toCurrency | DollarSign }}</span></div>
              <div class="d-flex justify-content-end align-items-center">
                <span v-if="couponWorking === true && cart.length >= 1"
              class="text-danger text-right mb-2">
              節省 - NT {{ couponPrice | toCurrency | DollarSign }}</span></div>
              <span v-if="cart.length === 0"
              class="text-danger text-right mb-2">
              購物車內沒有東西，無法使用折價卷</span>
            <div v-else
            class="d-flex justify-content-between mb-1 align-items-center">
            購物車金額<div>NT 0</div></div>
            <div v-if="cartTotal > 2000"
            class="d-flex justify-content-between align-items-center mb-1">
            運費<div><span class="text-danger mr-2 font-weight-bold">
            ( 滿 $ 2, 000 免運 )</span>NT 0</div></div>
            <div v-else class="d-flex
            justify-content-between align-items-center mb-1">
            運費<div>NT {{ 60 | toCurrency | DollarSign }}</div></div>
            <div v-if="cartTotal > 2000"
            class="d-flex mb-3 justify-content-between align-items-center
            font-weight-bold fz_20 text-black">
            總金額<div>NT {{ Math.round(cartTotal - couponPrice) | toCurrency | DollarSign }}
            </div></div>
            <div v-else class="d-flex mb-3 font-weight-bold fz_20
            justify-content-between align-items-center text-black">
            總金額<div>
            NT {{ Math.round(cartTotal - couponPrice) + 60 | toCurrency | DollarSign }}</div></div>
          </div>
          <div v-if="cart.length !== 0" class="d-flex justify-content-end">
          <button @click="closeCart(); toInformationPage()" type="button"
          class="btn bg-black text-white rounded-0 fz_30_important px-5 w-100 w_lg_75"
          :disabled="computeCart"
          >
          前往結帳</button></div>
          <div v-if="cart.length === 0"
          class="text-danger text-right mt-5 fz_20 fz_lg_24">您的購物車沒有東西！！</div>
          <div v-if="cart.length === 0" class="mt-5">
          <a href="#" class="btn bg-yellow font-weight-bold rounded-0
          fz_30_important px-5 w-100 w_lg_75"
          @click.prevent="goToPage('/products'); closeCart()">去逛逛</a></div>
        </div>
      </div>
    </div>
    <!-- ... 這裡是購物車側欄結束 ... -->
    <router-view class="navbar_mt flex_1" id="main" @updateCart="getCart"/>
    <div id="subscribe"
    class="footerBannerImg p-5 p-lg-9 text-white">
      <div class="container">
        <div class="row">
          <div class="col-8 col-lg-7 text-left">
            <div class="mb-3 mb-lg-6 fz_16 fz_lg_30">
            想要獲得更多<br class="d-lg-none">活動訊息及優惠資訊嗎？<br></div>
            <div class="mb-3 mb-lg-6 fz_20 fz_lg_30">趕快訂閱我們吧！</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-7">
            <div class="input-group mb-3">
              <input type="text" class="form-control text-yellow
              form_control bg-transparent border-yellow rounded-0
              form_control_lg_lg fz_lg_24 form-control_yellow" placeholder=" 請輸入您的 Email"
              aria-label="Example text with button addon" aria-describedby="button-addon1">
              <div class="input-group-prepend">
                <button class="btn btn-yellow fz_14 fz_lg_24
                font-weight-bold px-2 px-lg-5 rounded-0
                text-black" type="button"
                id="button-addon1">訂閱電子報</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" class="bg-dark p-3 p-lg-5">
      <div class="container d-flex align-items-center justify-content-between">
        <div class="w_100 w_lg_auto">
          <div class="mb-3">
            <router-link
            class="fontOrbitron fz_30_important text-yellow text-decoration-none"
            to="/home">
            Hardware Store
            </router-link><br class="d-lg-none">
            <span class="fz_14 text-yellow">© 2020. All Rights Reserved.</span>
          </div>
          <div class="d-flex d-lg-none
          flex-column-reverse justify-content-center align-items-center">
            <ul class="listStyle_none
            p-0 m-0 d-flex align-items-center fz_14">
              <li><button type="button" data-toggle="modal"
              data-target="#contactModal" class="btn p-0 mr-3 text-yellow">聯絡我們</button></li>
              <li><button type="button" data-toggle="modal"
              data-target="#privacyModal" class="btn p-0 mr-3 text-yellow">隱私權聲明</button></li>
              <li><button type="button" data-toggle="modal"
              data-target="#serviceModal" class="btn p-0 text-yellow">服務條款</button></li>
            </ul>
            <ul class="listStyle_none justify-content-end
            p-0 m-0 mb-3 d-flex align-items-center fz_14">
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-github-square fz_30_important"></i>
                </a>
              </li>
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-facebook-square fz_30_important"></i>
                </a>
              </li>
              <li class="mr-3">
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fab fa-instagram-square fz_30_important"></i>
                </a>
              </li>
              <li>
                <a href="#" class="text-decoration-none text-yellow">
                  <i class="fas fa-envelope-square fz_30_important"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul class="listStyle_none justify-content-end
          text-left p-0 m-0 mb-3 d-none d-lg-flex align-items-center fz_14">
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-github-square fz_30_important"></i>
              </a>
            </li>
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-facebook-square fz_30_important"></i>
              </a>
            </li>
            <li class="mr-3">
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fab fa-instagram-square fz_30_important"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-decoration-none text-yellow">
                <i class="fas fa-envelope-square fz_30_important"></i>
              </a>
            </li>
          </ul>
          <ul class="listStyle_none
          text-left p-0 m-0 d-none d-lg-flex align-items-center fz_14">
            <li><button type="button" data-toggle="modal"
              data-target="#contactModal" class="mr-3 p-0 btn text-yellow">聯絡我們</button></li>
            <li><button type="button" data-toggle="modal"
              data-target="#privacyModal" class="mr-3 p-0 btn text-yellow">隱私權聲明</button></li>
            <li><button type="button" data-toggle="modal"
              data-target="#serviceModal" class="btn p-0 text-yellow">服務條款</button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="modal fade pr-0" id="contactModal" tabindex="-1" role="dialog"
    aria-labelledby="aboutUsModalLabel" aria-hidden="true">
      <div class="modal-dialog w_max_md_80" role="document">
        <div class="modal-content bg-blackOP text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn
            m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons text-white">clear</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mx-sm-2 mx-md-3 mx-lg-5 flex-column-reverse flex-xl-row">
              <div class="col-12 col-xl-8">
                <div class="iframe-rwd">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.570819148624!2d120.30473501439967!3d22.59514978517119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e0372ebc9d327%3A0x92317d11de68daf9!2z5aSi5pmC5Luj6LO854mp5Lit5b-DIERyZWFtIE1hbGw!5e0!3m2!1szh-TW!2stw!4v1602737500796!5m2!1szh-TW!2stw" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
              </div>
              <div class="col-12 col-xl-4 text-center d-flex flex-column align-items-center
              justify-content-between">
                <div class="mb-5">
                  <h2 class="mb-5">聯絡我們</h2>
                  <div class="mb-3 fz-20">若您有任何的意見及疑問</div>
                  <div class="mb-3 fz-20">我們歡迎您使用以下資訊聯繫到我們</div>
                  <div class="fz-20">當然您也可以到我們的門市盡情選購！！</div>
                </div>
                <div class="mb-3 mb-xl-0">
                  <div class="text-yellow fz_20 mb-3 d-flex
                  align-items-center justify-content-start">
                    <span class="material-icons fz_30">phone</span>
                    <span class="ml-3">0800-000-000</span>
                  </div>
                  <div class="text-yellow fz_20 mb-3 d-flex
                  align-items-center justify-content-start">
                    <span class="material-icons fz_30">smartphone</span>
                    <span class="ml-3">0912-345-678</span>
                  </div>
                  <div class="text-yellow mb-3 d-flex
                  align-items-center justify-content-start">
                    <span class="material-icons fz_30">place</span>
                    <span class="ml-3">806高雄市前鎮區中華五路789號</span>
                  </div>
                  <div class="text-yellow fz_20 mb-3 d-flex
                  align-items-center justify-content-start">
                    <span class="material-icons fz_30">mail_outline</span>
                    <span class="ml-3">hardwarestore@gmail.com</span>
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
    <div class="modal fade pr-0" id="privacyModal" tabindex="-1" role="dialog"
    aria-labelledby="aboutUsModalLabel" aria-hidden="true">
      <div class="modal-dialog w_max_md_80" role="document">
        <div class="modal-content bg-blackOP text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn
            m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons text-white">clear</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mx-sm-2 mx-md-3 mx-lg-5">
              <div class="col-12 col-xl-8 offset-xl-2 text-left">
                <h2 class="text-center mb-5">
                  <span class="fontOrbitron">Hardware Store
                    </span><br class="d-xl-none"> 隱私權聲明</h2>
                <ol class="fz_24">
                  <li class="fz_16 mb-5">
                    <div class="fz_20 mb-3">隱私權政策簡介</div>
                    <div class="mb-3">本隱私權政策說明<span class="text-yellow">
                    職人手工具股份有限公司</span>（「本公司」、「我們」）如何處理、
                    保護您於使用本公司之服務（「本服務」，見以下「涵蓋服務」之列表）時所提供之資訊，
                    以及您可以如何存取、控管您的資訊。為尊重您的隱私權、保護您的個人資訊，我們將遵循以下基本原則：</div>
                    <ol class="mx-3">
                      <li class="mb-3">蒐集您的個人資訊時，我們會清楚指出目的。</li>
                      <li class="mb-3">個人資訊將被蒐集時，我們會事先通知您，以就個人資訊之蒐集、利用、揭露徵詢您的同意。</li>
                      <li class="mb-3">我們僅會蒐集特定目的範圍內必要的個人資訊。</li>
                      <li class="mb-3">除非經您的同意或基於法律要求，
                        否則我們僅會針對蒐集目的利用或揭露您的個人資訊，且所蒐集之資訊僅會於蒐集目的完成之所需期間內保留。</li>
                      <li class="mb-3">我們將盡力確保您個人資訊的精確性、完整性、和即時性。</li>
                      <li class="mb-3">我們將以適當的安全保護措施保護您的個人資訊。</li>
                      <li class="mb-3">我們會盡力使處理個人資訊的政策與措施公開透明。</li>
                      <li class="mb-3">您隨時可以存取您的個人資訊並進行適當的修改。</li>
                      <li class="mb-3">我們將會對您負責。您可以隨時針對我們是否遵循上述原則與此隱私權政策提出意見。</li>
                    </ol>
                  </li>
                  <li class="fz_16 mb-5">
                    <div class="fz_20 mb-3">本公司蒐集何種資訊？如何蒐集資訊？</div>
                    <div class="mb-5">為提供您使用本服務，我們將於必要範圍內取得您的資訊。我們所蒐集的資訊基本上有兩種：</div>
                    <ul class="mx-3" style="list-style-type:lower-alpha;">
                      <li class="mb-5">
                        <div class="mb-3">您提供的資訊</div>
                        <ul class="mx-3" style="list-style-type:square;">
                          <li class="mb-2">
                          <div class="mb-2">用戶提供之個人資料與註冊資訊</div>
                          為提供用戶流暢的服務體驗，
                          並促進用戶間更良好的交流，用戶可能會被要求註冊用戶資訊，如電話號碼、
                          電子郵件地址、郵遞區號或郵寄／貨運地址或其他與本服務有關而得直接或間接識別用戶之個人資料。</li>
                          <li class="mb-2"><div class="mb-2">促銷活動</div>
                          為進行問卷調查、抽獎與其他促銷活動，
                          我們可能會要求您提供詳細資訊，如姓名、地址、電話號碼、電子郵件地址、
                          性別、生日，便於頒發獎品、寄送購買商品等。</li>
                          <li class="mb-2"><div class="mb-2">用戶聯絡資訊</div>
                          當用戶透過線上詢問表單方式聯絡我們時，
                          為檢查回報問題並提供適當回應，我們會蒐集用戶的資訊（包括電子郵件地址、
                          裝置類型、作業系統類型等）以識別用戶。</li>
                          <li class="mb-2"><div class="mb-2">交易及付款資訊</div>
                          為處理購物與支付服務的相關交易服務或付款程序，
                          因應相關服務所生之交易資料、付款金額與方式、用戶的信用卡資訊可能會被取得。
                          請注意，購物程序應由適當的付款機構完成，我們不會保留任何信用卡資訊。</li>
                        </ul>
                      </li>
                      <li>
                        <div class="mb-3">您使用本服務時，我們所取得的資訊</div>
                        <ul class="mx-3" style="list-style-type:square;">
                          <li class="mb-2"><div class="mb-2">Cookies</div>
                          為向用戶提供最佳服務，並維護服務與使用安全，
                          我們可能會使用 Cookies儲存用戶設定以記錄存取功能，
                          並監控使用模式及數據。例如，我們可能會使用Google Analytics協助我們進行上述工作。
                          您可以選擇停用Cookies，但同時您將無法使用本服務的部分功能。</li>
                          <li class="mb-2"><div class="mb-2">記錄</div>
                          存取本服務時，可能會自動取得並儲存您的使用紀錄（如：功能點擊、
                          服務關閉或使用時間等等）、IP 位址、瀏覽器類型、瀏覽器語言等存取記錄資訊。
                          該資訊將用以分析您的用戶環境，以便我們提升本服務，並避免未經授權／盜用行為干擾本服務正常運作。</li>
                          <li class="mb-2"><div class="mb-2">裝置資訊</div>
                          我們可能會不定時取得您的裝置資訊（如應用程式版本、
                          作業系統版本、語言與國家設定、裝置型號）。此資訊將用於提昇本服務品質，並避免非法或不當使用。
                您得自行決定是否提供您的個人資訊予我們，然若您未提供這些資訊，您將無法使用本服務之部分功能。</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li class="fz_16 mb-5">
                    <div class="fz_20 mb-3">本公司是否分享蒐集到的資訊？</div>
                    除本隱私權政策（必要時亦包括其他相關隱私權政策與附錄）另有規定者外，
                    未經您的同意，我們不會向第三人提供您的資訊。但若是我們本於善意認為係依據相關法律之要求或許可，
                    或為保護本公司權利及財產而進行抗辯，則不在此限。
                  </li>
                  <li class="fz_16 mb-5">
                    <div class="fz_20 mb-3">本公司是否與其他服務供應商合作？</div>
                    本公司可能不定期與服務供應商合作，協助我們為您提供最佳服務。
                    在與其他服務供應商建立合作關係前，我們會確保服務供應商將依此隱私權政策與相關法律處理您的資訊。
                  </li>
                  <li class="fz_16 mb-5">
                    <div class="fz_20 mb-3">如何存取我的資訊或更正我的資訊？</div>
                    本公司盡力協助您以最輕鬆的方式控管您的資訊。
                    您可以隨時確認或修改您的註冊資訊。若無法直接於應用程式上確認，
                    您可以隨時寄送書面意見要求本公司確認、更正、刪除其他本公司持有的個人資料。
                    認證您的身分後，本公司將依相關法律於合理期限內回應您的要求。
                  </li>
                  <li class="fz_16">
                    <div class="fz_20 mb-3">本公司如何確保本服務的安全性？</div>
                    我們會持續努力盡可能確保本服務的安全性。為前述工作進行，若本公司發現服務條款受到侵害、有受侵害之虞，或用戶間發生紛爭，我們的員工將可能會存取您提供的資訊。
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade pr-0" id="serviceModal" tabindex="-1" role="dialog"
    aria-labelledby="aboutUsModalLabel" aria-hidden="true">
      <div class="modal-dialog w_max_md_80" role="document">
        <div class="modal-content bg-blackOP text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn
            m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons text-white">clear</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mx-sm-2 mx-md-3 mx-lg-5">
              <div class="col-12 col-xl-8 offset-xl-2 text-left">
                <h2 class="text-center mb-5">
                  <span class="fontOrbitron">Hardware Store </span>
                  <br class="d-xl-none">服務條款</h2>
                <div>
                  <div class="fz_20 mb-3">我們瞭解您可能會想略過<span class="text-yellow">《服務條款》</span>，
                  但請務必詳閱，瞭解我們在您使用我們網站時致力遵守的原則，以及我們期許您遵守的行為準則。</div>
                  <ul class="fz_24 listStyle_none mx-lg-5">
                    <li class="fz_16 mb-2">
                      <div class="mb-3">本<span class="text-yellow">《服務條款》</span>反映出
                        <span class="fontOrbitron"> Hardware Store</span> 的業務營運模式、本公司適用的法律，
                      以及我們堅信的原則。因此，當您與我們的服務互動時，本<span class="text-yellow">《服務條款》</span>
                      有助於定義本公司與您的關係。例如，本條款包括下列主題：</div>
                      <ul class="mx-6" style="list-style-type:square;">
                        <li class="mb-2">
                        我們的服務原則，說明我們提供及開發服務的方式</li>
                        <li class="mb-2">
                        您的行為準則，說明使用本公司網站時須遵守的一些規則</li>
                        <li class="mb-2">本公司服務中的內容，說明您在本公司網站
                          中所接觸內容的智慧財產權歸屬</li>
                        <li class="mb-3">發生問題或意見不合時，
                          說明您擁有的其他合法權利，以及我們在有人違反本條款時採取的對應措施
                          </li>
                      </ul>
                    </li>
                    <li class="fz_16 mb-3">
                      當您使用我們的服務，即表示您同意本條款，因此請務必詳閱本條款內容。
                    </li>
                    <li class="fz_16">
                      除了本條款外，我們還發布了<a href="#" @click.prevent="goToPrivacyModal"
                      class="text-yellow">《隱私權聲明》</a>
                      。該政策並非本條款的一部分，但仍建議您詳閱，進一步瞭解如何更新、管理、匯出及刪除您的資訊。
                    </li>
                  </ul>
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
      windowY: '',
      cartTotal: 0,
      loadingProduct: '',
      toPathName: '',
      fromPathName: '',
      couponCode: '',
      couponWorking: '',
      coupon: {},
      cartTotalCoupon: 0,
      couponPrice: 0,
      couponLoading: false,
      computeCart: false,
      editQuantity: '',
      productCartQuantity: '',
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartBlockShow() {
      return this.$store.state.cartBlockShow;
    },
  },
  watch: {
    cart() {
      this.cartTotal = 0;
      if (this.cart.length === 0) {
        this.cartTotal = 0;
        if (this.couponCode) {
          this.couponCode = '';
        }
        return this.cartTotal;
      } if (this.cart.length >= 1) {
        this.computeCartTotal();
      }
      return this.cartTotal;
    },
    couponCode() {
      this.checkCoupon(this.couponCode);
    },
  },
  methods: {
    navbarShow() {
      $('.list_position').slideToggle('fast');
    },
    goToPage(link) {
      const w = $(window).width();
      if (w < 992) {
        $('.list_position').slideToggle('fast');
      }
      this.$store.dispatch('categoryChange', '全部商品');
      this.$router.push(link).catch(() => {});
    },
    goToTop() {
      /* 按下GoTop按鈕時的事件 */
      $('html,body').animate({ scrollTop: 0 }, 'slow');/* 返回到最頂上 */
      return false;
    },
    goToTopBtnShow() {
      /* 偵測卷軸滑動時，往下滑超過400px就讓GoTop按鈕出現 */
      $(window).scroll(() => {
        this.windowY = window.scrollY;
      });
    },
    openCart() {
      $('#cartBlock').toggleClass('active');
      this.$store.dispatch('darkShadyChange', true);
      this.$store.dispatch('cartBlockisShow', true);
    },
    closeCart() {
      this.$store.dispatch('cartBlockisShow', false);
      setTimeout(() => {
        this.$store.dispatch('darkShadyChange', false);
      }, 200);
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
    updateCartQuantity(id, quantity) {
      this.loadingProduct = id;
      $('#loadingIcon').addClass('d-inline-block');
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http.patch(url, cart)
        .then(() => {
          this.productCartQuantity = '';
          this.loadingProduct = '';
          this.getCart();
          if (this.couponCode) {
            this.checkCoupon(this.couponCode);
          }
        }).catch(() => {
          this.productCartQuantity = '';
          this.loadingProduct = '';
        });
    },
    deleteCartProduct(id) {
      this.loadingProduct = id;
      $('#loadingIcon').addClass('d-inline-block');
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.loadingProduct = '';
          this.getCart();
        });
    },
    checkCoupon(code) {
      this.couponWorking = '';
      this.couponLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/coupon/search`;
      const coupon = {
        code,
      };
      this.$http.post(url, coupon)
        .then((res) => {
          this.computeCart = false;
          this.couponLoading = false;
          this.couponWorking = true;
          this.coupon = res.data.data;
          this.computeCoupon(this.coupon);
        }).catch(() => {
          this.computeCart = false;
          this.couponLoading = false;
          this.coupon = {};
          this.couponWorking = false;
          this.computeCoupon();
          localStorage.removeItem('coupon');
        });
    },
    computeCartTotal() {
      this.cart.forEach((item) => {
        this.cartTotal += (item.quantity * item.product.price);
      });
    },
    computeCoupon(coupon) {
      const newCartTotal = this.cartTotal;
      this.cartTotalCoupon = 0;
      this.couponPrice = 0;
      if (this.cart.length >= 1) {
        if (this.coupon.percent) {
          this.cartTotalCoupon = Math.round(newCartTotal * (this.coupon.percent / 100));
          this.couponPrice = newCartTotal - this.cartTotalCoupon;
        }
      }
    },
    toInformationPage() {
      if (!localStorage.getItem('coupon')) {
        localStorage.setItem('coupon', JSON.stringify(this.coupon));
      } else {
        localStorage.removeItem('coupon');
      }
      setTimeout(() => {
        this.$router.push('/information').catch(() => {});
      }, 1000);
    },
    hideFooter() {
      if (this.$route.path === '/login'
      || this.$route.path === '/information'
      || this.$route.path === '/payment'
      || this.$route.path === '/paycheck'
      || this.$route.path === '/paydone') {
        $('#subscribe').addClass('d_none_important');
        $('#footer').addClass('d_none_important');
        $('#navbar').addClass('d_none_important');
        $('#main').removeClass('navbar_mt');
      } else {
        $('#subscribe').removeClass('d_none_important');
        $('#footer').removeClass('d_none_important');
        $('#navbar').removeClass('d_none_important');
        $('#main').addClass('navbar_mt');
      }
    },
    goToPrivacyModal() {
      $('#serviceModal').modal('hide');
      setTimeout(() => {
        $('#privacyModal').modal('show');
      }, 500);
    },
  },
  created() {
    this.navbarShow();
    this.goToTopBtnShow();
    this.getCart();
    setInterval(this.hideFooter, 0);
  },
  beforeRouteUpdate(to, from, next) {
    this.toPathName = to.fullPath;
    this.fromPathName = from.fullPath;
    if (this.fromPathName === '/information') {
      if (this.toPathName === '/payment') {
        next();
      } else {
        this.$store.dispatch('cartBlockisShow', true);
        this.$store.dispatch('darkShadyChange', true);
      }
    }
    next();
  },
};
</script>

<style lang="scss">

.flex_1 {
  flex: 1 !important;
}
.d_none_important{
  display: none !important;
}
.navbarPosition {
  top: 0;
}
.iframe-rwd {
  position: relative;
  padding-bottom: 65.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}
.iframe-rwd iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.cartBlockPosition{
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  right: -100%;
  width: 100%;
  transition: all .5s ease-out .2s;
  &.active {
    right: 0%;
  }
  @media (min-width: 992px) {
    width: 40%;
    right: -40%;
  }
  @media (min-width: 1400px) {
    width: 30%;
    right: -30%;
  }
}
.navbar_mt {
  margin-top: 50px;
  @media (min-width: 768px) {
    margin-top: 77px;
  }
}
.goToTopBtn_position {
  bottom: 150px;
  right: 30px;
  z-index: 50;
}
.border_5px {
  border-width: 5px;
}
.spinner-border_sm{
  height: 1.5rem;
  width: 1.5rem;
}
.list_position {
  top: 42px;
  width: 100%;
  left: 0;
  display: none;
  z-index: 30;
  @media (min-width: 768px) {
    top: 52px;
  }
  @media (min-width: 992px) {
    top: 0;
  }
}
.bg_lg_transparent{
  @media (min-width: 992px) {
    background-color:transparent !important;
  }
}
.form-control{
  &_yellow{
    &::-webkit-input-placeholder{
      color: #fecf2f;
      font-size: 16px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
    &:-moz-placeholder{
      color: #fecf2f;
      font-size: 16px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
    &::-moz-placeholder{
      color: #fecf2f;
      font-size: 16px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
  }
}
.w_100{
  width: 100%;
}
.w_lg_auto {
  @media (min-width: 992px) {
    width: auto;
  }
}
.form_control_lg_lg {
  @media (min-width: 992px) {
    height: 50px;
    padding: 8px 16px;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
  }
}
.footerBannerImg{
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/p3rxqB5dTgZTGUxzfqMshk5E6p6hLPo4sxfm428FFUD3XPoeieyG0v163fim6x2FJoLQBYntPSCrlo6dkFETyjD4byq8cqppVdjdM2yML3RpxY6Gg5j8mh9OBKn1rpd2.jpg) no-repeat;
  width: 100%;
  background-position: 30% 100% !important;
  background-size: cover !important;
  @media (min-width: 576px) {
    background-position: 50% 70% !important;
    background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/3pW4MngPAKBZGLFh6kMUujmDD5KQuTVO65DsZlYLMia7QWJhnxiO9CHnr8lsjw51N4muvtbapi8bgRiuTKmb8knkJA1cFONrda0INMssz7LgPJ8aeGAIcwWXM5hqMdbM.webp) no-repeat;
  }
  @media (min-width: 992px) {
    background-position: 50% 70% !important;
  }
}
.cartNum{
  top: 0px;
  right: 0px;
  width: 16px;
  height: 16px;
}
.cartImg{
  height: 120px;
  width: 120px;
  background-position: center !important;
  background-size: cover !important;
}
</style>
