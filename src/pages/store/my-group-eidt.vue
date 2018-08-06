<template>
	<div class="wrapper">
		<!-- 头部 -->
		<navigation-bar title='' />
		<div class="sub-title">
			<text class="title">{{title}}</text>
		</div>
		<div class="form">
			<div class="form-item">
				<input type="text" placeholder="请输入群名称" :value="inputKey" maxlength="16" class="input" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur" />
			</div>
			<wxc-button text="确定" type="" :btn-style="btnStyle" :text-style="textStyle" @input="oninput" @change="onchange" @wxcButtonClicked="submit"></wxc-button>
		</div>
	</div>
</template>

<script>
	import {
		WxcButton
	} from 'weex-ui'
	import util from './../../utils/util.js'
	import mixins from './../../mixins/index.js'
	import {
		setTeamInfo
	} from './../../api/team-leader-api.js'
	import NavigationBar from './../../components/NavigationBar.vue'
	const Navigator = weex.requireModule("navigator")
	const storage = weex.requireModule('storage')
	const myChannel = new BroadcastChannel('myChannel');
	const modal = weex.requireModule("modal");
	
	export default {
		components: {
			'navigation-bar': NavigationBar,
			"wxc-button": WxcButton,
		},
		mixins: [mixins],
		data() {
			return {
				title: '群名称',
				name: '',
				btnStyle: {
					width: '670px',
					height: '90px',
					backgroundColor: '#fb3180',
					borderRadius: '0px',
					marginTop: '60px'
				},
				textStyle: {
					fontSize: '32px',
				},
				inputKey: ''
			}
		},
		destroyed(){
			myChannel.close();
		},
		methods: {
			submit() {
				let val = this.name || this.inputKey;
				let self = this;
				if (val) {
					setTeamInfo({
						teamName: val
					}).then(res => {
						if (+res.success === 1) {
							self.toast("保存成功");
							myChannel.postMessage(val);
							if (self.ios || self.android) {
									Navigator.pop({
										animated: 'true'
									})
							}else{
								this.$router.back(-1);
							}
						}
					}).catch(err => {
						self.toast(err.msg);
					})
				} else {
					self.toast("请输入群名称");
				}
			},
			oninput(event) {
				this.name = event.value;
			},
			onchange(event) {},
			onfocus(event) {},
			onblur(event) {}
		},
		created() {
			let self = this;
			storage.getItem("teamNameData", e => {
				if (e.result === "success") {
						self.inputKey = e.data
				} 
			});
		}
	}
</script>

<style>
  .wrapper{
		background-color: #fff;
	}
	.sub-title {
		padding-left: 40px;
		padding-top: 100px;
		padding-bottom: 99px;
	}
	.title {
		font-size: 40px;
		color: #202020;
	}
	.form {
		align-items: center;
	}
	.input {
		width: 670px;
		font-size: 30px;
		padding: 39px 0;
		color: #202020;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #eaeaea;
		outline: none;
		placeholder-color: #ccc;
	}
</style>