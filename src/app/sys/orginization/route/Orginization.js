import React, { Component } from 'react';
import { connect } from 'dva';
import OrgList from './OrgList';
import PageHeaderLayout from '../../../../core/layouts/PageHeaderLayout';

@connect(state => ({
  orginization: state.orginization,
}))
export default class Orginization extends Component {
  // 组件加载完成后加载数据
  componentDidMount() {
    console.info("org loaded");
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/fetch',
    });
  }

  render() {
    const { dispatch } = this.props;
    const { data, selectedRowKeys } = this.props.orginization;
    console.info(data);
    const tableProps = {
      dispatch,
      selectedRowKeys,
      data,
    };

    return (
      <PageHeaderLayout title="模块信息管理">
        <OrgList {...tableProps} />
      </PageHeaderLayout>
    );
  }
}

