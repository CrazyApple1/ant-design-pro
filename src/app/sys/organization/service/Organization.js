import request from 'core/utils/request';
import {getNoUndefinedString} from 'core/utils/utils';
//获取组织信息
export async function getOrg(params) {
  return request(`/organization/get/${getNoUndefinedString(params.id)}`);
}
// 加载组织列表
export async function listOrg(params) {
  return request(`/organization/list/${getNoUndefinedString(params)}`);
}
// 新增/编辑组织信息
export async function editOrg(params) {
  return request('/organization/edit', {
    method: 'POST',
    body: {
      ...params,
    }
  });
}
//调整排序
export async function sortOrg(params) {
  return request('/organization/sort', {
    method: 'POST',
    body: params,
  });
}
// 根据ID删除组织
export async function deleteOrg(params) {
  return request('/organization/del', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
