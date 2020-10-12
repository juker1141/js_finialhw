<template>
  <div class="d-flex">
    <NavbarAdmin />
    <router-view class="main_admin w-100" v-if="checkSuccess" />
  </div>
</template>

<script>
import NavbarAdmin from '@/components/Navbar_admin.vue';

export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  components: {
    NavbarAdmin,
  },
  methods: {
    checkLogin() {
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)testToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      const url = `${process.env.VUE_APP_APIPATH}auth/check`;
      this.$http
        .post(url, {
          api_token: this.token,
        })
        .then(() => {
          this.checkSuccess = true;
          this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
