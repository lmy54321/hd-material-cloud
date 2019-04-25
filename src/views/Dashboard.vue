<template>
    <div class="message">
    <div class="msg"></div>
      <div class="msg1"></div>
      <div class="msg2"></div>
    </div>
</template>

<script>
export default {
  name: 'dashboard'
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
      background: #00d1b2;

    }
    .msg1 {
      width: 100px;
      height: 50px;
      background: #0000ff;
      margin-left: 5px;
    }
    .msg2 {
      width: 100px;
      height: 50px;
      background: #ebb563;
      margin-left: 5px;
    }

  }
</style>
