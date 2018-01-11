import React, { PureComponent } from 'react';
import { Modal } from 'antd';
// 授权用户窗口
export default class RoleUser extends PureComponent {
  render() {
    const { operateType } = this.props;
    return (
      <Modal visible={operateType==='config'}>
        ABCDE
      </Modal>
    )
  }
}
