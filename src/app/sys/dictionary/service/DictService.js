import { stringify } from 'qs';
import request from '../../../../core/utils/request';
// 查询字典列表
export async function loadDict(params) {
  return request(`/dict/listDict?${stringify(params)}`);
}
// 查询字典项
export async function getDict(params) {
  return request(`/dict/getDict?${stringify(params)}`);
}
// 删除字典项
export async function deleteDictItem(params) {
  return request('/dict/deleteDictItem', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
