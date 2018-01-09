import { stringify } from 'qs';
import request from '../../../../core/utils/request';

// 查询字典列表
export async function list(params) {
  return request(`/dict/listDict?${stringify(params)}`);
}

// 查询字典项
export async function getById(params) {
  return request(`/dict/getDict?${stringify(params)}`);
}

// 删除字典项
export async function deleteById(params) {
  return request('/dict/deleteDictItem', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 新增/编辑字典项
export async function add(params) {
  return request('/dict/addDictItem', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
