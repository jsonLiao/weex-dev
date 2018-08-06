/**
 * 
 * @authors liaoxb
 * @date    2018-06-29 18:40:26
 * 
 * 全局公共方法
 */
import util from './../utils/util.js';
const user = weex.requireModule("JXSGApp");
let apiHost, picHost;
if (WXEnvironment.platform.toLowerCase() !== 'web') {
	let userInfo = user.getUserInfo();
	apiHost = userInfo.apiHost;
	picHost = userInfo.staticSourceHost;
}
export default {
	data() {
		return {
			rpx: 1,
			android: weex.config.env.platform.toLowerCase() == 'android',
			ios: weex.config.env.platform.toLowerCase() == 'ios',
			web: weex.config.env.platform.toLowerCase() == 'web',
		}
	},
	methods: {
		/**
		 * H5 路由页面跳转
		 */
		jump(to) {
			if (this.$router) {
				this.$router.push(to)
			}
		},
		isIpx() {
			return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
		},
		/**
		 * 官方的提示组件
		 * @param {*} text 
		 */
		toast(text) {
			if (util.env.isWeb()) {
				this.$toast.show(text, {
					duration: 2000
				})
			} else {
				const modal = weex.requireModule('modal');
				modal.toast({
					message: text,
					duration: 0.5
				})
			}
		},
		/**
		 *app获取跳转链接
		 * @param {*} jsFile
		 * @returns
		 */
		setBundleUrl(jsFile) {
			let newUrl;
			if (apiHost.includes("jxsg.test")){
				//test
				//newUrl =  "http://weex.jxsg.test/dist/pages/" + jsFile;
				
				// 本地调试app跳转
				newUrl = "http://192.168.0.116:8081/dist/pages/" + jsFile;
			}
			else if (apiHost.includes("jxsg.com")) {
				// 线上
				newUrl = "http://weex.jxsg.com/dist/pages/" + jsFile;
			}
			else {
				// 本地调试app跳转
				newUrl = "http://192.168.0.116:8081/dist/pages/" + jsFile;
			}
			return newUrl;
		},
		/**
		 * 设置标题
		 */
		setTitle(title = '精选速购') {
			document.title = title
		},
		// 图片域名
		imgHost() {
			let imgSrc;
			if (WXEnvironment.platform.toLowerCase() !== 'web') {
				imgSrc = picHost + 'mnew/images/wx/';
			}else{
				if (window.location.host.includes('192.168.0')){
					imgSrc = 'http://statics.jxsg.test/mnew/images/wx/';
				}
				if (window.location.host.includes('jxsg.dev')){
					imgSrc = 'http://statics.jxsg.dev/mnew/images/wx/';
				}
				if (window.location.host.includes('jxsg.test')) {
					imgSrc = 'http://statics.jxsg.test/mnew/images/wx/';
				}
				if (window.location.host.includes('jxsg.com')) {
					imgSrc = 'http://statics.jxsg.com/mnew/images/wx/';
				}
			}
			return imgSrc;
		},
		// 图片存储路径
		imageHost() {
			let imageSrc = null;
			if (picHost.includes('jxsg.test')) {
				imageSrc = "http://images.jxsg.test/";
			}
			if (picHost.includes('jxsg.com')) {
				imageSrc = "http://images.jxsg.com/";
			}
			return imageSrc;
		},
	},
	created() {
		let self = this;
		let env = weex.config.env;
		let rWidth = env.deviceWidth;
		env.deviceWidth > 828 && (rWidth = env.deviceWidth / 3 * 2);
		self.rpx = 750 / rWidth;
	}
}