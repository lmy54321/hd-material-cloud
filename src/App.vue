<template>
  <div id="app">
    <!-- 进入首页默认加载的路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    // 请求左侧导航菜单数据
    this.$store.dispatch('ajax', {url: '/api/items',
      success: function (res) {
      }})
  }
}
</script>

<style>
  @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";     /*深色主题*/
</style>
