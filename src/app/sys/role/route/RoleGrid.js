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
        operateType: operate
      }
    })
  };

  render() {
    const { data, loading } = this.props;

    const column = [{
      title: '角色名称',
      dataIndex: 'roleName'
    },{
      title: '角色编码',
      dataIndex: 'roleCode'
    },{
      title: '上级角色',
      dataIndex: 'parentName'
    },{
      title: '模块授权',
      render: (text, record) => (
        <div>
          <a onClick={(e) => this.handleEditClick(record, 'Module')}>
            <Icon type="bars" />
            模块授权
          </a>
        </div>
      ),
    },{
      title: '用户授权',
      render: (text, record) => (
        <div>
          <a onClick={() => this.handleEditClick(record, 'User')}>
            <Icon type="usergroup-add" />
            用户授权
          </a>
        </div>
      ),
    },{
      title: '配置授权',
      render: (text, record) => (
        <div>
          <a onClick={(e) => this.handleEditClick(record, 'Config')}>
            <Icon type="setting" />
            配置授权
          </a>
        </div>
      ),
    }];

    return (
      <div>
        <Table dataSource={data}
               columns={column}
               loading={loading}
               rowKey={record => record.id}
        />
      </div>
    )
  }
}
