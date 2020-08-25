<template>
  <div class="d-flex">
    <NavbarAdmin />
    <div class="main_admin w-100 h_100vh text-left">
      <h3 class="fontOrbitron mb-5 p-5 bg-adminSecondary d-block d-lg-none">
        Hardware Store Admin
      </h3>
      <h3 class="text-left d-flex align-items-center mb-6 pt-lg-5 px-5 px-md-6">
        <span class="material-icons fz_30 mr-3">home</span>
        首頁
      </h3>
      <div class="row px-5 pb-5 px-md-6">
        <div class="col-12 col-lg-7 col-xl-8">
          <p class="h1 mb-5">您好，歡迎來到<br class="d-block d-xl-none"/>
            <span class="fontOrbitron"> Hardware Store Admin </span><br class="d-block d-xl-none"/>
            管理系統
          </p>
          <div class="fz_30">
            今天是 {{ nowDate.year }} {{ nowDate.month }} {{ nowDate.day }}
            <span class="d-none d-xl-inline-block">，</span>
            <br class="d-xl-none"/>
            {{ nowDate.week }}
          </div>
        </div>
        <div class="col-0 col-lg-5 col-xl-4">
          <div class="fz_75 fontLobster w_280px text-right ml-0 ml-xl-6 d-none d-lg-block">
            <div class="d-flex justify-content-start align-items-end">
              <div class="d-inline-block">
                {{ nowDate.hour }} :
                <span class="fz_65">{{ nowDate.min }} : </span>
              </div>
              <div class="fz_50 d-inline-block mb_11-6 w_50px">{{ nowDate.sec }} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="main_admin w-100 p-3" :token="token" v-if="checkSuccess" />
  </div>
</template>

<script>
import NavbarAdmin from '../../components/Navbar_admin.vue';

export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
      nowDate: {
        year: '',
        month: '',
        day: '',
        week: '',
        hour: '',
        min: '',
        sec: '',
      },
    };
  },
  components: {
    NavbarAdmin,
  },
  methods: {
    checkLogin() {
      /* eslint-disable */
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)testToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const url = `${process.env.VUE_APP_APIPATH}auth/check`;
      this.$http
        .post(url, {
          api_token: this.token,
        })
        .then((res) => {
          console.log(res);
          this.checkSuccess = true;
        })
        .catch((error) => {
          console.log(error.response);
          this.$router.push('/login');
        });
    },
    updateTime() {
      const Today = new Date();
      const weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
  　  this.nowDate = {
        year: `${Today.getFullYear()} 年`,
        month: `${(Today.getMonth()+1)} 月`,
        day: `${Today.getDate()} 日`,
        week: `${weekdays[Today.getDay()]}`,
        hour: `${Today.getHours()}`,
        min: `${Today.getMinutes()}`,
        sec: `${Today.getSeconds()}`,
      };
    },
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
};
</script>
