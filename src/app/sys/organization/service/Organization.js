import request from '../../../../core/utils/request';
import {stringify} from "qs";
//获取组织信息
export async function getOrg(params) {
  return request(`http://localhost:80/organization/getOrg?${stringify(params)}`);
}
// 加载组织列表
export async function listOrg(params) {
  return request(`/organization/listOrg?${stringify(params)}`);
}
// 添加一个组织
export async function saveOrg(params) {
  return request('/organization/saveOrg', {
    method: 'POST',
    body: {
      ...params,
    }
  });
}
//调整排序
export async function updateOrgOrder(params) {
  return request('/organization/updateOrgOrder', {
    method: 'POST',
    body: {
      ...params,
    }
  });
}
// 更改启用状态
export async function changeStatus(params) {
  return request('/organization/changeStatus', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 根据ID删除组织
export async function deleteOrg(params) {
  return request('/organization/deleteOrg', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
