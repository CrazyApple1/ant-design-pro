import React, { Component } from 'react';
import { Modal, Tree } from 'antd';
const Node = Tree.TreeNode;
//  授权模块窗口
export default class RoleModule extends Component {
  // 渲染树节点
  renderTreeNodes = (data) => {
   return data.map((item) => {
      if (item.children) {
        return (
          <Node title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </Node>
        );
      }
      return <Node title={item.title} key={item.id} />;
    });
  };

  render() {
    const { operateType } = this.props;
    const { data, checked } = this.props.data;

    return (
      <Modal
        title="选择授权模块"
        okText="保存"
        cancelText="取消"
        onCancel={() => this.props.handleCancel()}
        visible={operateType === 'module'}
        width={360}
        bodyStyle={ { height:480,overflowY: 'auto',overflowX: 'auto' }}>
        <Tree
          checkable
          checkedKeys={checked}
        >
          {this.renderTreeNodes(data)}
        </Tree>
      </Modal>
    )
  }
}
