<template>
  <div>
    <h2>這是登入頁</h2>
    <form @submit.prevent="signin" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="form-group">
        <label class="sr-only" for="inputEmail">Email address</label>
        <input
          autofocus
          class="form-control"
          id="inputEmail"
          placeholder="Email address"
          required
          type="email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label class="sr-only" for="inputPassword">Password</label>
        <input
          class="form-control"
          id="inputPassword"
          placeholder="Password"
          required
          type="password"
          v-model="user.password"
        />
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
      <br />
      <button @click="signout" class="btn btn-outline-primary btn-block" type="button">登出</button>
      <br />
      <button @click="getData" class="btn btn-outline-primary btn-block" type="button">取得資料</button>
      <p class="mt-5 mb-3 text-muted">© 2020~∞ - 六角學院</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* eslint-disable */
      user: {
        email: '',
        password: '',
      },
      token: '',
    };
  },
  methods: {
    signin() {
      const url = `${process.env.VUE_APP_APIPATH}auth/login`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          console.log(res);
          const { token } = res.data;
          const { expired } = res.data;
          // 將token與到期日寫入cookie;
          document.cookie = `testToken=${token}; 
          expires=${new Date(expired * 1000)}; path=/`;
          this.$router.push('/admin');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signout() {
      //將cookie清空即為登出
      document.cookie = `testToken=; expires=; path=/`;
    },
    getData() {
      /* eslint-disable */
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)testToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      this.$http
        .get(
          `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products`
        )
        .then((res) => {
          console.log('成功', res);
        });
    },
  },
};
</script>
