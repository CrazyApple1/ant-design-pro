import React, { PureComponent } from 'react';
import { Card, Table, Icon, Input, Tooltip } from 'antd';
import style from './Dict.less';
import {connect} from "dva";
// 字典管理左侧列表树
const { Search } = { ...Input };

@connect(({ loading }) => ({
  loading: loading.models.dict,
}))
export default class DictGrid extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/listDict',
    });
  }
  // 行点击事件
  handleOnRowClick = (record) => {
    // 根节点不加载
    if (record.parentid === 0) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/getDict',
      payload: { id: record.id },
    });
  };

  // 搜索事件
  handleOnSearch = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/loadDict',
      payload: { filter: val },
    });
  };

  renderButton = () => {
    return <Search
      placeholder="字典检索"
      onSearch={value => this.handleOnSearch(value)}
    />
  };

  render() {
    const { loading, data } = this.props;

    const column = [{
      dataIndex: 'code',
      title: '分类代码'
    }, {
      dataIndex: 'name',
      title: '分类描述'
    }];

    const rowSelection = {
      type: 'checkbox'
    };

    return (
      <div>
        <Table
          indentSize = {5}
          rowSelection = {rowSelection}
          className={style.dict_left_tree}
          title = {() => {
            return <Card actions={[<Tooltip placement="bottom" title="新建分类"><Icon type="plus" /></Tooltip>,
                                  <Tooltip placement="bottom" title="删除分类"><Icon type="minus-circle-o" /></Tooltip>]} >
                      类型选择
                   </Card>
          }}
          onRow={(record, index) => ({
                  onClick: () => this.handleOnRowClick(record, index),
                })}
          rowClassName={(record) => {
            return record.children? style.top_node : style.blank;
          }}
          loading={loading}
          rowKey={record => record.id}
          defaultExpandAllRows
          scroll={{ y: 640 }}
          size="small"
          dataSource={data}
          columns={column}
          pagination={false}
        />
      </div>
    );
  }
}
