<template>
  <div :class="['top-bar', ios ? '':'header-bar']" :style="{ backgroundImage: backgroundColor, height: naviBarClass + 'wx'}">
    <div :class="[ios ? 'wxc-minibar-ios':'wxc-minibar']" v-if="show">
      <div class="left" @click="leftButtonClicked" aria-label="返回" :accessible="true">
        <slot name="left">
          <div class="action-back" v-if="leftButton && !leftText"><text class="nicon nicon-arrow-left" :style="{ color: textColor }">&#xe673;</text></div>
          <div class="action-text" v-if="leftText"><text class="icon-text" :style="{ color: textColor }">{{leftText}}</text></div>
        </slot>
      </div>
      <slot name="middle">
        <text class="middle-title" :style="{ color: textColor }">{{title}}</text>
      </slot>
      <div class="right" @click="rightButtonClicked">
        <slot name="right">
          <text v-if="share" class="nicon nicon-share" :style="{ color: textColor }">&#xe6dc;</text>
          <text v-if="rightText" class="icon-text" :style="{ color: textColor }">{{rightText}}</text>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  import util from './../utils/util.js';
  import mixins from './../mixins/index.js';
  const modal = weex.requireModule("modal");
  const systemInfo = weex.requireModule("systemInfo");
  const Navigator = weex.requireModule("navigator");
  const user = weex.requireModule("JXSGApp");

  export default {
    data() {
      return {
        isIos: false
      }
    },
    mixins: [mixins],
    computed: {
      // ios 头部处理
      naviBarClass() {
        if (this.ios) {
          if (systemInfo.isIphoneX()) {
            return 88;
          }
          return 64;
        }
        return '';
      }
    },
    created() {
      this.isIos = this.ios;
      util.initIconFont();
    },
    methods: {
      leftButtonClicked() {
        const self = this;
        if (self.useDefaultReturn) {
          if (self.ios) {
            Navigator.pop({}, e => {});
          }
          if(self.android){
            user.closeCurrentPage();
          }
          if(self.web){
            if (self.backPrev) {
              self.jump(self.backPrevUrl);
            } else {
              this.$router.back(-1);
            }
          }
        }
        self.$emit("wxcMinibarLeftButtonClicked", {});
      },
      rightButtonClicked() {
        const self = this;
        if (self.rightText || self.rightButton) {
          if (self.web) {
            self.jump(self.rightUrl);
            return
          }
          // app
          let url = self.setBundleUrl(self.rightAppUrl);
          util.jumpToLink(url);
        }
        this.rightFun();
      }
    },
    props: {
      //背景色
      backgroundColor: {
        type: String,
        default: "#fff"
      },
      // 返回标识 
      leftButton: {
        type: String,
        default: "http://statics.jxsg.com/mnew/images/left_return.jpg"
      },
      // web端 是否开启指定路径跳转
      backPrev: {
        type: Boolean,
        default: false
      },
      // web端 指定路径跳转链接
      backPrevUrl: {
        type: String,
        default: "/home/index"
      },
      //标题字体颜色
      textColor: {
        type: String,
        default: "#333"
      },
      rightButton: {
        type: String,
        default: ""
      },
      // 标题
      title: {
        type: String,
        default: "精选速购"
      },
      // 左侧文案
      leftText: {
        type: String,
        default: ""
      },
      // 右侧文案
      rightText: {
        type: String,
        default: ""
      },
      rightAppUrl: {
        type: String,
        default: ""
      },
      // 右侧跳转链接
      rightUrl: {
        type: String,
        default: ""
      },
      // 分享
      share: {
        type: String,
        default: ""
      },
      useDefaultReturn: {
        type: Boolean,
        default: true
      },
      show: {
        type: Boolean,
        default: true
      },
      rightFun: {
        type: Function,
			  default: function(params) {}
      }
    }
  };
</script>

<style scoped>
  .top-bar {
    position: fixed;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 100;
    width: 750px;
    background-color: #fff;
  }
  .nicon {
    font-family: iconfont;
    color: #000;
  }
  .nicon-arrow-left {
    font-size: 40px;
  }
  .nicon-share {
    font-size: 40px;
  }
  .wxc-minibar-ios {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 44wx;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .header-bar {
    height: 88px;
  }
  .wxc-minibar {
    height: 88px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: none;
  }
  .left {
    width: 180px;
    height: 88px;
    padding-left: 40px;
    flex-direction: row;
    justify-content: center;
  }
  .row {
    flex-direction: row;
  }
  .middle-title {
    font-weight: bold;
    font-size: 32px;
    color: #ffffff;
  }
  .right {
    width: 180px;
    padding-right: 40px;
    align-items: flex-end;
  }
  .right-button {
    width: 22wx;
    height: 22wx;
  }
  .icon-text {
    font-size: 30px;
    color: #ffffff;
  }
  .action-back {
    width: 40px;
    flex: 1;
    justify-content: center;
  }
  .action-text {
    flex: 1;
    justify-content: center;
  }
</style>