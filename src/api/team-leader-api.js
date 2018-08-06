import api from './api'

export function getTeamLeader(data = {}) {
  return api.post(2, '?s=team/team_leader', data)
}

// 申请团队岗位提交申请
export function setApplicationTeamLeader(data = {}) {
  return api.post(2, '?s=team/team_apply', data);
}

// 申请团队岗位信息
export function getApplicationTeamInfo(data = {}) {
  return api.post(2, '?s=team/team_apply_info', data);
}

// 我的成长记录
export function getTeamCultivate(data) {
  return api.post(1, '?s=team/team_cultivate_log', data)
}

// 我的社群
export function getTeamInfo(data = {}) {
  return api.post(1, '?s=team/team', data)
}

//我的社群列表
export function getTeamInfoList(data = {}) {
  return api.post(1, '?s=team/team_lists', data)
}

//修改团队信息
export function setTeamInfo(data = {}) {
  return api.post(2, '?s=team/edit_team_info', data)
}