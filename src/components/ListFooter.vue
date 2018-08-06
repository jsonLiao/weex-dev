<template>
  <div class="footbox">
    <div class="line"></div>
    <text class="text">精 选 速 购</text>
    <div class="line"></div>
  </div>
</template>
<script>
  export default {
    title: 'ListFooter'
  }
</script>

<style>
  .footbox {
    height: 88px;
    width: 750px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
  .text {
    font-size: 26px;
    color: #ccc;
    padding: 15px;
  }
  .line {
    width: 70px;
    height: 1px;
    background-color: #ababab;
  }
</style>