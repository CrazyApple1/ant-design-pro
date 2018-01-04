import {getUrlParams} from './utils';
// 树形数据
let data = [{
  id: 1,
  name: '业务代码',
  parent: 0,
  children: [{
    id: 11,
    parent: 1,
    name: 'base_system',
    desc: '系统类型',
  }, {
    id: 12,
    parent: 1,
    name: 'base_operate',
    desc: '操作类型',
  }]
}, {
  id: 2,
  name: '系统代码',
  parent: 0,
  children: [{
    id: 21,
    parent: 2,
    name: 'base_system',
    desc: '系统类型',
  }, {
    id: 22,
    parent: 2,
    name: 'base_operate',
    desc: '操作类型',
  }]
}];

let itemData = [{
  id: 111,
  code: 'base_demo',
  keyName: '0001',
  keyValue: '交旧商品库_示例',
  desc: '这是描述',
  enable: true,
  order: 1,
  parent: 1,
  parentName: '业务代码',
}, {
  id: 112,
  code: 'base_demo',
  keyName: '0002',
  keyValue: '销售商品库_示例',
  desc: '这是描述',
  enable: false,
  order: 2,
  parent: 1,
  parentName: '业务代码',
}];
// 获取字典列表数据
export function listDict(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  let dataSource = [...data];
  // 查询
  if (params.filter) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.filter) > -1);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}
// 获取字典项数据
export function getDict(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  let data = itemData;

  if (res && res.json) {
    res.json(data);
  } else {
    return data;
  }
}

// 删除字典项数据
export function deleteDictItem(req, res, u, b) {
  const body = (b && b.body) || req.body;
  const { id } = body;

  let dataSource = [...itemData];
  if (id) {
    dataSource = dataSource.filter(item =>  id !== item.id);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  listDict,
  deleteDictItem,
  getDict
}
