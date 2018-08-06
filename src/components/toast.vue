<template>
  <section class="toastWrap">
    <div class="toast" v-bind:class="[visible?'fade-in':'fade-out']">
      <text class="titles">{{message}}</text>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'toast',
    data() {
      return {
        visible: true,
        message: ''
      }
    }
  }
</script>

<style>
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.7);
    }
  }
  .toastWrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5000!important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fade-in {
    animation-name: fade-in;
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
  .fade-out {
    animation-name: fade-out;
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
  .toast {
    max-width: 85%;
    min-height: 88px;
    position: relative;
    background-color: #141414;
    border-radius: 10px;
    overflow: hidden;
    justify-content: center;
    text-align: center;
    padding: 20px 50px;
  }
  .titles {
    font-size: 26px;
    color: #fff;
  }
</style>
