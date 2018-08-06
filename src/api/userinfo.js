import api from './api'
/**
 * 获取用户信息
 * v = 1, 验证登录
 * json 参数配置
 */
export function getUserInfo(v = 2, json = {}) {
  return api.post(v, '?s=user/info', json)
}