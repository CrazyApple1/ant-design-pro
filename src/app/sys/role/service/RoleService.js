import { stringify } from 'qs';
import request from 'core/utils/request';

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
// 获取授权用户列表
export async function listUserByRoleId(params) {
  return request(`/role/listUserByRoleId?${stringify(params)}`);
}
