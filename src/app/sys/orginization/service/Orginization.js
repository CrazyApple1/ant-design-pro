import request from '../../../../core/utils/request';
// 加载模块信息
export async function getModule(params) {
  return request('/module/getModule');
}
