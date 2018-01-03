// 查询字典列表
export async function loadDict(params) {
  return request(`/goods/list?${stringify(params)}`);
}
