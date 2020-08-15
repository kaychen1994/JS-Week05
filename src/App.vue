<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <router-link to="/" class="text-light mr-5 text-decoration-none"><h1>Watches</h1></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link to="/" class="text-decoration-none text-light mr-3">首頁</router-link>
                <router-link to="/about" class="text-decoration-none text-light mr-3">關於我們</router-link>
                <router-link to="/products" class="text-decoration-none text-light mr-3">產品列表</router-link>
                <router-link to="/carts" class="text-decoration-none text-light mr-3">購物車</router-link>
            </div>
        </div>
    </nav>
    <!-- <div id="nav">
      <router-link to="/">首頁</router-link>|
      <router-link to="/about">關於我們</router-link>|
      <router-link to="/products">產品列表</router-link>|
      <router-link to="/carts">購物車</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 預設關閉
      isLoading: false
    }
  },
  mounted () {
    // 畫面準備完打開
    this.isLoading = true
    // 2秒後關閉
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
