import React, { PureComponent } from 'react';
import { Table, Icon } from 'antd';

export default class RoleGrid extends PureComponent {
  // 初始化加载数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/listRole',
    });
  }
  // 用户授权按钮
  handleEditClick = (record, operate) => {
    const { dispatch } = this.props;

    dispatch({
      type: `role/list${operate}`,
      payload: {
        id: record.id,
        currentItem: record,
        operateType: operate,
      },
    });
  };

  // 清除选择
  cleanSelectedKeys = () => {
    this.handleSelectRows([]);
  };
  // 行选事件
  handleSelectRows = rows => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/updateState',
      payload: { selectedRowKeys: rows },
    });
  };

  render() {
    const { list, pagination, selectedRowKeys, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const rowSelectionProps = {
      selectedRowKeys,
      onChange: selectedKeys => {
        this.handleSelectRows(selectedKeys);
      },
    };
    const column = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '角色编码',
        dataIndex: 'code',
      },
      {
        title: '模块授权',
        render: (text, record) => (
          <div>
            <a onClick={e => this.handleEditClick(record, 'Module')}>
              <Icon type="bars" />
              模块授权
            </a>
          </div>
        ),
      },
      {
        title: '用户授权',
        render: (text, record) => (
          <div>
            <a onClick={() => this.handleEditClick(record, 'User')}>
              <Icon type="usergroup-add" />
              用户授权
            </a>
          </div>
        ),
      },
      {
        title: '配置授权',
        render: (text, record) => (
          <div>
            <a onClick={e => this.handleEditClick(record, 'Config')}>
              <Icon type="setting" />
              配置授权
            </a>
          </div>
        ),
      },
    ];

    return (
      <div>
        <Table  pagination={paginationProps}
                bordered
                rowKey={record => record.id}
                rowSelection={rowSelectionProps}
                dataSource={list}
                columns={column}
                loading={loading}
                rowKey={record => record.id} />
      </div>
    );
  }
}
