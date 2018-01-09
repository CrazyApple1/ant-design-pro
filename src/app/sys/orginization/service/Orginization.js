import request from '../../../../core/utils/request';
import {stringify} from "qs";
// 加载模块信息
export async function listOrg(params) {
  return request(`/orginization/listOrg?${stringify(params)}`);
}
