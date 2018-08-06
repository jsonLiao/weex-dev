import util from './../utils/util.js';
const stream = weex.requireModule('stream');
const modal = weex.requireModule("modal");
const user = weex.requireModule("JXSGApp");

/**
 * 三端通用信息
 * 获取 sessionId
 * 获取 userId
 * 获取 apiHost
 */
let sessionId, userId, apiHost;
if (WXEnvironment.platform.toLowerCase() == 'web') {
  sessionId = util.getCookie('appH5AccessToken') || util.getCookie('PHPSESSID'),
  userId = util.getCookie('appH5UserId') || util.getCookie('jxsg_user_id');
  apiHost = util.apiHost();
} else {
  if (user) {
    let userInfo = user.getUserInfo();
    userId = userInfo.appH5UserId;
    sessionId = userInfo.appH5AccessToken;
    apiHost = userInfo.apiHost;
  } else {
    userId = "";
    sessionId = "";
    apiHost = ""
  }
}
export default {
  userInfos: {
    userId: userId,
    sessionId: sessionId
  },
  /**
   * 网络请求
   * @param {是否验证登录 1：检测登录 2：不检测} vm 
   * @param {请求子路径} path 
   * @param {请求参数} params 
   * @param {版本信息} version 
   * @param {sessionId} sessionId 
   * @param {请求成功} pass 
   * @param {请求失败} fail 
   */
  post(vm, path, params, version) {
    var self = this;
    return new Promise((resolve, reject) => {
      const stream = weex.requireModule('stream');
      stream.fetch({
        method: 'POST',
        url: apiHost + path,
        type: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: util.generateParameters(params, version, userId, sessionId)
      }, (response) => {
        // console.log('response', response)
        if (response.status == 200) {
          if (response.data.error === '0') {
            if (response.data.data) {
              resolve(response.data.data)
            } else {
              resolve({})
            }
          } else if (response.data.error === 2009 && vm === 1) {
            // 跳转到登录
            util.switchLogin();
          } else {
            reject(response.data)
          }
        } else {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          var api = (util.apiHost() + path).split('?')[0].split('/')
          var msg = {
            msg: '网络异常，请稍后重试',
            data: {
              httpStatus: '' + response.status,
              statusText: response.statusText,
              headers: response.headers,
              data: response.data,
              url: api[api.length - 1],
              timestamp: '' + timestamp
            }
          }
          reject(msg)
        }
      }, () => {})
    })
  },
}