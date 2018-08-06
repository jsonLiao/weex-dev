<template>
	<div class="wrapper">
		<!-- 顶部导航 s-->
		<navigation-bar :title="teamName" backgroundColor="linear-gradient(to right, #C1934C, #D9B87D)" textColor="#fff" rightText="编辑" :rightFun="jumpEidt" rightUrl="/store/my-group-eidt" rightAppUrl="store/my-group-eidt.js" />
		<!-- 主体内容 s-->
		<scroller class="scroller" @loadmore="fetch" loadmoreoffset="10">
			<!-- 社群信息 -->
			<div class="group-tips-cell" v-if="tipsShow">
				<div class="row">
					<text class="item nicon nicon-broadcast">&#xe6bb;</text>
					<text class="group-tips-text">{{tipsText}}</text>
					<text class="item nicon nicon-fork" @click="closeTips">&#xe677;</text>
				</div>
			</div>
			<div class="group-info">
				<div class="row group-cell">
					<text class="nick-name">{{nickName}}</text>
					<div class="item"><text class="rank-name">{{rankName}}</text></div>
				</div>
				<text class="group-atit">社群总云店数</text>
				<div class="row">
					<text class="text group-number pingfang" @click="jumpRecord">{{ztYdNumber}}</text>
				</div>
				<div class="row" @click="jumpRecord">
					<text class="yestday" v-if="[+xzYdNumber === 0]">成长记录 </text>
					<text class="yestday" v-else>昨日 +{{xzYdNumber}}</text>
					<image class="yestday-img" :src="imgs+'group_more.png'"></image>
				</div>
				<div class="group-leader" @click="jumpLeader">
					<div class="row">
						<text class="group-tmp">我的领袖</text>
						<div class="item">
							<text class="nicon nicon-arrow-right">&#xe674;</text>
						</div>
					</div>
				</div>
			</div>
			<!-- tab 标题 -->
			<div class="tabbar">
				<div class="current" :style="{ left: activeTab * 187.5 + 'px'}"><div class="lines"></div></div>
				<div v-for="(tab, i) in tabs" :key="i" class="tab" @click="changeTab(i, tab.title)">
					<div class="tab-top"><text :class="[activeTab == i ? 'tabs-active' : 'tab-title']">{{tab.title}}</text></div>
					<text :class="[activeTab == i ? 'tabs-active-number' : 'tab-number']">{{tab.number}}</text>
				</div>
			</div>
			<!-- tab 内容 -->
			<div class="tab-panels">
				<div class="item-conm" v-for="(item, index) in lists" :key="index">
					<div class="row">
						<div class="item-hd">
							<image class="item-img" :src="item.headPic"></image>
							<div class="mark-main">
								<div class="item-mark" v-if="item.title"><text class="item-mark-text">{{item.title}}</text></div>
								<div class="item-mark" v-if="item.blacklist"><text class="item-black-text">{{item.blacklist}}</text></div>
							</div>
						</div>
						<div class="item-main">
							<div class="row">
								<text class="item-name">{{item.nickname}}</text>
								<div class="item">
									<image class="item-rank-img" :src="item.rankImg"></image>
								</div>
							</div>
							<text class="item-desc item-mid">{{item.desc}}</text>
							<div class="row">
								<text class="item-desc item-date">{{item.dateTime}}</text>
								<div class="item" v-if="+item.isNew === 1">
									<text class="item-new">NEW</text>
								</div>
							</div>
						</div>
						<div v-if="item.showContact" class="item" @click="lookUserInfo(index)">
							<image class="item-wei-img" :src="imgs+'group_weixin.png'"></image>
						</div>
					</div>
				</div>
			</div>
			<text v-if="noData" class="no-data">亲，没有记录</text>
			<div class="row" v-if="showFoot">
				<list-footer />
			</div>
		</scroller>
		<!-- 弹窗 s -->
		<jxsg-dialog content="微信号复制成功，打开微信添加好友"
		              :showDialog = 'dshow'
									@jxsgDialogConfirmBtnClicked="callWeiXinApp"
									@jxsgDialogCancelBtnClicked="dialogCancel" >
									</jxsg-dialog>

		<wxc-mask height="552" width="642" border-radius="16" duration="200" mask-bg-color="#FFFFFF" :has-animation="hasAnimation" :has-overlay="true" :show-close="false" :show="show" @wxcMaskSetHidden="wxcMaskSetHidden">
			<div class="content">
				<template v-for="(item, idx) of teamLeaderData">
									<div class="content-item" :key="idx">
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
												<text class="title-u">手机号</text>
												<div class="item-bottom phone-number">
													<text :class="[item.mobilePhone.length ? 'txt-read' : 'txt-word']">{{item.mobilePhone.length ? item.mobilePhone : '未留手机号'}}</text>
													<div class="btns" v-if="item.mobilePhone.length">
														<div class="nicon-box" @click="onCopyPhone(item.mobilePhone)"><text class="nicon nicon-copy">&#xe60f;</text></div>
														<div class="nicon-box nicon-box-phone" @click="onCallPhone(item.mobilePhone)"><text class="nicon nicon-phone">&#xe610;</text></div>
													</div>
												</div>
											</div>
											<div class="bline item-box wechat">
												<text class="title-u">微信</text>
												<div class="item-bottom wechat-number">
													<text :class="[item.wechat.length ? 'txt-read': 'txt-word']">{{item.wechat.length ? item.wechat : '未留微信号'}}</text>
													<div class="btns" v-if="item.wechat.length">
														<div class="nicon-box" @click="onCopyWechat(item.wechat)"><text class="nicon nicon-copy">&#xe60f;</text></div>
													</div>
												</div>
											</div>
										</div>
									</div>
</template>
      </div>
    </wxc-mask>

	</div>
</template>

<script>
	import Vue from "vue";
	import util from "./../../utils/util";
	import ja from "./../../utils/ja.js";
	import {
		getTeamInfo,
		getTeamInfoList
	} from "./../../api/team-leader-api.js";
	import mixins from "./../../mixins/index.js";
	import NavigationBar from "./../../components/NavigationBar.vue";
	import ListFooter from "./../../components/ListFooter.vue";
	import JxsgDialog from './../../components/JxsgDialog.vue';
	import {
		WxcMask,
	} from "weex-ui";
	const dom = weex.requireModule("dom");
	const storage = weex.requireModule("storage");
	const appInfo = weex.requireModule("JXSGApp");
	const animation = weex.requireModule("animation");
	const clipboard = weex.requireModule("clipboard");
  const modal = weex.requireModule("modal");
	const systemInfo = weex.requireModule("systemInfo");
	const isInstalledWeixin = true;
	const b = new BroadcastChannel('myChannel');
	//const globalEvent = weex.requireModule('globalEvent');
  
	export default {
		components: {
			"navigation-bar": NavigationBar,
			"wxc-mask": WxcMask,
			"list-footer": ListFooter,
			"jxsg-dialog": JxsgDialog
		},
		mixins: [mixins],
		data: () => ({
			activeTab: 0,
			title: "精选速购-随心省，随心赚",
			imgs: "", // 图片域名
			tipsShow: false, // 顶部通知开关
			tipsText: "", // 顶部通知文案
			tipsCahec: "", // 顶部缓存
			teamName: "", // 标题
			nickName: "", // 昵称
			rankName: "", // 等级
			ztYdNumber: "", // 云店总数
			xzYdNumber: "", // 昨日
			markTitle: '', // 潜力标题
			teamLeaderData: [], // 弹层数据
			copyText: "微信号复制成功，打开微信添加好友",
			copyTarget: "Wechat",
			pageBack: false,
			tabs: [{
					title: "云店",
					number: 0,
					pId: ""
				},
				{
					title: "请客",
					number: 0,
					pId: ""
				},
				{
					title: "经理",
					number: 0,
					pId: ""
				},
				{
					title: "总监",
					number: 0,
					pId: ""
				}
			],
			rankId: "", // 社群id
			page: 1, // 默认页码
			lists: [], // 列表数据
			addLists: [], // 分页加载数据
			noData: false,
			popData: {},
			show: false,
			overlayCanClose: true,
			isFalse: false,
			hasAnimation: false,
			dshow: false,
			showFoot: false,
			nIndex: 0
		}),
		destroyed(){
			b.close();
		},
		created() {
			var self = this;
			b.onmessage=(event)=>{
				self.teamName = event.data;
			}
			this.imgs = this.imgHost();
			this.initPageData();
			this.initTitle();
			if (systemInfo) {
				systemInfo.modifyStatusBarStyle("white");
			}
			// 登录
			// globalEvent.addEventListener('loginEvent', function() {
					
			// })
			
			//this.appTrackSend3("myStore_myTeamListWxCopy", {"name": "云店", "wexin": '123465'});

		},
		methods: {
			// 基础信息
			initPageData() {
				let self = this;
				let rankLists = null;
				let tempTitles = [];
				getTeamInfo()
					.then(res => {
						rankLists = res.rankLists; // tabs标题
						this.teamName = res.teamName;
						this.nickName = res.nickname;
						this.rankName = res.rankName;
						this.ztYdNumber = res.ztYdNumber;
						this.xzYdNumber = res.xzYdNumber;
						this.markTitle = res.title;
						this.blacklist = res.blacklist;
						this.tipsText = res.upgradeDesc;
						if (res.upgradeDesc) {
							let cacheText;
							storage.getItem("cacheTipsdata", e => {
								if (e.result === "success") {
									cacheText = e.data;
									if (cacheText === this.tipsText) {
										this.tipsShow = false;
									} else {
										this.tipsShow = true;
									}
								} else {
									cacheText = "";
									this.tipsShow = true;
								}
							});
						} else {
							this.tipsShow = false;
						}
						rankLists.forEach(ele => {
							tempTitles.push({
								title: ele.name,
								number: ele.number,
								pId: ele.rankId
							});
						});
						this.tabs = tempTitles;
						this.rankId = this.tabs[0].pId;
						this.initListData(this.rankId, 1);
						storage.setItem("teamNameData", this.teamName, e => {
						});

						this.appTrackSend("myStore_myTeam",{"team_name": this.teamName});
					})
					.catch(err => {
						if(err.msg){
							this.toast(err.msg)
						}
					});
			},
			// tab切换
			changeTab(i, title) {
				if(i == 0){
					this.appTrackSend("myStore_myTeamList",{"name": title});
				}
				if(this.activeTab == i){
					return false;
				}
				this.activeTab = i;
				this.rankId = this.tabs[i].pId;
				this.page = 1;
				this.list = [];
				this.initListData(this.rankId, 1);
			},
			/*
			 *  列表数据  ids: 等级id pages: 页码
			 */
			initListData(ids, pages) {
				let self = this;
				getTeamInfoList({
						rank: ids,
						page: pages
					})
					.then(res => {
						if (pages == 1) {
							if (res.length > 0) {
								self.lists = res;
								this.noData = false;
								this.showFoot = true;
							} else {
								self.lists = [];
								this.noData = true;
								this.showFoot = false;
							}
						} else {
							if(res.length < 20 && res.length > 0){
								this.showFoot = true;
							}
							
							self.addLists = res;
							for (let i = 0; i < self.addLists.length; i++) {
								this.lists.push(self.addLists[i]);
							}
						}
					})
					.catch(err => {
						console.error(err.msg);
					});
			},
			// 设置页面标题
			initTitle() {
				util.env.isWeb() && this.setTitle(this.title);
			},
			// 编辑事件
			jumpEidt(){
				this.appTrackSend("myStore_myTeamEdit",{"team_name": this.teamName});
				// 删除当前storage 并重新设置
				storage.removeItem("teamNameData",()=>{
					storage.setItem("teamNameData", this.teamName, e => {

				  });
				});
			},
			// 点击跳转到我的领袖
			jumpLeader() {
				var self = this;
				//web
				if (util.env.isWeb()) {
					this.jump("/store/my-leader");
					return false;
				}
				this.appTrackSend("myStore_myTeamLeader", {"team_name": this.teamName});

				//app
				let url = self.setBundleUrl("store/my-leader.js");
				util.jumpToLink(url);
			},
			// 跳转到成长记录
			jumpRecord() {
				var self = this;
				//web
				if (util.env.isWeb()) {
					this.jump("/store/my-record");
					return false;
				}
				this.appTrackSend("myStore_myTeamLog", {"team_name": this.teamName});
				
				//app
				let url = self.setBundleUrl("store/my-record.js");
				util.jumpToLink(url);
			},
			// 分页
			fetch(event) {
				// 目前只支持 app
				const length = this.lists.length;
				this.page++;
				this.initListData(this.rankId, this.page);
			},
			closeTips() {
				storage.setItem("cacheTipsdata", this.tipsText, e => {
					if (e.result === "success") {
						this.tipsShow = false;
					}
				});
			},
			wxcMaskSetHidden() {},
			lookUserInfo(n) {
				this.teamLeaderData = [];
				this.teamLeaderData.push(this.lists[n]);
				this.show = true;
				this.nIndex = n;
				if(n == 0){
					this.appTrackSend("myStore_myTeamListWx", {"name": this.tabs[n].title});
				}
			},
			openMask(e) {
				this.show = true;
				this.hasAnimation = true;
			},
			wxcMaskSetHidden() {
				this.show = false;
			},
			openNoAnimationMask(e) {
				this.show = true;
				this.hasAnimation = false;
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
							this.show = false;
							this.dshow = true;
						}
					} else {
						this.toast("微信号复制失败");
					}
				});
				if(nIndex == 0){
					this.appTrackSend("myStore_myTeamListWxCopy", {"name": this.tabs[0].title, "wechat": wxNum});
				}
			},
			/**
			 * 复制手机号码
			 * @param	[String] phNum 要复制的手机号码
			 */
			onCopyPhone(phNum) {
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
			 * 拨打手机号码 app
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
			// 唤醒微信 app
			callWeiXinApp() {
				this.dshow = false;
				if (this.copyTarget === "Wechat") {
					appInfo.openWechat();
				}
			},
			// ja => appTrackSend("myStore_myTeam","team_name", "主管")
			// appTrackSend(types, s, sval){
			// 	ja.jaTrack({
			// 		"type": types,     //事件文档中的 事件名称 => key值 
			// 		"clickData": {
			// 			s: sval,
			// 		} //事件文档中的 备注参数 => 参数
			// 	});
			// },
			appTrackSend(types, params){
				console.log(params)
				ja.jaTrack({
					"type": types,      //事件文档中的 事件名称 => key值 
					"clickData": params //事件文档中的 备注参数 => 参数
				});
			},
		}
	};
</script>

<style scoped>
	.pingfang {
		font-family: pingfang
	}
  .wrapper{
		background-color: #fff;
	}
	.scroller {
		width: 750px;
		left: 0;
		bottom: 0;
		top: 0;
		overflow: hidden;
	}
	.nicon {
		font-family: iconfont;
	}
	.nicon-broadcast {
		font-size: 26px;
		color: #c59c5d;
		margin-right: 26px;
		margin-top: 5px;
	}
	.nicon-fork {
		font-size: 18px;
		color: #666;
		margin-top: 5px;
	}
	.nicon-copy{
		font-size: 34px;
		color: #666;
	}
	.nicon-phone{
		font-size: 34px;
		color: #666;
	}
	.row {
		flex-direction: row;
	}
	.item {
		flex: 1;
		justify-content: center;
	}
	.group-tips-cell {
		height: 66px;
		padding: 0 40px;
		justify-content: center;
		align-items: flex-start;
	}
	.group-tips-text {
		width: 610px;
		font-size: 26px;
		color: #c59c5d;
	}
	.group-info {
		position: relative;
		padding-top: 30px;
		padding-left: 40px;
		padding-bottom: 85px;
		background-image: linear-gradient(to right, #c1934c, #d9b87d);
	}
	.nick-name {
		padding-top: 1px;
		line-height: 28px;
		font-size: 28px;
		color: #fff;
		opacity: 0.7;
		margin-right: 10px;
		justify-content: center;
	}
	.rank-name {
		width: 60px;
		padding-top: 3px;
		padding-bottom: 3px;
		line-height: 22px;
		border-style: solid;
		border-width: 1px;
		border-color: #fff;
		border-radius: 4px;
		font-size: 22px;
		color: #fff;
		justify-content: center;
		align-items: center;
		text-align: center;
		opacity: 0.7;
	}
	.group-atit {
		padding-top: 18px;
		font-size: 28px;
		color: #fff;
		opacity: 0.7;
	}
	.group-number {
		padding-top: 15px;
		padding-bottom: 63px;
		font-size: 86px;
		color: #fff;
	}
	.yestday {
		font-size: 26px;
		color: #fff;
		margin-right: 10px;
		opacity: 0.7;
	}
	.yestday-img {
		width: 26px;
		height: 26px;
		margin-top: 6px;
	}
	.group-leader {
		position: absolute;
		right: 0;
		top: 132px;
		width: 168px;
		height: 60px;
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		background-color: rgba(255, 255, 255, 0.7);
		justify-content: center;
		align-items: center;
	}
	.group-tmp {
		font-size: 26px;
		color: #c1934c;
	}
	.nicon-arrow-right {
		font-size: 14px;
		color: #c1934c;
		margin-left: 10px;
		margin-top: 5px;
	}
	.tabbar {
		flex-direction: row;
		background-color: #fff;
		position: sticky;
		width: 750px;
		left: 0;
		top: 0;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eaeaea;
	}
	.tab {
		height: 130px;
		width: 187.5px;
		justify-content: center;
		align-items: center;
	}
	.current{
		position: absolute;
    bottom: 0;
		width: 187.5px;
		height: 4px;
		align-items: center;
	}
	.lines{
		width: 42px;
		height: 4px;
		background-color: #C79F5F;
	}
	.tab-title {
		font-size: 28px;
		color: #ccc;
	}
	.tab-top{
		margin-bottom: 10px;
	}
	.tab-number {
		font-family: pingfang;
		font-size: 36px;
		color: #ccc;
	}
	.tabs-active-number{
		font-family: pingfang;
		font-size: 36px;
		color: #202020;
	}
	.tabs-active {
		font-size: 28px;
		color: #202020;
	}
	.tab-panels {
		position: relative;
		width: 750px;
	}
	.panel {
		width: 750px;
		justify-content: center;
		align-items: center;
	}
	.item-conm {
		position: relative;
		height: 170px;
		padding: 0 40px;
		width: 750px;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eaeaea;
		justify-content: center;
		background-color: #fff;
	}
	.item-main {
		width: 511px;
		padding-left: 24px;
	}
	.item-name {
		font-size: 30px;
		color: #202020;
		margin-right: 12px;
	}
	.item-img {
		width: 90px;
		height: 90px;
		border-radius: 90px;
	}
	.item-wei-img {
		width: 70px;
		height: 70px;
		border-radius: 70px;
	}
	.item-hd{
		position: relative;
		justify-content: center;
		align-items: center;
	}
	.mark-main{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		justify-content: center;
		align-items: center;
	}
	.item-mark {
		width: 90px;
		height: 90px;
		border-radius: 90px;
		background-color: rgba(32, 32, 32, .75);
		justify-content: center;
		align-items: center;
	}
	.item-mark-text {
		width: 50px;
		font-size: 22px;
		color: #fff;
	}
	.item-black-text {
		width: 90px;
		font-size: 22px;
		color: #fff;
		text-align: center;
	}
	.item-rank-img {
		width: 22px;
		height: 22px;
	}
	.item-new {
		font-size: 22px;
		width: 65px;
		line-height:22px;
		padding-top:3px;
		padding-bottom:3px;
		background-color: #fb3180;
		color: #fff;
		text-align: center;
		margin-left: 15px;
	}
	.item-mid {
		margin-top: 19px;
		margin-bottom: 14px;
	}
	.item-desc {
		font-size: 24px;
		color: #999;
	}
	.no-data {
		font-size: 30px;
		padding-top: 290px;
		text-align: center;
		color: #ccc;
	}
	.user-level {
		align-self: center;
		color: #333;
		font-size: 30px;
	}
	.item-body {
		padding-top: 48px;
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
	.user-rank {
		padding-right: 18px;
		font-size: 22px;
		color: #666;
	}
	.grade-icon {
		width: 28px;
		height: 28px;
		margin-right: 8px;
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
		margin-left: 40px;
		margin-right: 40px;
		padding-top: 46px;
		padding-bottom: 12px;
	}
	.phone-number {
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.wechat-number {
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.txt-word {
		font-size: 32px;
		color: #ccc;
	}
	.txt-read {
		font-size: 32px;
		color: #202020;
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
	.nicon-box-phone {
		margin-left: 27px;
	}
	.title-u {
		font-size: 28px;
		color: #ccc;
	}
	.content-subtext {
		font-size: 36px;
		color: #414141;
	}
</style>