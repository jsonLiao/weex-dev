<template>
    <div class="empty-page">
        <div :class="[!isLeader ? 'tips-margin' : '']" v-if="isCustom">
					<image :src="defaultPic" class="no-leader-bg" :class="[ isLeader ? 'top-leader' : 'no-leader']"/>
				</div>
				<image :src="defaultPic" class="no-leader-bg" v-else />
        <text class="sm-title">{{smTitle}}</text>
    </div>
</template>
<script>
export default {
	name: 'JxsgPageNone',
	data() {
		return {}
	},
	props: {
		smTitle: {
			type: String,
			default: '暂无数据'
		},
		defaultPic: {
			type: String,
			default: ''
		},
		isLeader: {
			type: Boolean,
			default: false
		},
		isCustom: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style>
.empty-page {
	margin-top: 222px;
	flex-direction: column;
	align-items: center;
	text-align: center;
}
.tr-0 {
	position: inherit;
	transform: translateY(0%);
}
.no-leader-bg {
	width: 330px;
	height: 220px;
}

.tips-margin {
	margin-bottom: 74px;
}
.no-leader {
	width: 164px;
	height: 247px;
}

.top-leader {
	width: 238px;
	height: 309px;
}
.sm-title {
	margin-top: 74px;
	font-size: 30px;
	color: #ccc;
}
</style>
