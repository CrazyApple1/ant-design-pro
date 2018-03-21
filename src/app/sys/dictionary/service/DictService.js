import request from 'core/utils/request';
import {getNoUndefinedString} from 'core/utils/utils';
// 查询字典列表
export async function listDict() {
  return request('/dict/list');
}

// 查询字典项
export async function getDict(params) {
  return request(`/dict/get/${getNoUndefinedString(params.id)}`);
}

// 删除字典项
export async function deleteDict(params) {
  return request(`/dict/del/${getNoUndefinedString(params.id)}`);
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
