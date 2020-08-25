<template>
  <div class="d-flex">
    <NavbarAdmin />
    {{ text }}
    <router-view class="ml_25 w-100 p-3" :token="token" v-if="checkSuccess" />
  </div>
</template>

<script>
import NavbarAdmin from '../../components/Navbar_admin.vue';

export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
      text: '',
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
  },
  created() {
    this.checkLogin();
    const Today=new Date();
　  this.text = document.write("今天日期是 " + Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日");
  },
};
</script>
