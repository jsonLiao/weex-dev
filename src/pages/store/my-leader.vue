<template>
  <div id="app" class="my-group">
    <navigation-bar title="我的领袖" />
    <div class="content" v-if="!isNoLeader">
      <template v-for="(item, idx) of teamLeaderData">
  			<div class="content-item" :key="idx">
  				<!-- 领袖昵称，等级/s -->
  				<div class="bline item-title">
  					<div class="item-title-left">
  						<text class="user-level">{{item.rankName}}</text>
  						<text class="badge" v-if="+item.isNew === 1">new</text>
  					</div>
  					<text class="item-title-right">{{item.teamName}}</text>
  				</div>
  				<!-- 领袖头像，昵称，云店等级/s -->
  				<div class="item-body">
  					<div class="info">
  						<div class="user-avatar">
  							<image class="user-pic"
  									:src="item.headPic" />
  						</div>
  						<div class="user-info">
  							<text class="nickname">{{item.nickname}}</text>
  							<div class="info-box">
  								<div class="user-grade">
  									<image :src="item.rankImg"
  												class="grade-icon" />
  									<text class="user-rank">{{item.rankImgName}}</text>
  								</div>
  							</div>
  						</div>
  					</div>
  				</div>
  				<!-- 领袖微信号，手机号/s -->
  				<div class="item-footer">
  					<div class="bline item-box phone">
  						<text class="title">手机号</text>
  						<div class="item-bottom phone-number">
  							<text>{{item.mobilePhone.length ? item.mobilePhone : '未留手机号'}}</text>
  							<div class="btns" v-if="item.mobilePhone.length">
  								<div class="nicon-box" @click="onCopyPhone(item.mobilePhone)"><text class="nicon nicon-copy">&#xe60f;</text></div>
  								<div class="nicon-box nicon-box-phone" @click="onCallPhone(item.mobilePhone)"><text class="nicon nicon-phone">&#xe610;</text></div>
  							</div>
  						</div>
  					</div>
  					<div class="item-box wechat">
  						<text class="title">微信</text>
  						<div class="item-bottom wechat-number">
  							<text>{{item.wechat.length ? item.wechat : '未留微信号'}}</text>
  							<div class="btns" v-if="item.wechat.length">
  								<div class="nicon-box" @click="onCopyWechat(item.wechat)"><text class="nicon nicon-copy">&#xe60f;</text></div>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
</template>
</div>
<!-- 没有领袖/s -->
<JxsgPageNone :sm-title="tips"
									:default-pic="defaultPicLast"
									:is-leader="isLeader"
									:is-custom="isCustom"
                  v-if="isNoLeader" />

<!-- 弹窗/s -->
<jxsg-dialog content="微信号复制成功，打开微信添加好友"
              :showDialog = 'dshow'
              @jxsgDialogConfirmBtnClicked="callWeiXinApp"
              @jxsgDialogCancelBtnClicked="dialogCancel" >
              </jxsg-dialog>
</div>
</template>
<script>
  import JxsgPageNone from "./../../components/JxsgPageNone.vue";
  import NavigationBar from "./../../components/NavigationBar.vue";
  import JxsgDialog from './../../components/JxsgDialog.vue';
  import util from "./../../utils/util";
  import {
    getTeamLeader
  } from "./../../api/team-leader-api.js";
  import mixins from "./../../mixins/index.js";
  const navigator = weex.requireModule("navigator");
  const clipboard = weex.requireModule("clipboard");
  const appInfo = weex.requireModule("JXSGApp");
  const isInstalledWeixin = true;
  export default {
    data() {
      return {
        isNoLeader: false,
        show: false,
        teamLeaderData: [],
        isLeader: 1,
        isCustom: true,
        dshow: false,
        copyTarget: "Wechat",
        imgs: "", // 图片域名
        tips: "恭喜，你是本团队的最高领袖",
        copyText: "微信号复制成功，打开微信添加好友",
        defaultPicLast: "",
        defaultPic: ""
      };
    },
    mixins: [mixins],
    computed: {},
    components: {
      NavigationBar,
      JxsgPageNone,
      "jxsg-dialog": JxsgDialog
    },
    methods: {
      //请求我的领袖数据
      fetchLeadeData() {
        getTeamLeader({
            type: 2
          }).then(res => {
            if (res.lists.length) {
              //有数据
              this.teamLeaderData = res.lists;
            } else {
              //没有数据
              this.isNoLeader = true;
              // this.isLeader = res.isLeader
            }
          })
          .catch(err => {
            console.error(err.msg);
          });
      },
      /**
       * 复制微信号码
       * @param	[String] phNum 要复制的微信号码
       */
      onCopyWechat(wxNum) {
        //如果还是web环境打开
        if (util.env.isWeb()) {
          this.toast("长按微信号复制");
          return;
        }
        //app中打开则调用粘贴板模块功能
        clipboard.setString(wxNum);
        clipboard.getString(ret => {
          if (ret.result) {
            //如果没有安装微信则弱提示
            if (!isInstalledWeixin) {
              this.toast("微信号复制成功");
            } else {
              this.copyTarget = "Wechat";
              this.copyText = "微信号复制成功，打开微信添加好友";
              this.dshow = true;
            }
          } else {
            this.toast("微信号复制失败");
          }
        });
      },
      /**
       * 复制手机号码
       * @param	[String] phNum 要复制的手机号码
       */
      onCopyPhone(phNum) {
        this.toast();
        if (util.env.isWeb()) {
          this.toast("长按手机号复制");
          return;
        }
        clipboard.setString(phNum);
        clipboard.getString(ret => {
          if (ret.result) {
            this.copyTarget = "phone";
            this.copyText = "手机号码复制成功";
            this.toast("手机号码复制成功");
            this.show = false;
          } else {
            this.toast("手机号复制失败");
          }
        });
      },
      /**
       * 拨打手机号码
       * @param	[String] phNum 要拨打的手机号码
       */
      onCallPhone(phNum) {
        if (util.env.isWeb()) {
          this.toast("长按手机号复制");
          return;
        }
        this.show = false;
        appInfo.dialWithPhoneNumber(phNum);
      },
      dialogCancel() {
        this.dshow = false;
      },
      callWeiXinApp() {
        this.dshow = false;
        if (this.copyTarget === "Wechat") {
          appInfo.openWechat();
        }
      },
    },
    created() {
      let self = this;
      this.imgs = this.imgHost();
      this.defaultPicLast = this.imgs + 'group_leader.png';
      this.defaultPic = this.imgs + 'group_leader2.png';
      this.fetchLeadeData();
    }
  };
</script>

<style>
  .my-group {
    width: 750px;
    background-color: #f7f7f7;
  }
  .content-item{
    background-color: #fff;
    margin-bottom: 16px;
  }
  .item-title {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;
    height: 77px;
  }
  .item-title-left {
    flex-direction: row;
    align-items: center;
  }
  .item-title-right {
    color: #999;
    font-size: 28px;
  }
  .user-level {
    align-self: center;
    color: #333;
    font-size: 30px;
  }
  .weex-root .badge,
  .badge {
    margin-left: 11px;
  }
  .badge {
    width: 65px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    font-size: 22px;
    color: #fff;
    background-color: #fb3081;
  }
  .item-body {
    padding-top: 27px;
    padding-right: 40px;
    padding-bottom: 27px;
    padding-left: 27px;
    overflow: hidden;
  }
  .info {
    flex-direction: row;
  }
  .user-avatar {
    width: 124px;
    height: 124px;
    margin-right: 22px;
    border-radius: 62px;
    overflow: hidden;
  }
  .user-pic {
    width: 124px;
    height: 124px;
    border-radius: 62px;
  }
  .user-info {
    justify-content: center;
    height: 124px;
  }
  .nickname {
    lines: 1;
    font-size: 32px;
    color: #202020;
  }
  .user-grade {
    flex-direction: row;
    align-items: center;
    width: 134px;
    height: 40px;
    margin-top: 18px;
    padding-left: 6px;
    border-radius: 20px;
    font-size: 22px;
    color: #666;
    background-color: #eaeaea;
  }
  .weex-root .user-rank,
  .user-rank {
    padding-left: 8px;
  }
  .user-rank {
    padding-right: 17px;
    font-size: 22px;
    color: #666;
  }
  .grade-icon {
    width: 20px;
    height: 20px;
  }
  .item-bottom {
    flex-direction: row;
    align-items: center;
  }
  .bline {
    border-bottom-width: 1px;
    border-top-style: solid;
    border-bottom-color: #eaeaea;
  }
  .item-box {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 27px;
    padding-bottom: 27px;
  }
  .title {
    font-size: 28px;
    color: #cbcbcb;
  }
  .phone-number {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btns {
    flex-direction: row;
    justify-content: center;
  }
  .nicon-box {
    width: 68px;
    height: 68px;
    border-width: 1px;
    border-color: #666;
    border-radius: 35px;
    justify-content: center;
    align-items: center;
  }
  .nicon {
    font-family: iconfont;
    font-size: 32px;
    color: #666;
  }
  .nicon-box-phone {
    margin-left: 27px;
  }
  .title {
    font-size: 28px;
    color: #cbcbcb;
  }
  .wechat-number {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dialog-box {
    border-radius: 20px !important;
  }
  .wx-tips {
    font-size: 32px;
    color: #414141;
  }
  .footer-btn .btn-text {
    font-size: 32px;
  }
  .nicon-copy{
    font-size: 34px;
		color: #666;
	}
	.nicon-phone{
    font-size: 34px;
		color: #666;
	}
</style>