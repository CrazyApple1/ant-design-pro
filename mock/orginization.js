// 树形数据
import {getUrlParams} from "./utils";

const data = [{
  id: 1,
  name: '根节点 Ora',
  isLeaf: false,
  parent: '',
  order: 1,
  status: '1',
  children: [{
    id: 11,
    name: '二级节点 - A',
    isLeaf: true,
    parent: '根节点',
    order: 1,
    status: '1',
  }, {
    id: 12,
    name: '二级节点 - B',
    parent: '根节点',
    isLeaf: false,
    order: 2,
    status: '1',
    children: [{
      id: 121,
      name: '三级节点 - A',
      parent: '二级节点 - B',
      order: 1,
      status: '1',
      isLeaf: true,
    }],
  }, {
    id: 13,
    name: '二级节点 - C.',
    parent: '根节点',
    isLeaf: false,
    order: 2,
    status: '1',
    address: 'London No. 1 Lake Park',
    children: [{
      id: 131,
      name: '三级节点 - C',
      isLeaf: false,
      status: '0',
      address: 'London No. 2 Lake Park',
      children: [{
        id: 1311,
        isLeaf: true,
        status: '0',
        order: 1,
        name: '四级节点 - C.',
        address: 'London No. 3 Lake Park',
      }],
    }],
  }],
}, {
  id: 2,
  name: '根节点 - ROOT',
  isLeaf: true,
  parent: '',
  order: 1,
  status: '0',
}, {
  id: 3,
  name: '根节点 - 333',
  isLeaf: true,
  parent: '',
  order: 1,
  status: '0',
}];
// 获取模块数据
export function listOrg(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  let dataSource = [...data];

  const params = getUrlParams(url);
  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }
}
// 删除组织
export function deleteOrg(req, res, b) {

  const body = (b && b.body) || req.body;
  const { ids } = body;
  if(data.length>2){
    data.pop();
  }
  if (res && res.json) {
    res.json(data);
  } else {
    return data;
  }
}
// 修改状态
export function changeStatus(req, res, b){
  const body = (b && b.body) || req.body;
  const { id, status } = body;

  let dataSource = [...data];
  dataSource = dataSource.map(data => {
    if(id === data.id){
      data.status = status;
    }
    return data;
  });

  if (res && res.json) {
    res.json(dataSource);
  } else {
    return dataSource;
  }

}
export default {
  listOrg,
  deleteOrg
};
