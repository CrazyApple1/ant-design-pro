import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import DictGrid from './DictGrid';
import DictDetail from './DictDetail';

import PageHeaderLayout from 'core/layouts/PageHeaderLayout';

@connect(state => ({
  dict: state.dict,
}))
export default class Dict extends PureComponent {
  componentDidMount() {
    console.info('dict loaded');
  }
  render() {
    const { dispatch } = this.props;
    const { currentItem, data, loading, operateType } = this.props.dict;

    const DictGridProps = {
      dispatch,
      loading,
      data,
    };

    const DictDetailProps = {
      currentItem,
      dispatch,
      loading,
      data,
      operateType,
    };

    return (
      <PageHeaderLayout title="字典信息管理">
        <Card>
          <Row gutter={24}>
            {/* 左侧列表 */}
            <Col xl={8} lg={8} md={8} sm={8} xs={8}>
              <DictGrid {...DictGridProps} />
            </Col>
            {/* 右-上-字典键值列表 */}
            {/* 右-下-字典键值新增/编辑区域 */}
            <Col xl={16} lg={16} md={16} sm={16} xs={16}>
              <DictDetail {...DictDetailProps} />
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
