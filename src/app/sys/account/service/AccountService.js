import { stringify } from 'qs';
import request from 'core/utils/request';

// 查询用户列表
export async function listUser(params) {
  return request(`/account/list?${stringify(params)}`);
}

// 根据ID删除用户
export async function delUser(params) {
  return request('/account/del', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
