<template>
  <div :class="[hasBottomLine ? 'z-bar jxsg-bline' : 'z-bar', fixedTop ? 'z-bar-fixed' : '']" v-show="showHeaderBar">
    <div class="action-back"
       	href="javascript:void(0);"
       	v-if="showBack">
      <text class="nicon nicon-arrow-left"
         	@click="backFunc($event)">&lt;</text>
    </div>
    <text class="z-title"
        	v-if="showTitle">{{title}}</text>
    <slot name="coustom"></slot>
  </div>
</template>

<script>

export default {
	name: 'JxsgTopHeader', //定义改组件名称，方便外部调用
	data() {
		return {
      editText: '编辑',
      showHeaderBar: this.showHeader
		}
	},
	props: {
    forceToShow: {
      //强制显示顶部栏，当该值为true的时在app中打开不会隐藏顶部栏
      type: Boolean,
      default: false
		},
		fixedTop: {
			//是否固定在顶部
			type: Boolean,
			default: false  
		},
    showHeader: {
      //是否显示顶部栏
      type: Boolean,
      default: true
    },
		hasBottomLine: {
			//是否有底部边框线
			type: Boolean,
			default: true
		},
		title: {
      //title必填
			type: String,
			required: true, 
			default: '精选速购'
		},
		handleFunc: {
			//右上角按钮点击处理方法
			type: Function,
			default: function(params) {}
		},
		showBack: {
			//是否出现返回按钮
			type: Boolean,
			default: true
		},
		backFunc: {
			//返回按钮点击处理方法，默认返回上一页
			type: Function,
			default: function(params) {
				window.history.go(-1)
			}
		},
		doShare: {
			//是否出现分享按钮
			type: Boolean,
			default: false
		},
		isEdit: {
			//是否为可编辑按钮
			type: Boolean,
			default: false
		},
		showTitle: {
			type: Boolean,
			default: true
		},
		isCoustom: {
			type: Boolean,
			default: false
		}
	},
	methods: {
  },
  created() {
  }
}
</script>

<style scoped>
.action-back {
	flex-direction: row;
	align-items: center;
	width: 88px;
	height: 88px;
	text-align: center;
}
.z-bar {
	position: relative;
	flex-direction: row;
	align-items: center;
	height: 88px;
	padding-right: 20px;
	padding-left: 20px;
	background-color: #fff;
	overflow: hidden;
}
.z-bar .z-icon:active {
	opacity: 0.3;
}

.z-title {
	position: absolute;
	right: 140px;
	left: 140px;
	lines: 1;
	font-size: 34px;
	font-weight: 700;
	color: #000;
	white-space: nowrap;
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
}

/* .action-back {
	padding: 0 20px;
	max-width: 48px;
	height: 88px;
	align-items: center;
} */

.nicon-service {
	font-size: 40px;
	color: #333;
}
.nicon-arrow-left {
	font-size: 40px;
	color: #333;
}
.f-wihte {
	color: #fff;
}

.action-close{
	padding: 0 20px;
	max-width: 48px;
	display: inline-block;
	height: 88px;
	align-items: center;
}

.nicon-fork {
	font-size: 28px;
	color: #333;
}
.action-share {
	display: inline-block;
	width: 78px;
	height: 88px;
	overflow: hidden;
}
.action-share a {
	display: block;
	padding: 23px 20px;
	font-size: 38px;
}
.action-share a.f-wihte {
	color: #fff;
}

/* .z-bar [class^='icon-'] {
	width: 48px;
	height: 48px;
	display: inline-block;
	position: relative;
	z-index: 20;
	vertical-align: middle;
} */

.z-bar:after {
	clear: both;
	position: static;
}
.z-bar:after,
.z-bar:before {
	display: table;
	content: ' ';
}
.jxsg-gray {
	background: #f8f8f8;
}
.z-bar .sm-text {
	font-size: 30px;
}
.z-bar-fixed {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
</style>
