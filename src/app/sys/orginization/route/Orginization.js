import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import ModuleTree from './List';
import PageHeaderLayout from '../../../../core/layouts/PageHeaderLayout';


@connect(state => ({
  orginization: state.orginization,
}))
export default class Orginization extends PureComponent {
  // 组件加载完成后加载数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/fetch',
    });
  }

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
    const { data } = this.props.orginization;
    const tableProps = {
      dispatch,
      data
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

