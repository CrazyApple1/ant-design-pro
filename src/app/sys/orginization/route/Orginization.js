import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

@connect(state => ({
  orginization: state.orginization,
}))
export default class Orginization extends PureComponent {
  // 新增
  handleAdd = () => {

  };
  //编辑
  handleEdit = () => {

  };
  // 删除
  handleDelete = () => {

  };
  // 排序
  handleSort = () => {

  };
  render() {
    return (
      <PageHeaderLayout title="模块信息管理">
        <Card> 这是组织管理页面 </Card>
      </PageHeaderLayout>
    )
  }
};

