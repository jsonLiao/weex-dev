<template>
  <div>
    <div class="input-group">
      <input class="input" type="text" placeholder="请输入您的手机号码" />
    </div>
    <div class="input-group">
      <input class="input" style="width:430px;" type="text" placeholder="请输入4位验证码" />
    </div>
  </div>
</template>

<script>
  import {
    WxcCell,
    Utils
  } from 'weex-ui';
  export default {
    components: {
      WxcCell
    },
    props: {},
    data: () => ({}),
    computed: {}
  };
</script>

<style scoped>
  .input-group .nicon {
    color: #999;
    margin: 0 10px;
  }
  .input-group {
    position: relative;
    height: 114px;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
  }
  .input-group ::-webkit-input-placeholder {
    color: #ababab;
  }
  .input-group .send-code {
    background: #ddd;
    color: #fff;
    font-size: 24px;
    border-color: #efefef;
    padding: 17px 14px;
    margin-left: 30px;
    width: 150px;
  }
  .input-group .send-code-pink {
    font-size: 24px;
    padding: 15px 14px;
    margin-left: 30px;
    color: #fff;
    background-color: #666;
    border-color: #666;
    width: 120px;
  }
  .input-group input {
    display: block;
    width: 100%;
    height: 40px;
    font-size: 28px;
    padding-right:10px;
    justify-items: center;
    color: #333;
    background-color: #fff;
    border: 0;
    outline: none;
  }
</style>