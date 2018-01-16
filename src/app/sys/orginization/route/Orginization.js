import React, { Component } from 'react';
import { connect } from 'dva';
import OrgList from './OrgList';
import OrgDetail from './OrgDetail';
import PageHeaderLayout from '../../../../core/layouts/PageHeaderLayout';

@connect(state => ({
  orginization: state.orginization,
}))
export default class Orginization extends Component {
  // 组件加载完成后加载数据
  render() {
    const { dispatch } = this.props;
    const { data, selectedRowKeys, modalType } = this.props.orginization;

    const tableProps = {
      dispatch,
      selectedRowKeys,
      data,
    };
    const modalProps = {
      dispatch,
      modalType,
    };

    return (
      <PageHeaderLayout title="模块信息管理">
        <OrgList {...tableProps} />
        {'' !== modalType && <OrgDetail {...modalProps} />}
      </PageHeaderLayout>
    );
  }
}

