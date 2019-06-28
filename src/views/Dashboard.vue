<template>
    <div class="message">
      <div class="msg">
        <span class="iconfont icon-qian"></span>
      </div>
      <div class="msg1">
        <span class="iconfont icon-biaoqian"></span>
      </div>
      <div class="msg2"></div>
      <!--<router-link to='/supplier_apply'><a>供应商申请</a></router-link>-->
    </div>

</template>

<script>
export default {
  name: 'dashboard',
  created () {

  }
}
</script>

<style lang="scss">
  .message {
    display: -webkit-flex; /* Safari */
    display: flex;
    width: auto;
    height: auto;
    padding: 5px auto;
    .msg {
      width: 100px;
      height: 50px;
      background: #fff;
      display: flex;
      .iconfont {
        font-size: 35px;
        margin-top: 5px;
        margin-left: 5px;
      }
    }
    .msg1 {
      width: 100px;
      height: 50px;
      background: #fff;
      margin-left: 5px;
    }
    .msg2 {
      width: 100px;
      height: 50px;
      background: #fff;
      margin-left: 5px;
    }
  }
</style>
