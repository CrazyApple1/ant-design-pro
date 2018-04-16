import { stringify } from 'qs';
import request from 'core/utils/request';
import { getNoUndefinedString } from "core/utils/utils";

// 根据id获取角色信息
export async function getRole(params) {
  return request(`/role/get/${getNoUndefinedString(params.id)}`);
}
// 查询权限列表
export async function list(params) {
  return request(`/role/list?${stringify(params)}`);
}
// 查询授权菜单列表
export async function listModulebyRoleId(params) {
  return request(`/role/listModulebyRoleId?${stringify(params)}`);
}
// 获取所有授权参数
export async function getDictItemByRoleId(params) {
  return request(`/role/getDictItemByRoleId?${stringify(params)}`);
}
// 获取授权角色列表
export async function listUserByRoleId(params) {
  return request(`/role/listUserByRoleId?${stringify(params)}`);
}
// 校验编码唯一性
export async function checkUnique(params) {
  return request('/role/checkUnique', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
//保存角色信息
export async function saveRole(params) {
  return request('/role/save', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 根据ID删除角色
export async function delRole(params) {
  return request('/role/del', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 切换锁定状态
export async function lockRole(params) {
  return request('/role/lock', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
