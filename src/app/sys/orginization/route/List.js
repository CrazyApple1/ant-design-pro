import React from 'react';
import { Table, Divider, Icon, Badge } from 'antd';

// 菜单管理列表
const List = ({...tableProps}) => {

  const { data } = { ...tableProps };

  const statusMap = ['error', 'success'];
  const status = ['已停用', '正常', ];

  const columns = [{
    title: '模块名称',
    dataIndex: 'name',
  },{
    title: '所属模块',
    dataIndex: 'parent',
  },{
    title: '图标',
    dataIndex: 'icon',
    render: (text, record) => (
      <Icon type={text} />
    )
  },{
    title: '排序',
    dataIndex: 'order',
  },{
    title: '路径',
    dataIndex: 'url',
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
        <a >编辑</a>
        <Divider type="vertical" />
        <a >删除</a>
      </div>
    ),
  },{
    title: '是否启用',
    render: (text, record) => (
      <div>
        <a>停用</a>
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
    <Table columns={ columns } dataSource={ data }  rowKey={record => record.key} rowSelection={ rowSelection }/>
  )
};

export default List;
