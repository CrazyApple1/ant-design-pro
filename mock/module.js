// 树形数据
const data = [{
  key: 1,
  name: '根节点',
  parent: '',
  icon: 'folder',
  order: 1,
  url: '',
  status: '1',
  children: [{
    key: 11,
    name: '二级节点 - A',
    parent: '根节点',
    icon: 'hdd',
    order: 1,
    url: 'secode/level/url',
    status: '1',
  }, {
    key: 12,
    name: '二级节点 - B',
    parent: '根节点',
    icon: 'appstore',
    order: 2,
    url: 'secode/level/url',
    status: '1',
    children: [{
      key: 121,
      name: '三级节点 - A',
      parent: '二级节点 - B',
      icon: 'notification',
      order: 1,
      url: 'third/level/url',
      status: '1',
    }],
  }, {
    key: 13,
    name: '二级节点 - C.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: '三级节点 - C',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: '四级节点 - C.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: '根节点 - ROOT',
  parent: '',
  icon: 'folder',
  order: 1,
  url: '',
  status: '0',
}];
// 获取模块数据
export function getModule(res) {
  const dataSource = [...data];

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}

export default {
  getModule,
};
