// 树形数据
const data = [{
  id: 1,
  name: '根节点',
  parent: '',
  order: 1,
  status: '1',
  children: [{
    id: 11,
    name: '二级节点 - A',
    parent: '根节点',
    order: 1,
    status: '1',
  }, {
    id: 12,
    name: '二级节点 - B',
    parent: '根节点',
    order: 2,
    status: '1',
    children: [{
      id: 121,
      name: '三级节点 - A',
      parent: '二级节点 - B',
      order: 1,
      status: '1',
    }],
  }, {
    id: 13,
    name: '二级节点 - C.',
    address: 'London No. 1 Lake Park',
    children: [{
      id: 131,
      name: '三级节点 - C',
      address: 'London No. 2 Lake Park',
      children: [{
        id: 1311,
        name: '四级节点 - C.',
        address: 'London No. 3 Lake Park',
      }],
    }],
  }],
}, {
  id: 2,
  name: '根节点 - ROOT',
  parent: '',
  order: 1,
  status: '0',
}];
// 获取模块数据
export function listOrg(req, res, u) {
  const dataSource = [...data];
  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}
export default {
  listOrg,
};
