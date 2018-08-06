/**
 * 
 * @authors liaoxb
 * @date    2018-06-29 18:40:26
 * @version $Id$
 */
import UrlParser from 'url-parse';
import MD5 from "js-md5";

const Utils = {
  UrlParser: UrlParser,
  // 接口域名
  apiHost() {
    let self = this,
        jxsgApp = self.browser.versions.jxsgApp;
    const apiUrl = !window.location.host.includes('m.test.jxsg') && window.location.host.includes('jxsg.com') ? '//' + (jxsgApp ? 'appjsinterface' : 'jsinterface') + '.jxsg.com/' : '//' + (jxsgApp ? 'appjsinterface' : 'jsinterface') + '.jxsg.test/';
    return apiUrl;
  },
  // 字体库
  initIconFont() {
    const domModule = weex.requireModule('dom');
    domModule.addRule('fontFace', {
      'fontFamily': "iconfont",
      'src': "url('http://statics.jxsg.test/mnew/fonts/iconfont.ttf')"
    });
    domModule.addRule('fontFace', {
      'fontFamily': "pingfang",
      'src': "url('http://statics.jxsg.com/mnew/fonts/Ping.ttf')"
    });
  },
  appendProtocol(url) {
    if (/^\/\//.test(url)) {
      const {
        bundleUrl
      } = weex.config;
      return `http${/^https:/.test(bundleUrl) ? 's' : ''}:${url}`;
    }
    return url;
  },
  /**
   * 跳转到登录
   * @param {*} curUrl 
   */
  switchLogin(curUrl = window.location.href) {
    let curUrl2 = window.location.host.replace(/weex/, "m")
    window.location.href = process.env.NODE_ENV === 'development' ? `curUrl2 +"/pages/login.html?return_url=${encodeURIComponent(curUrl)}"` : `//${curUrl2}/passport/login?return_url=${encodeURIComponent(curUrl)}`;
  },
  encodeURLParams(url) {
    const parsedUrl = new UrlParser(url, true);
    return parsedUrl.toString();
  },
  /**
   * app跳转
   * @param {app跳转链接} jumpUrl 
   * @param {动画方式} animated 
   * @param {回调} callback 
   */
  jumpToLink(jumpUrl, animated = true, callback = null) {
    const Navigator = weex.requireModule('navigator');
    Navigator.push({
      url: jumpUrl,
      animated: animated.toString()
    }, callback);
  },
  /**
   * 获取cookie
   * @param {cookie 名称} name 
   */
  getCookie(name) {
    let arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg))
      return (arr[2])
    else
      return null
  },
  /* 设备判断 */
  env: {
    // web
    isWeb() {
      const {
        platform
      } = weex.config.env;
      return typeof (window) === 'object' && platform.toLowerCase() === 'web';
    },
    // ios
    isIOS() {
      const {
        platform
      } = weex.config.env;
      return platform.toLowerCase() === 'ios';
    },
    // android
    isAndroid() {
      const {
        platform
      } = weex.config.env;
      return platform.toLowerCase() === 'android';
    },
    // iphoneX
    isIPhoneX() {
      const {
        deviceHeight
      } = weex.config.env;
      if (Utils.env.isWeb()) {
        return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812);
      }
      return Utils.env.isIOS() && deviceHeight === 2436;
    },
    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight() {
      const {
        env
      } = weex.config;
      const navHeight = Utils.env.isWeb() ? 0 : (Utils.env.isIPhoneX() ? 176 : 132);
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    },
    /**
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
    getScreenHeight() {
      const {
        env
      } = weex.config;
      return env.deviceHeight / env.deviceWidth * 750;
    },
  },
  browser: {
    versions() {
      var u = navigator.userAgent,
          app = navigator.appVersion;
      return { //移动终端浏览器版本信息
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios环境
        android: !!u.match(/Android*/i), //android终端或者uc浏览器
        webApp: !!u.match(/Safari*/i), //是否web应该程序，没有头部与底部
        jxsgApp: !!u.match(/JXSG_iOS*|JXSG.iOS*|JXSG_Android*/i), //是否jxsg应该程序
        uc: !!u.match(/UCBrowser*/i), //是否uc浏览器
        qq: !!u.match(/MQQBrowser*/i), //是否uc浏览器
        appIOS: !!u.match(/JXSG_iOS*|JXSG.iOS*/i), //是否精选速购ios
        appAndroid: !!u.match(/JXSG_Android*/i), //是否精选速购android
        weixin: !!u.match(/MicroMessenger*/i), //是否微信环境
        appVersion: app
      };
    },
    schema() {
      return {
        weixin: "weixin://",
        jxsg: "jxsg://"
      }
    },
    downlod(url, mrl) {
      //微信
      if (this.versions.weixin) {
        window.location.href = url;
      } else { //非微信浏览器
        if (this.versions.ios) {
          var loadDateTime = new Date();
          window.setTimeout(function () {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
              window.location = url; //ios下载地址
            } else {
              window.close();
            }
          }, 25);
          window.location = mrl;
        } else if (this.versions.android) {
          try {
            window.location = mrl;
            setTimeout(function () {
              window.location = url; //android下载地址
            }, 500);
          } catch (e) {}
        }
      }
    }
  },
  /**
   * 生成 post 请求参数 
   * @param {*} params 接口参数
   * @param {*} version 接口版本号
   */
  generateParameters(params, version='1.0', accessId, accessToken) {
    var string = '';
    for (var i = 0; i < 8; i++) {
      var number = Math.floor(Math.random() * 36) % 36;
      if (number < 10) {
        var figure = Math.floor(Math.random() * 10) % 10;
        string = string + figure.toString();
      } else {
        var figureTwo = (Math.floor(Math.random() * 26) % 26) + 97;
        var tempString = String.fromCharCode(figureTwo);
        string = string + tempString;
      }
    }
    params.userId = accessId;
    params.status = 0;
    var prefix = string.substring(0, 4);
    var suffix = string.substring(string.length - 4, string.length);
    var interCode = 'a0o9Yf5n';
    var jsonStr = JSON.stringify(params);
    var date = parseInt((new Date()).getTime() / 1000);
    var timeStamp = date + '';
    var sessionId = accessToken;
    var originalStr = interCode + version + jsonStr + timeStamp + sessionId + prefix + suffix;
    var encodeMD5Str = MD5(originalStr);
    var token = prefix + encodeMD5Str + suffix;
    if (WXEnvironment.platform.toLowerCase() == 'web') {
      var verifyObj = {
        time: timeStamp,
        sessionId: sessionId,
        version: version,
      };
    } else {
      var verifyObj = {
        time: timeStamp,
        sessionId: sessionId,
        token: token,
        version: version,
        registrationId: ''
      };
    }
    var paramsString = 'data=' + JSON.stringify(params) + '&verify=' + JSON.stringify(verifyObj) + '';
    return paramsString;
  }
};

export default Utils;