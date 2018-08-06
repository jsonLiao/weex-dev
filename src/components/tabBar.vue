<template>
  <div class="wrapper">
    <div class="bar-item" @click="tabTo('home/index')">
      <text class="bar-ic iconfont" :class="[this.isActive('home/index')]">&#xe6d0;</text>
      <text class="bar-txt" :class="[this.isActive('home/index')]">首页</text>
    </div>
    <div class="bar-item" @click="tabTo('sort/index')">
      <text class="bar-ic iconfont" :class="[this.isActive('sort/index')]">&#xe6c3;</text>
      <text class="bar-txt" :class="[this.isActive('sort/index')]">分类</text>
    </div>
    <div class="bar-item" @click="tabTo('store/index')">
      <text class="bar-ic iconfont" :class="[this.isActive('store/index')]">&#xe6c3;</text>
      <text class="bar-txt" :class="[this.isActive('store/index')]">开店</text>
    </div>
    <div class="bar-item" @click="tabTo('shop/index')">
      <text class="bar-ic iconfont" :class="[this.isActive('shop/index')]">&#xe683;</text>
      <text class="bar-txt" :class="[this.isActive('shop/index')]">购物车</text>
      <text class="i-notice">9</text>
    </div>
    <div class="bar-item" @click="tabTo('user/index')">
      <text class="bar-ic iconfont" :class="[this.isActive('user/index')]">&#xe68a;</text>
      <text class="bar-txt" :class="[this.isActive('user/index')]">个人中心</text>
    </div>
  </div>
</template>
<script>
  var modal = weex.requireModule('modal');
  export default {
    computed: {},
    data() {
      return {
        pIndexKey: 'home/index'
      }
    },
    mounted() {
      this.refrechTab()
    },
    methods: {
      isActive: function(_c) {
        return this.pIndexKey === _c ? 'bar-active' : ''
      },
      tabTo(_key) {
        if (this.pIndexKey === _key) return;
        this.pIndexKey = _key;
        this.$emit('tabTo', {
          status: 'tabTo',
          data: {
            key: _key
          }
        })
      },
      refrechTab(){
        let key = window.location.hash;
        key = key.split('#/')[1];
        this.pIndexKey = key;
        this.$router && this.$router.push('/' + key)
      }
    }
  }
</script>
<style scoped>
  .iconfont {
    font-family: iconfont;
  }
  .wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    border-top-width: 1px;
    border-top-color: #d9d9d9;
    background-color: #f5f5f5;
  }
  .w-ipx {
    height: 140px;
  }
  .bar-item {
    flex: 1;
  }
  .bar-txt,
  .bar-ic {
    color: #666;
    text-align: center;
  }
  .bar-active {
    font-weight: bold;
    color: #fb3180;
  }
  .bar-ic {
    padding-top: 14px;
    font-size: 38px;
  }
  .bar-txt {
    font-size: 22px;
    padding-top: 8px;
  }
  .i-notice {
    position: absolute;
    top: 10px;
    right: 30px;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    font-size: 26px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: #f00;
  }
  .notice-dot {
    position: absolute;
    top: 15px;
    right: 40px;
    height: 15px;
    width: 15px;
    border-radius: 100%;
    background-color: #f00;
  }
</style>