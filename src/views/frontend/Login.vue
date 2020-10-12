<template>
  <div class="position-relative h_100vh">
    <div class="bgLoginImg position-absolute h-100"></div>
    <div class="row">
      <div class="col-12 col-lg-5 py-3">
        <router-link
          class="fontOrbitron fz_30 text-black text-decoration-none"
          to="/home"
        >Hardware Store</router-link>
      </div>
    </div>
    <div class="row mt-5 mt-xl-9">
      <div class="col-12 col-lg-6 offset-lg-3 col-xl-3 offset-xl-7
      d-flex align-items-center justify-content-end text-white text_xl_black">
        <form @submit.prevent="signin" class="form-signin bg-blackOP
        bg_xl_transparent w-100 w-xl-75 p-3 m-5 m-lg-0">
          <div class="fz_36 text-left mb-3">登入</div>
          <div class="form-group text-left">
            <label class="mb-1 text-gray text_xl_secondary"
            for="inputEmail">Email</label>
            <input
              autofocus
              class="form-control form-control-lg py-4 border-secondary rounded-0"
              id="inputEmail"
              placeholder="Email address"
              required
              type="email"
              v-model="user.email"
            />
          </div>
          <div class="form-group text-left">
            <label class="mb-1 text-gray text_xl_secondary"
            for="inputPassword">密碼</label>
            <input
              class="form-control form-control-lg py-4 position-relative
              border-secondary rounded-0"
              id="inputPassword"
              placeholder="Password"
              required
              type="password"
              v-model="user.password"
            />
          </div>
          <div class="fz_14 text-left text-gray text_xl_secondary mb-4">當您創建與登入帳號時，也代表您同意我們的
          <a herf="#" @click.prevent class="text-yellow text_xl_black mx-1">服務條款</a>和
          <a herf="#" @click.prevent class="text-yellow text_xl_black mx-1">隱私權聲明</a>
          有任何問題，歡迎聯絡我們</div>
          <div class="form-group form-check text-left">
            <input type="checkbox" v-model="remberChecked" @click="remberMeChange"
            class="form-check-input opacity_0 zIndex_10" id="remberCheck">
            <label class="form-check-label remberStyleCheck ml-2" for="remberCheck">記住我
            <span v-if="remberChecked" class="material-icons
            remberStyleChecked position-absolute">
            done
            </span>
            </label>
          </div>
          <button class="btn btn-lg btn-yellow
          btn-block rounded-0 mb-3" type="submit">登入</button>
          <div class="fz_14 text-gray text_xl_secondary">您還沒有帳號嗎？趕快
          <a href="#" @click.prevent class="text-yellow text_xl_black mx-1 creatTip_hover
          position-relative">加入我們
          <span class="creatTipText position-absolute ml-7">
            近期開放
          </span>
          </a>吧！</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      remberChecked: false,
    };
  },
  methods: {
    signin() {
      if (this.remberChecked) {
        this.setCookie('user', this.user.email, 7);
        this.setCookie('pswd', this.user.password, 7);
      }
      const url = `${process.env.VUE_APP_APIPATH}auth/login`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          // 將token與到期日寫入cookie;
          document.cookie = `testToken=${token}; 
          expires=${new Date(expired * 1000)}; path=/`;
          this.$store.dispatch('messagePush',
            {
              message: '登入成功',
              status: 'success',
            });
          this.$router.push('/admin/home');
        })
        .catch(() => {
          this.$store.dispatch('messagePush',
            {
              message: '登入失敗，請再嘗試',
              status: 'danger',
            });
        });
    },
    signout() {
      // 將cookie清空即為登出
      document.cookie = 'testToken=; expires=; path=/';
    },
    remberMe() {
      if (this.getCookie('user') && this.getCookie('pswd')) {
        this.user.email = this.getCookie('user');
        this.user.password = this.getCookie('pswd');
        this.remberChecked = true;
      }
    },
    remberMeChange() {
      if (this.remberChecked) {
        this.delCookie('user');
        this.delCookie('pswd');
      }
    },
    setCookie(name, value, day) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      document.cookie = `${name}=${value};expires=${date}`;
    },
    getCookie(name) {
      const reg = RegExp(`${name}=([^;]+)`);
      const arr = document.cookie.match(reg);
      if (arr) {
        return arr[1];
      }
      return '';
    },
    delCookie(name) {
      document.cookie = `${name}=; expires=; path=/`;
    },
  },
  created() {
    this.remberMe();
  },
};
</script>

<style lang="scss">
.bgLoginImg{
  background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/oi0oJutq0UAjvNjHMpb2QG4B3UWqRYdXxxtu4i268XNMvkPtauotuqvtex6tte6EnucrxFBoOuYtUopnKuWvbEsW4v04QKOVSG8WRS3bRenGX1D9B5ib6wKxuKWsMbJp.jpg) no-repeat;
  width: 100%;
  top: 0;
  bottom: 0;
  background-position: 10% 50% !important;
  background-size: cover !important;
  z-index: -10;
  @media (min-width: 1200px) {
    width: 55%;
  }
}
.bg_xl_transparent{
  @media (min-width: 1200px) {
    background: transparent !important;
  }
}
.text_xl_black{
  @media (min-width: 1200px) {
    color: #121212 !important;
  }
}
.text_xl_secondary{
  @media (min-width: 1200px) {
    color: #00000062 !important;
  }
}
.remberStyleCheck::before {
  content: '';
  border: #fff solid 1px;
  padding: 9px 9px;
  position: absolute;
  left: 0;
  top: 2.5px;
  @media (min-width: 1200px) {
    border: #121212 solid 1px;
  }
}
.remberStyleChecked {
  left: -7px;
  top: -7px;
  font-size: 36px;
}
.creatTip_hover{
  opacity: 1;
}
.creatTipText {
  width: 120%;
  padding: 5px;
  opacity: 0;
  font-size: .8em;
  border-radius: 3px;
  text-align: center;
  transition: ease-in-out .5s;
  /* Position the creatTip */
  position: absolute;
  z-index: 1;
  left: -55px;
  bottom: -35px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}
.creatTipText::before{
  content: "";/*讓before顯示出來*/
  position: absolute;
  top: -7px; /*調整位置*/
  right: 70%;/*調整位置*/
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7.5px 7px 7.5px;
  border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
}
.creatTip_hover:hover .creatTipText {
  opacity: 1;
}
</style>
