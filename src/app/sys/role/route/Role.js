import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from "dva";
import PageHeaderLayout from '../../../../core/layouts/PageHeaderLayout';

import RoleGrid from './RoleGrid';
import RoleModule from './RoleModule';
import RoleUser from './RoleUser';
import RoleConfig from './RoleConfig';

@connect(({ role, loading })  => ({
  role,
  loading: loading.models.role,
}))
export default class Role extends PureComponent {
  // 关闭窗口
  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/updateState',
      payload: {
        operateType: ''
      }
    })
  };

  render(){
    const { dispatch, loading } = this.props;
    const { data, operateType, currentItem, moduleData, configData } = this.props.role;

    const roleGridProps = {
      dispatch,
      loading,
      data
    };

    const modalProps = {
      currentItem,
      dispatch,
      operateType,
    };

    return(
      <PageHeaderLayout title="角色授权管理">
        <Card>
          <RoleGrid {...roleGridProps} />
        </Card>
        { operateType === 'module' && <RoleModule {...modalProps} data = {moduleData} handleCancel={()=>this.handleCancel()} /> }
        { operateType === 'user' && <RoleUser {...modalProps} handleCancel={()=>this.handleCancel()} /> }
        { operateType === 'config' && <RoleConfig {...modalProps} data = {configData} handleCancel={()=>this.handleCancel()} /> }
      </PageHeaderLayout>
    )
  }
}
