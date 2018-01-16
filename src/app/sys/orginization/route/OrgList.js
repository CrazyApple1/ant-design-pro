import React, { Component } from 'react';
import { Table, Alert, Popconfirm, Divider, Badge, Button, Card, Input, Row, Col, message } from 'antd';
import { hasChildren } from '../../../../core/utils/DataHelper';

import styles from './Orginization.less';
import tableStyle from '../../../../core/style/Table.less';
import {connect} from "dva";

const { Search } = { ...Input };

// 部门管理列表
@connect(({ loading }) => ({
  loading: loading.models.orginization,
}))
export default class OrgList extends Component {
  // 加载组织列表
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/listOrg',
    });
  }
  // 新增
  handleAdd = (record) => {

  };

  // 启用/停用
  handleEnable = (record, e, status) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/changeStatus',
      payload: {
        id: record.id,
        status: status,
      }
    })

  };

  // 删除
  handleDelete = (record) => {
    const { dispatch } = this.props;
    if (!record.isLeaf) {
      message.error(`错误： [${record.name}] 存在子节点,无法删除.`);
    } else {
      dispatch({
        type: 'orginization/deleteOrg',
        payload: {
          ids: [record.id]
        },callback: () => {
          message.success('操作成功.');
        },
      })
    }
  };

  // 批量删除
  handleBatchDelete = () => {
    const { dispatch, selectedRowKeys, data, loading } = this.props;
    // 存在子节点的不允许删除
    const blockItem = hasChildren(data, selectedRowKeys);
    if (blockItem) {
      message.error(`错误： [${blockItem}] 存在子节点,无法删除.`);
    } else {
      dispatch({
        type: 'orginization/deleteOrg',
        payload: {
          ids: selectedRowKeys
        }
      })
    }
    // end if/else
  };

  // 编辑
  handleEdit = () => {
    console.info('编辑');
  };
  // 搜索
  handleSearch = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/listOrg',
      payload: {
        name: val
      }
    });
  };
  // 行选
  handleSelectRows = (rows) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/updateState',
      payload: { selectedRowKeys: rows },
    });
  };

  render(){
    const { data, selectedRowKeys, loading } =  this.props ;

    const statusMap = ['error', 'success'];
    const status = ['已停用', '正常'];

    const column = [{
      title: '单位/部门名称',
      dataIndex: 'name',
    }, {
      title: '所属单位/部门',
      dataIndex: 'parent',
    }, {
      title: '排序',
      dataIndex: 'order',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => {
        return <Badge status={statusMap[text]} text={status[text]} />;
      },
    }, {
      title: '操作',
      render: (text, record) => (
        <div>
          <a onClick={e => this.handleEdit(record, e)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={e => this.handleAdd(record, e)}>添加下级</a>
        </div>
      ),
    }, {
      title: '是否启用',
      width: 150,
      render: (text, record) => (
        <div>
          {record.status === '0' ?
            <a onClick={e => this.handleEnable(record, e, '1')}>启用</a>
            : <a onClick={e => this.handleEnable(record, e, '0')}>停用</a>}
          <Divider type="vertical" />
          <a onClick={e => this.handleDelete(record, e)}>删除</a>
        </div>
      ),
    }];

    const rowSelection = {
      fixed: true,
      selectedRowKeys,
      onChange: (selectedKeys) => {
        this.handleSelectRows(selectedKeys);
      },
    };

    return (
      <Card bordered={false}>
        <Row gutter={24} type="flex" justify="space-between" className={tableStyle.tableActionBtn}>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <div>
              <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>新增</Button>
              {
                selectedRowKeys.length > 0 && (
                  <span>
                  <Popconfirm title="确定要删除选中的条目吗?" placement="top" onConfirm={() => this.handleBatchDelete()}>
                    <Button>删除菜单</Button>
                  </Popconfirm>
                </span>
                )
              }
            </div>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6} offset={12}>
            <Search
              placeholder="输入组织名称以搜索"
              onSearch={value => this.handleSearch(value)}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        {/* 已选提示 */}
        <Alert
          className={tableStyle.tableAlert}
          message={(
            <div>
              已选择
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              <a style={{ marginLeft: 24 }} onClick={() => this.handleSelectRows([])}>清空选择</a>
            </div>
          )}
          type="info"
          showIcon
        />
        {/* 列表 */}
        <Table
          columns={column}
          dataSource={data}
          loading={loading}
          rowClassName={(record) => {
            return record.status === '0' ? styles.disabled : styles.enabled;
          }}
          rowKey={record => record.id}
          rowSelection={rowSelection}
        />
      </Card>
    );
  }
};

