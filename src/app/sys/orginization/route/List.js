import React from 'react';
import {Table, Alert, Divider, Badge, Button, Card, Input, Row, Col} from 'antd';
import styles from './Orginization.less';
import tableStyle from '../../../../core/style/Table.less';

const Search = Input.Search;
// 菜单管理列表
const List = ({...tableProps}) => {

  const { data } = {...tableProps};
  const statusMap = ['error', 'success'];
  const status = ['已停用', '正常',];

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
    render: (text, record) => {
      return <Badge status={statusMap[text]} text={status[text]}/>;
    }
  }, {
    title: '操作',
    render: (text, record) => (
      <div>
        <a onClick={e => handleEdit(record, e)}>编辑</a>
        <Divider type="vertical"/>
        <a onClick={e => handleAdd(record, e)}>添加下级</a>
      </div>
    ),
  }, {
    title: '是否启用',
    width: 150,
    render: (text, record) => (
      <div>
        {'0' == record.status ?
          <a onClick={e => handleEnable(record, e, '0')}>停用</a>
          : <a onClick={e => handleEnable(record, e, '1')}>启用</a>}
        <Divider type="vertical"/>
        <a onClick={e => handleDelete(record, e)}>删除</a>
      </div>
    ),
  }];

  // 新增
  const handleAdd = (record, e) => {
    console.info('添加下级');
  };

  // 启用/停用
  const handleEnable = (record, e, status) => {
    console.info('停用/启用');
  };

  // 删除
  const handleDelete = (record, e) => {
    console.info('删除');
  };

  //编辑
  const handleEdit = (record, e) => {
    console.info('编辑')
  };
  // 排序
  const handleSort = () => {

  };
  const rowSelection = {};

  return (
    <Card bordered={false}>
      <Row gutter={24} type="flex" justify="space-between" className={tableStyle.tableActionBtn}>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <div>
            <Button icon="plus" type="primary">新增</Button>
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={6} offset={12}>
          <Search
            placeholder="输入组织名称以搜索"
            onSearch={value => console.log(value)}
            style={{width: '100%'}}
          />
        </Col>
      </Row>
      {/* 已选提示 */}
      <Alert
        className={tableStyle.tableAlert}
        message={(
          <div>
            已选择 <a style={{fontWeight: 600}}> </a> 项&nbsp;&nbsp;
            <a style={{marginLeft: 24}}>清空选择</a>
          </div>
        )}
        type="info"
        showIcon
      />
      {/*列表*/}
      <Table
        columns = { column }
        dataSource= { data }
        rowClassName={(record, index) => {
          return '0' === record.status ? styles.disabled : styles.enabled;
        }}
        rowKey={record => record.key}
        rowSelection={ rowSelection }
      />
    </Card>
  )
};

export default List;
