import request from 'core/utils/request';
import { getNoUndefinedString } from 'core/utils/utils';
//获取组织信息
export async function getOrg(params) {
  return request(`/module/get/${getNoUndefinedString(params.id)}`);
}
// 加载组织列表
export async function listOrg(params) {
  return request(`/module/list/${getNoUndefinedString(params)}`);
}
// 新增/编辑组织信息
export async function editOrg(params) {
  return request('/module/edit', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 根据ID删除组织
export async function deleteOrg(params) {
  return request('/module/del', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
