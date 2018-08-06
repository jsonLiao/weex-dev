import MD5 from "js-md5";
import util from './../utils/util.js';
const user = weex.requireModule("JXSGApp");

let ja_userId;
let ja_platform = WXEnvironment.platform.toLowerCase();
let ja_version = WXEnvironment.appVersion;

if (WXEnvironment.platform.toLowerCase() == 'web') {
  ja_userId = util.getCookie('appH5UserId') || util.getCookie('jxsg_user_id');
} else {
  if (user) {
    let userInfo = user.getUserInfo();
    ja_userId = userInfo.appH5UserId;
  } else {
    ja_userId = "";
  }
}
let getInfo = {
  "ja_uid": ja_userId,
  "ja_uuid": '',
  "ja_platform": ja_platform,
  "ja_version": ja_version
}

const ja = {
  /**
   * 获取接口请求域名
   */
  getDomain() {
    let domain;
    if (WXEnvironment.platform.toLowerCase() == 'web') {
      domain = '';
    } else {
      if (user) {
        let userInfo = user.getUserInfo();
        domain = userInfo.apiHost;
      } else {
        domain = '';
      }
    }
    return domain;
  },
  /**
   * uuid
   */
  getJaUuid() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  },
  /**
   * 请求参数配置+默认配置
   * @param {*} data 
   */
  getJaParams(data) {
    let datas = data;
    let ja_uuid = this.getJaUuid();
    let verify = getInfo;
    verify['ja_uuid'] = ja_uuid;
    let dts = 'data=' + JSON.stringify(datas) + '&verify=' + JSON.stringify(verify) + '';
    return dts;
  },
  /**
   * ja请求地址
   */
  getTrackUrl() {
    let trackUrl = '';
    if (this.getDomain().includes("jxsg.test")) {
      //test
      trackUrl = "http://track.jxsg.test/?type=user&behavior=click";
    } else if (this.getDomain().includes("jxsg.com")) {
      // 线上
      trackUrl = "http://track.jxsg.com/?type=user&behavior=click";
    }
    return trackUrl;
  },
  /**
   * 发送ja请求
   * @param {*} data 参数配置
   */
  jaTrack(data) {
    return new Promise((resolve, reject) => {
      const stream = weex.requireModule('stream');
      stream.fetch({
        method: 'POST',
        url: this.getTrackUrl(),
        type: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: this.getJaParams(data)
      }, (response) => {
        /* const modal = weex.requireModule('modal');
        modal.toast({
          message: JSON.stringify(response),
          duration: 20.25
        }) */
        //console.log('response', response)
        if (response.status == 200) {
          resolve(response)
        }
      }, () => {})
    })
  }
}

export default ja;