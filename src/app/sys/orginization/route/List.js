import React from 'react';
import { Table, Divider, Badge } from 'antd';
import styles from './Orginization.less';

// 菜单管理列表
const List = ({...tableProps}) => {

  const { data } = { ...tableProps };

  const statusMap = ['error', 'success'];
  const status = ['已停用', '正常', ];

  const columns = [{
    title: '单位/部门名称',
    dataIndex: 'name',
  },{
    title: '所属单位/部门',
    dataIndex: 'parent',
  },{
    title: '排序',
    dataIndex: 'order',
  },{
    title: '状态',
    dataIndex: 'status',
    render: (text, record) => {
      return <Badge status={statusMap[text]} text={status[text]} />;
    }
  },{
    title: '操作',
    render: (text, record) => (
      <div>
        <a>编辑</a>
        <Divider type="vertical" />
        <a>添加下级</a>
      </div>
    ),
  },{
    title: '是否启用',
    render: (text, record) => (
      <div>
        {'0' == record.status ? <a>停用</a> : <a>启用</a>}
        <Divider type="vertical" />
        <a>删除</a>
      </div>
    ),
  }];

  // 新增
  const handleAdd = () => {

  };

  // 删除
  const handleDelete = () => {

  };

  //编辑
  const handleEdit = () => {

  };
  // 排序
  const handleSort = () => {

  };
  const rowSelection = {};
  return (
    <Table
       columns={ columns }
       dataSource={ data }
       rowClassName = { (record, index) => {
         return '0' === record.status ? styles.disabled : styles.enabled;
       }}
       rowKey={record => record.key}
       rowSelection={ rowSelection }
    />
  )
};

export default List;
