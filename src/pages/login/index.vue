<template>
  <div>
    <div style="height:88px;">
      <div class="action-back"><i class="nicon nicon-fork">&#xe677;</i></div>
    </div>
    <div style="align-items:center; padding-top:64px; padding-bottom:64px;">
      <image class="img" style="width: 304px; height: 99px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATAAAABjCAYAAAAcllweAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0QxMDc4RTBDQjQxMTFFNzg2MjZENUE5QjREODFBMTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0QxMDc4RTFDQjQxMTFFNzg2MjZENUE5QjREODFBMTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRDEwNzhERUNCNDExMUU3ODYyNkQ1QTlCNEQ4MUExNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRDEwNzhERkNCNDExMUU3ODYyNkQ1QTlCNEQ4MUExNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuF7wJUAABktSURBVHja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"></image>
    </div>
    <div style="align-items:center;">
      <div class="form">
        <div class="hd row">
          <div class="sub item" :class="[tabIndex == 0 ? 'tabs-active' : '']" @click="changeTab(0, 'tab-a')"><text>账号密码登录</text></div>
          <div class="sub item" :class="[tabIndex == 1 ? 'tabs-active' : '']" @click="changeTab(1, 'tab-b')"><text>手机快捷登录</text></div>
        </div>
        <div class="bd tabs-content">
          <keep-alive>
            <component :is="currentContent">
            </component>
          </keep-alive>
        </div>
        <wxc-button text="立即登录" type="" :btn-style="btnStyle" :text-style="textStyle" @wxcButtonClicked="toLogin"></wxc-button>
      </div>
    </div>
  </div>
</template>

<script>
  import tabA from './tab-a.vue'
  import tabB from './tab-b.vue'
  import {
    WxcButton,
    WxcCell
  } from 'weex-ui'
  export default {
    components: {
      WxcButton,
      tabA,
      tabB
    },
    data() {
      return {
        tabIndex: 0,
        currentContent: 'tab-a',
        btnStyle: {
          width: '100%',
          height: '90px',
          backgroundColor: '#fb3180',
          borderRadius: '0px',
          marginTop: '60px'
        },
        textStyle: {
          fontSize: '32px',
        }
      }
    },
    created() {
      
    },
    methods: {
      changeTab(index, con) {
        this.tabIndex = index
        this.currentContent = con
      },
      toLogin(){
        console.log('logining', 'go');
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    background: #f7f7f7;
  }
  .nicon {
    font-family: iconfont;
    font-size: 27px;
    color: #666;
  }
  .action-back {
    width: 67px;
    height: 88px;
    margin-left: 660px;
    line-height: 88px;
    justify-content: center;
    text-align: center;
  }
  .form,
  .hd,
  .bd {
    width: 650px;
  }
  .bd {
    padding-top: 40px;
  }
  .sub {
    padding-top: 10px;
    padding-bottom: 17px;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color:#fff;
  }
  .item {
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  .row {
    flex-direction: row;
  }
  .sub .weex-text {
    color: #ababab;
    font-size: 32px;
  }
  .tabs-active {
    border-bottom-color:#fb3180;
  }
  .tabs-active .weex-text {
    color: #fb3180;
  }
</style>