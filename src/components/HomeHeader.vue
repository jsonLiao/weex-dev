<template>
  <div class="wrapper">
    <div class="notice">
      <text class="ic iconfont">&#xe69b;</text>
    </div>
    <text class="search iconfont" @click="jumpSearch()">&#xe6c1; 嘉年华</text>
    <div class="share" @click="share">
      <text class="ic iconfont">&#xe6dc;</text>
    </div>
  </div>
</template>
<script>
  import util from './../utils/util.js';
  import mixins from './../mixins/index.js'
  
  export default {
    mixins:[mixins],
    data() {
      return {
        dtxt: ''
      }
    },
    created() {},
    methods: {
      jumpSearch() {
        let self = this;
        //h5
        console.log(util.env.isWeb());
        if(util.env.isWeb()){
          self.jump('/search');
          return false;
        }
        // app
        let url = self.setBundleUrl('search.js');
        util.jumpToLink(url);
      },
      share() {
          //this.handle('/provider/share');   
      },
    }
  }
</script>
<style scoped>
  .iconfont {
    font-family: iconfont;
  }
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    z-index: 101;
    padding: 20px 0;
    background-color: #fff;
  }
  .w-ipx {
    height: 154px;
    padding-top: 84px;
  }
  .share,
  .notice {
    height: 68px;
    width: 96px;
    justify-content: center;
    align-items: center;
  }
  .ic,
  .search {
    text-align: center;
    color: #666;
    font-weight: 300;
  }
  .ic {
    font-size: 38px;
    color: #202020;
  }
  .txt {
    font-size: 18px;
  }
  .search {
    flex: 1;
    height: 68px;
    line-height: 68px;
    font-size: 26px;
    background-color: #ededed;
  }
</style>