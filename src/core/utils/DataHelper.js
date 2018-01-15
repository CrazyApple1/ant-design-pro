// 判断是否存在子节点

export function hasChildren(data, idArray) {
  let itemArray = new Array();
  idArray.forEach( id => {
    filterID(data, id, itemArray);
  });
  return itemArray.join(",");
}

export function filterID(data, id, itemArray){
  return data.forEach(item => {
    if (item.id === id) {
      if(!!item.children) return itemArray.push(item.name);
    } else {
      if(item.children) {
        filterID(item.children, id, itemArray);
      }
    }
  })
}
