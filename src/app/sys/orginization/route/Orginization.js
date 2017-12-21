import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import ModuleTree from './List';
import PageHeaderLayout from '../../../core/layouts/PageHeaderLayout';


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
    const { dispatch } = this.props;
    const tableProps = {
      dispatch,
    };


    return (
      <PageHeaderLayout title="模块信息管理">
        <Card>
          <ModuleTree {...tableProps} />
        </Card>
      </PageHeaderLayout>
    )
  }
};

