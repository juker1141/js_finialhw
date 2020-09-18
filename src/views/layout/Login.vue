<template>
  <div>
    <div class="row h_100vh">
      <div class="col-3 offset-9 d-flex align-items-center">
        <form @submit.prevent="signin" class="form-signin">
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
          <button @click="signout" class="btn btn-outline-primary btn-block"
          type="button">登出</button>
        </form>
      </div>
    </div>
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
          this.$bus.$emit('message:push',
            '登入成功',
            'success'
          );
          this.$router.push('/admin/home');
        })
        .catch((error) => {
          this.$bus.$emit('message:push',
            `登入失敗，請再嘗試`,'danger'
          );
          console.log(error);
        });
    },
    signout() {
      //將cookie清空即為登出
      document.cookie = `testToken=; expires=; path=/`;
    },
  },
};
</script>

<style lang="scss">
  .img{
    background: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/0U8NelgxTEoRbBspX8ycVylJQ65Kl8k8Gxgy96ckYFYWW8fK23JqixaqWlZlUkjAsfujBcIhbFIceRz9xROHq5yE0quVIsRInamBQT2u4aP5po47244uSIV2tCkKVkpx.jpg) no-repeat;
  }
</style>
