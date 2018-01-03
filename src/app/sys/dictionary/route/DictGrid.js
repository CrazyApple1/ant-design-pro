import React, {PureComponent} from 'react';
import {Table, Input, Divider } from 'antd';
// 字典管理左侧列表树
const Search = Input.Search;
export default class DictGrid extends PureComponent {
  componentDidMount() {
    console.info("左侧表格初始化")
  }
  // 行点击事件
  handleOnRowClick = (record, index) => {
    const { dispatch } = this.props;

    console.info("row click " + index);
    console.info(record.id);

    dispatch({
      type: 'dict/loadDictItem',
      payload: {id: record.id,}
    });
  };

  // 搜索事件
  handleOnSearch = (val) => {
    const { dispatch,data } = this.props;

    console.info("search " + val);
    dispatch({
      type: 'dict/loadDict',
      payload: {filter: val,}
    });
  };

  render() {
    const { loading } = this.props;

    const column = [{
      dataIndex: 'name'
    }, {
      dataIndex: 'desc'
    }];

    return (
      <div>
        <Search
          placeholder="字典检索"
          onSearch={value => this.handleOnSearch(value)}
        />
        <Divider dashed={true}/>
        <Table onRow={(record, index) => ( {
                  onClick: () => this.handleOnRowClick(record, index)
                })}
               loading = {loading}
               rowKey={record => record.id}
               defaultExpandAllRows={true}
               scroll={{y: 640}}
               size="small"
               dataSource={data}
               columns={column}
               pagination={false}/>
      </div>
    )
  }
}
