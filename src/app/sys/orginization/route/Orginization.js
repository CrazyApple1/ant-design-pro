import React, { PureComponent } from 'react';
import { connect } from 'dva';
import OrgTreeGrid from './List';
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

  render() {
    const { dispatch } = this.props;
    const { data, selectedRowKeys } = this.props.orginization;
    const tableProps = {
      dispatch,
      selectedRowKeys,
      data
    };

    return (
      <PageHeaderLayout title="模块信息管理">
          <OrgTreeGrid {...tableProps} />
      </PageHeaderLayout>
    )
  }
};

