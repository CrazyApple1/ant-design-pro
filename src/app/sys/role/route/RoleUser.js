import React, { PureComponent } from 'react';
import { Modal, Table } from 'antd';
import styles from './Index.less';
// 授权用户窗口
export default class RoleUser extends PureComponent {
  render() {
    const { operateType, loading } = this.props;
    const { checked, data } = this.props.data;

    const column = [
      {
        title: '用户名',
        dataIndex: 'loginName',
      },
      {
        title: '姓名',
        dataIndex: 'username',
      },
      {
        title: '性别',
        dataIndex: 'sex',
      },
      {
        title: '身份证号',
        dataIndex: 'idCard',
      },
      {
        title: '所属部门',
        dataIndex: 'department',
      },
      {
        title: '是否锁定',
        dataIndex: 'lock',
      },
    ];

    const rowSelection = {
      fixed: true,
      selectedRowKeys: checked,
      onChange: selectedKeys => {
        // this.handleSelectRows(selectedKeys);
      },
    };
    return (
      <Modal
        visible={operateType === 'User'}
        title="选择授权用户  "
        okText="保存"
        cancelText="取消"
        onCancel={() => this.props.handleCancel()}
        width={750}
        bodyStyle={{ maxHeight: 500, overflowY: 'auto', overflowX: 'auto' }}
      >
        {/*左侧部门树列表*/}
        {/*右侧列表*/}
        {/*列表过滤条件*/}
        <Table
          dataSource={data}
          columns={column}
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          rowClassName={record => {
            return record.lock ? styles.disabled : styles.enabled;
          }}
        />
      </Modal>
    );
  }
}
