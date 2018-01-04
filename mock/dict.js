import { getUrlParams } from './utils';
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
  }]},{
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
// 获取模块数据
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
// 获取模块数据
export function getDict(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = getUrlParams(url);
  let currentItem = {};
  // 查询
  if (params.id) {
    currentItem = {
        data: [{
          code: 'base_demo',
          key_name: '交旧商品库_示例',
          key_val: '0001',
          desc: '这是描述',
          enable: true,
          order: 1,
          parent: 1,
          parentName: '业务代码',
        }, {
          code: 'base_demo',
          key_name: '销售商品库_示例',
          key_val: '0002',
          desc: '这是描述',
          enable: false,
          order: 2,
          parent: 1,
          parentName: '业务代码',
        }]
    }
  }

  if (res && res.json) {
    res.json(currentItem);
  } else {
    return currentItem;
  }
}

export default {
  listDict,
  getDict
}
