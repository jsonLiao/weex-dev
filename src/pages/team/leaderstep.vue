<template>
  <div class="wrapper">
    <navigation-bar :title="teamName" />
    <scroller class="scroller">
      <div class="tips-cell" v-if="status">
        <text class="text status-name">{{statusText}}</text>
      </div>
      <div class="user-cell">
        <image class="user-img" :src="userMsg.headPic"></image>
        <text class="user-name">{{userMsg.nickname}}</text>
        <text class="user-domain">{{userMsg.domain}}</text>
        <div class="rank">
          <image class="rank-img" :src="userMsg.rankImg"></image>
          <div class="hv">
            <text class="rank-name">{{userMsg.shareholderName}}</text>
          </div>
        </div>
      </div>
      <div class="hline"></div>
      <div class="box-cell">
        <text class="box-hd">身份认证test</text>
        <div class="box-bd upload-cell" v-if="!sendMsg.userImg">
          <image class="upload-img" @click="chooseImage" :src="imgs+'upload-icon.png'"></image>
          <text class="upload-sm">上传身份证/护照（正面）照片</text>
        </div>
        <div class="box-bd upload-cell" v-if="sendMsg.userImg">
          <div class="upload-content">
            <image class="upload-pic" :src="sendMsg.userImg"></image>
          </div>
          <image v-if="+checkStatus !== 0" class="update-btn" @click="chooseImage" :src="imgs+'chc.png'"></image>
        </div>
      </div>
      <div class="hline"></div>
      <div class="box-cell">
        <text class="box-hd">个人介绍</text>
        <div class="box-bd">
          <text class="textarea" v-if="+checkStatus == 0">{{sendMsg.intro}}个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标个人介绍+收入目标</text>  
          <textarea v-else class="textdof" disabled placeholder="个人介绍+收入目标" @input="oninput" @change="onchange" :value="sendMsg.intro"></textarea>  
        </div>
      </div>
      <div class="hline"></div>
      <div class="box-cell">
        <text class="box-hd">遵守规范</text>
        <div class="box-bd">
          <text class="rules-desc">{{ruleTit}}</text>
          <ol class="rules">
            <li class="rules-item" v-for="(items, index) in ruleText" :key="index">
              <text class="rules-num">{{index+1}}、</text><text class="rules-desc">{{items}}</text>
            </li>
          </ol>
          <div class="check-cell">
            <div class="row">
              <text class="nicon nicon-checked">&#xe67a;</text>
              <div class="hv">
                <text class="aread">我已阅读并同意以上规范</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hline"></div>
      <div class="foot-posi"></div>
      <wxc-button v-if="+checkStatus === 0" text="已提交申请" type="" :btn-style="btnStyleDefault" :text-style="textStyle"></wxc-button>
      <wxc-button v-else-if="+checkStatus === 2" text="重新提交申请" type="" :btn-style="btnStyle" :text-style="textStyle" @wxcButtonClicked="submitData"></wxc-button>
      <wxc-button v-else text="提交申请" type="" :btn-style="btnStyle" :text-style="textStyle" @wxcButtonClicked="submitData"></wxc-button>
    </scroller>
    <!-- 弹窗 -->
    <wxc-mask height="345" width="590" border-radius="20" duration="200" mask-bg-color="#FFFFFF" :has-animation="hasAnimation" :has-overlay="true" :show-close="false" :show="show" @wxcMaskSetHidden="wxcMaskSetHidden">
      <div class="content content-status">
        <div class="status-icon">
          <text class="nicon nicon-success">&#xe67a;</text>
        </div>
        <text class="content-text">提交成功，正在等待审核</text>
      </div>
    </wxc-mask>
  </div>
</template>

<script>
  import {
    WxcButton,
    WxcMask,
    WxcCell
  } from 'weex-ui'
  import util from "./../../utils/util.js";
  import {
    getUserInfo
  } from './../../api/userinfo.js';
  import {
    setApplicationTeamLeader,
    getApplicationTeamInfo
  } from './../../api/team-leader-api.js';
  import mixins from "./../../mixins/index.js";
  import NavigationBar from "./../../components/NavigationBar.vue";
  const picker = weex.requireModule("YTImagePicker");
  export default {
    components: {
      "navigation-bar": NavigationBar,
      "wxc-button": WxcButton,
      "wxc-mask": WxcMask
    },
    mixins: [mixins],
    data() {
      return {
        title: "精选速购-随心省，随心赚",
        imgs: '', // 图片域名
        userMsg: [],
        status: false,
        checkStatus: '1',
        statusText: '', // 状态文案 
        ruleTit: '', // 规则说明小标题
        ruleText: [], // 规则说明
        teamName: '', // 申请标题
        sendMsg: {
          userId: '',
          teamRank: '', // 申请领袖等级
          userImg: '', // 身份证
          intro: '' // 个人介绍
        },
        btnStyle: {
          position: 'fixed',
          bottom: 0,
          width: '750px',
          height: '90px',
          backgroundColor: '#fb3180',
          borderRadius: '0px',
        },
        btnStyleDefault: {
          position: 'fixed',
          bottom: 0,
          width: '750px',
          height: '90px',
          backgroundColor: '#ccc',
          borderRadius: '0px',
        },
        textStyle: {
          fontSize: '32px',
        },
        upfileImg: '',
        show: false,
        overlayCanClose: true,
        isFalse: false,
        hasAnimation: false
      };
    },
    created() {
      this.imgs = this.imgHost();
      this.initUserInfo();
      this.initTitle();
      let ix = util.env.isIPhoneX();
      if(ix){
        this.btnStyle.height = '124px';
        this.btnStyle.paddingBottom = '34px';
        this.btnStyleDefault.height = '124px';
        this.btnStyleDefault.paddingBottom = '34px';
      }
    },
    methods: {
      // 用户信息
      initUserInfo() {
        let self = this;
        getUserInfo().then(res => {
          self.userMsg = res;
          self.sendMsg.userId = res.userId;
          self.getData();
        }).
        catch(err => {
          self.toast(err.msg);
        })
      },
      // 设置页面标题
      initTitle() {
        util.env.isWeb() && this.setTitle(this.title);
      },
      // 图片选择 app
      chooseImage() {
        let self = this;
        let pics = self.imageHost();
        let str = JSON.stringify({'title': '上传证照','cropWidth': 750,'cropHeight': 475});

        picker.imagePicker(str, (success) => {
          let src = success.imageUrl;
          this.sendMsg.userImg = pics + src;
        }, (failure) => {
          this.toast(failure.msg);
        });
      },
      // 提交申请
      submitData() {
        let self = this;
        if (!this.sendMsg.userImg) {
          self.toast('未上传身份证/护照照片');
          return
        }
        if (!this.sendMsg.intro) {
          self.toast('个人介绍未填写');
          return
        }
        if (this.sendMsg.intro.length > 1000) {
          self.toast('个人介绍不能超过1000个字');
          return
        }
        //self.toast(JSON.stringify(self.sendMsg))
        self.setData();
      },
      // 提交申请发送请求
      setData() {
        let self = this;
        setApplicationTeamLeader(self.sendMsg).then(res => {
          if (+res.status === 1) {
            self.openMask();
            self.getData();
          }
        }).catch(err => {
          self.toast(err.msg);
        })
      },
      // 状态回显
      getData() {
        let self = this;
        let str = null;
        getApplicationTeamInfo({
          userId: self.sendMsg.userId
        }).then(res => {
          if (res.checkMsg) {
            self.status = true;
            self.statusText = res.checkMsg;
            self.checkStatus = res.checkStatus;
          }
          self.teamName = res.teamName;
          self.sendMsg.teamRank = res.teamRank;
          self.sendMsg.userImg = res.userImg;
          self.sendMsg.intro = res.introduce;
          str = res.rule.split('\n');
          this.ruleTit = str[0];
          str.shift();
          this.ruleText = str.map(item => {
            if (/^[0-9]+.?[0-9]*/.test(item[0]) && item[1] == "、") {
              return item.slice(2, item.length)
            }
          })
        }).catch(err => {
          this.toast(err.msg)
        })
      },
      // 弹窗
      openMask(e) {
        this.show = true;
        if (!util.env.isWeb()) {
          this.hasAnimation = true;
        }
      },
      wxcMaskSetHidden() {
        this.show = false;
      },
      openNoAnimationMask(e) {
        this.show = true;
        this.hasAnimation = false;
      },
      oninput(event) {
        this.sendMsg.intro = event.value;
      },
      onchange(event) {},
      onfocus(event) {},
      onblur(event) {}
    }
  };
</script>

<style scoped>
  .hline {
    width: 750px;
    height: 16px;
    background-color: #f7f7f7;
  }
  .scroller {
    width: 750px;
    left: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #eaeaea;
    background-color: #fff;
  }
  .tips-cell {
    background-color: #FCF1CF;
    justify-content: center;
    align-items: center;
    padding: 26px 0;
    min-height: 90px;
  }
  .status-name {
    text-align: center;
    padding: 2px 40px;
    font-size: 28px;
    color: #6E6445;
  }
  .weex-text {
    font-size: 22px;
  }
  .row {
    flex-direction: row;
  }
  .user-cell {
    height: 370px;
    justify-content: center;
    align-items: center;
    background-color:#fff;
  }
  .user-img {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    margin-bottom: 14px;
    border-width: 6px;
    border-style: solid;
    border-color: #fff;
  }
  .user-name {
    color: #202020;
    font-size: 32px;
    height: 45px;
    justify-content: center;
    font-weight: bold;
  }
  .rank {
    height: 50px;
    background-color: #f8f8f8;
    border-radius: 30px;
    flex-direction: row;
  }
  .rank-img {
    width: 34px;
    height: 34px;
    margin-left: 8px;
    margin-right: 11px;
    margin-top: 8px;
  }
  .user-domain {
    color: #999;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .hv {
    justify-content: center;
  }
  .rank-name {
    color: #999;
    font-size: 22px;
    padding-right: 20px;
  }
  .box-cell {
    padding-left: 40px;
    padding-right: 40px;
  }
  .box-hd {
    padding-top: 24px;
    padding-bottom: 20px;
    font-weight: bold;
    color: #202020;
    font-size: 30px;
  }
  .box-bd {
    padding-bottom: 42px;
  }
  .upload-img {
    width: 148px;
    height: 148px;
    margin-bottom: 7px;
  }
  .upload-content {
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
  }
  .upload-pic {
    width: 360px;
    height: 228px;
  }
  .upload-sm {
    font-size: 26px;
    color: #999;
  }
  .upload-cell {
    position: relative;
    padding-top: 20px;
    justify-content: center;
    align-items: center;
  }
  .textarea {
    min-height: 180px;
    font-size: 28px;
    color: #202020;
    padding-left: 0;
    background-color: #fff;
    line-height: 42px;
    placeholder-color: #ccc;
  }
  .textdof {
    min-height: 180px;
    font-size: 28px;
    color: #202020;
    padding-left: 0;
    line-height: 42px;
    placeholder-color: #ccc;
  }
  .rules {
    list-style-type: none;
    counter-reset: sectioncounter;
    margin-top: 10px;
  }
  .rules-item {
    position: relative;
    padding-left: 36px;
    margin-bottom: 5px;
  }
  .rules-num {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 28px;
    color: #999;
  }
  .rules-desc {
    font-size: 28px;
    color: #999;
  }
  .nicon {
    font-family: iconfont;
  }
  .nicon-checked {
    font-size: 28px;
    color: #fb3180;
    margin-top: 4px;
    margin-right: 8px;
  }
  .check-cell {
    padding-top: 40px;
    align-items: center;
  }
  .aread {
    font-size: 26px;
    color: #999;
  }
  .foot-posi {
    height: 90px;
  }
  .nicon-success {
    font-size: 120px;
    color: #1aac18;
  }
  .status-icon {
    padding-top: 70px;
    padding-bottom: 30px;
  }
  .content-status {
    align-items: center;
  }
  .content-text {
    font-weight: bold;
    font-size: 36px;
    color: #414141;
  }
  .update-btn {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 59px;
    bottom: 146px;
  }
</style>