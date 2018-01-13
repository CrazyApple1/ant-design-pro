// 判断是否存在子节点
export function hasChildren(data, idArray) {
  data.filter(item => {
    console.info(item);
    const block = idArray.some(id => {
      if (item.id === id) {
        return !!item.children;
      } else {
        if(item.children) {
          hasChildren(item.children, idArray);
        }
      }
    });
    if(block) return item;
  })
}
