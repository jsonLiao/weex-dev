<template>
<div class="wrapper">
		<!-- 头部 E-->
		<navigation-bar :title="title" />
		<!-- 头部 E-->
		<list class="list" @loadmore="fetch" loadmoreoffset="80">
		<!-- 分页列表 S-->
		<cell class="cell" v-if="recordList.length" v-for="(item, idx) in recordList" :key="idx">
			<div class="record-item">
				<div class="head">
					<text class="total">{{item.totalNum}}</text>
					<text class="date">{{item.addTime}}</text>
				</div>
				<div class="yesterday" v-if="item.addDesc || item.delDesc">
					<text class="yesterday-txt">{{item.addDesc}}</text>
					<text class="yesterday-txt">{{item.delDesc}}</text>
				</div>
				<div class="detail" v-if="item.desc"><text class="detail-txt">{{item.desc}}</text></div>
			</div>
		</cell>
		<!-- 分页列表 E-->

		<!-- 底部 S-->
		<cell v-if="!moreData" class="no-more">
			<list-footer />
		</cell>
		<!-- 底部 E-->

		<!-- 无数据 S-->
		<cell v-if="recordList.length === 0">
			<jxsg-page-none smTitle="亲，没有记录" />
		</cell>
		<!-- 无数据 E-->
	</list>
</div>
	
</template>

<script>
	//import {} from 'weex-ui'
	//import util from './../../utils/util.js'
	import mixins from './../../mixins/index.js'
	import {
		getTeamCultivate
	} from './../../api/team-leader-api.js'
	import NavigationBar from './../../components/NavigationBar.vue'
	import JxsgPageNone from './../../components/JxsgPageNone.vue'
	import ListFooter from "./../../components/ListFooter.vue";
	export default {
		components: {
			'navigation-bar': NavigationBar,
			'jxsg-page-none': JxsgPageNone,
			"list-footer": ListFooter
		},
		mixins: [mixins],
		data() {
			return {
				title: '成长记录',
				recordList: [], // 我的成长记录列表
				addLists: [], // 分页临时对象
				page: 1, // 分页
				loadinging: false,
				moreData: true // 是否还能加载更多数据
			}
		},
		methods: {
			getMyRecord(num) {
				let self = this;
				getTeamCultivate({
						page: num
					})
					.then(res => {
						if (res.length > 0) {
							if (res.length < 20) {
								this.moreData = false
							}
							self.addLists = res;
							for (let i = 0; i < self.addLists.length; i++) {
								this.recordList.push(self.addLists[i]);
							}
						} else {
							if(num <= 1){
								this.moreData = true;
							}else{
								if(recordList.length === 0){
									this.moreData = true;
								}else{
									this.moreData = false;
								}
							}
						}
					})
					.catch(err => {
						this.toast(err.msg)
					})
			},
			fetch(event) {
				let self = this;
				this.page++;
				this.getMyRecord(this.page);
			}
		},
		created() {
			this.getMyRecord(this.page);
		}
	}
</script>

<style>
	.list {
		background-color: #f7f7f7;
	}
	.record-item {
		padding: 36px 40px;
		margin-bottom: 16px;
		background-color: #fff;
		justify-content: center;
	}
	.head {
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}
	.total {
		font-size: 30px;
		font-weight: 700;
		color: #202020;
	}
	.date {
		font-size: 26px;
		color: #cccccc;
	}
	.yesterday {
		flex-direction: row;
		margin-top: 15px;
	}
	.yesterday-txt {
		font-size: 28px;
		color: #c1934c;
	}
	.yesterday-txt:first-child {
		margin-right: 20px;
	}
	.detail {
		margin-top: 30px;
	}
	.detail-txt {
		font-size: 26px;
		color: #999999;
	}
	.no-more {
		position: relative;
		justify-content: center;
		align-items: center;
	}
	.loading-cont {
		justify-content: center;
		align-items: center;
		width: 750px;
	}
	.empty {
		margin-top: 200px;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.sm-title {
		margin-top: 74px;
		font-size: 30px;
		color: #ccc;
	}
	.loading {
		width: 750;
		display: -ms-flex;
		display: -webkit-flex;
		display: flex;
		-ms-flex-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		align-items: center;
	}
	.indicator-text {
		color: #ccc;
		font-size: 26px;
		text-align: center;
	}
	.indicator {
		margin-top: 16px;
		height: 40px;
		width: 40px;
		color: #ccc;
	}
</style>