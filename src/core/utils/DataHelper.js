// 判断是否存在子节点
export function hasChildren(data, idArray) {
  let itemArray = [];
  idArray.forEach(id => {
    filterID(data, id, itemArray);
  });
  return itemArray.join(',');
}

export function filterID(data, id, itemArray) {
  return data.forEach(item => {
    if (item.id === id) {
      if (!!item.children) return itemArray.push(item.name);
    } else {
      if (item.children) {
        filterID(item.children, id, itemArray);
      }
    }
  });
}

/**
 * 获得兄弟节点
 * @param data
 * @param targetPid
 * @returns {Array}
 */
export function getNodeBorther(data, targetPid) {
  let dude = [];
  if ('0' === targetPid || 0 === targetPid || '-' === targetPid) {
    dude = [...data];
  } else {
    data.forEach(item => {
      if (item.id === targetPid) {
        dude = [...item.children];
      } else if (item.children) {
        getNodeBorther(item.children, targetPid);
      }
    });
  }
  return dude;
}
