import { stringify } from 'qs';
import request from '../../../utils/request';

export async function queryGoods(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeGoods(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addGoods(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}