import { getUrlParams } from './utils';
// 树形数据
let data = [{
  key: 1,
  name: '根节点',
  parent: '',
  order: 1,
  status: '1',
  children: [{
    key: 11,
    name: '二级节点 - A',
    parent: '根节点',
    order: 1,
    status: '1',
  }, {
    key: 12,
    name: '二级节点 - B',
    parent: '根节点',
    order: 2,
    status: '1',
    children: [{
      key: 121,
      name: '三级节点 - A',
      parent: '二级节点 - B',
      order: 1,
      status: '1',
    }],
  }, {
    key: 13,
    name: '二级节点 - C.',
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: '三级节点 - C',
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: '四级节点 - C.',
        address: 'London No. 3 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: '根节点 - ROOT',
  parent: '',
  order: 1,
  status: '0',
}];
// 获取模块数据
export function getOrg(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);

  let dataSource = [...data];

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  getOrg
}
