<template>
  <div class="wrapper">
    <navigation-bar title="精选速购" backgroundColor="linear-gradient(to bottom, #C1934C, #D9B87D)" textColor="#fff" share="true" />
    <!-- <home-header></home-header> -->
    <!-- <top-channel></top-channel> -->
    <scroller class="scroller">
      <div class="tab-cell row">
        <div class="tab">
          <text class="tab-title">132</text>
        </div>
        <div class="tab">
          <text class="tab-title">132</text>
        </div>
        <div class="tab">
          <text class="tab-title">132</text>
        </div>
        <div class="tab">
          <text class="tab-title">132</text>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import util from './../../utils/util';
  import api from './../../api/api';
  import mixins from './../../mixins/index.js';
  import Header from './../../components/HomeHeader.vue';
  import TopChannel from './../../components/TopChannel.vue';
  import NavigationBar from './../../components/NavigationBar.vue';
  export default {
    components: {
      'home-header': Header,
      'top-channel': TopChannel,
      'navigation-bar': NavigationBar
    },
    mixins: [mixins],
    data() {
      return {
        title: '精选速购-随心省，随心赚',
        status: 'loading',
      }
    },
    created() {
      this.initPageData();
      this.initTitle();
    },
    methods: {
      initPageData() {
        let self = this;
        api.getUserInfo((res) => {
          self.toast(res);
          console.log('res', res)
          this.status = res;
          if (res.status == '-1') {
            //h5
            if (util.env.isWeb()) {
              //self.jump('/login/index');
              return false;
            }
            // app
            let url = self.setBundleUrl('login.js');
            util.jumpToLink(url);
          }
        }, (error) => {
          //self.toast(123456)
          console.log('error', error)
        });
      },
      // 设置页面标题
      initTitle() {
        util.env.isWeb() && this.setTitle(this.title);
      },
    }
  }
</script>

<style scoped>
  .scroller {
    width: 750px;
    left: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
  }
  .loading {
    height: 2000px;
  }
</style>