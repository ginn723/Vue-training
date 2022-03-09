<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台</a>
      <button class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">回到前台</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupon">優惠劵</router-link>
        </li>
        <a href="#" @click.prevent="signout">登出</a>
      </ul>
    </div>
  </div>
</nav>
<!-- 還沒登入成功，不會看到該頁面 -->
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      checkSuccess: false, // 預設是 false
    };
  },
  mounted() {
    this.checkLogin(); // 已登入就會執行 checkLogin()
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;

        const api = `${process.env.VUE_APP_PATH}api/user/check`;
        this.$http
          .post(api, { api_token: this.token }) // 驗證 token
          .then(() => {
            this.checkSuccess = true; // 登入成功就把 checkSuccess 改為 true
          })
          .catch((err) => {
            console.log(err.data.message);
            this.$router.push('/login');
          });
      } else {
        console.log('您尚未登入。');
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      console.log('token 已清除');
      this.$router.push('/login');
    },
  },
};
</script>
