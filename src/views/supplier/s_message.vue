<template>
  <div>
    我是供应商消息
    <button v-on:click="getapi">测试请求</button>
    <button v-on:click="getdata">渲染测试数据</button>
  </div>
</template>

<script>

export default {
  name: 's_message',
  methods: {
    getapi: function () {
      this.$store.dispatch('ajax', {url: 'https://www.tianqiapi.com/api/'})
    },
    getdata: function () {
      console.log(this.$store.state)
    }
  }

}
</script>
