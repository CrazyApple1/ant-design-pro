import React, { PureComponent } from 'react';
import { Card, Table, Icon, Popconfirm , Tooltip } from 'antd';
import style from './Dict.less';
import {connect} from "dva";
import {message} from "antd/lib/index";
// 字典管理左侧列表树

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
      payload: {
        id: record.id,
        operateType: 'itemView',
      },
    });
  };
  // 字典删除
  handleDelete = (record) => {
    const { dispatch } = this.props;
    // 存在子节点的不允许删除
    dispatch({
      type: 'dict/deleteDict',
      payload: {
        id: record.id
      },callback: () => {
        message.success('操作成功.');
      },
    })
  };
  // 新增
  handleAddClick = () => {
    this.props.dispatch({
      type: 'dict/updateState',
      payload: {
        operateType: 'itemCreate',
        currentItem: {}
      },
    });
  };
  render() {
    const { loading, data } = this.props;

    const column = [{
      dataIndex: 'code',
      title: '分类代码'
    }, {
      dataIndex: 'name',
      title: '分类描述'
    },{
      title: '',
      render: (text, record) => (
        // 根分类不可进行删除
        "0" === record.parentid?"":<a onClick={e => this.handleDelete(record)}><Icon type="delete" /></a>
      ),
    }];

    return (
      <div>
        <Table
          indentSize = {5}
          className={style.dict_left_tree}
          title = {() => {
            return <Card actions={[<Tooltip placement="bottom" title="新建分类">
                                      <Icon type="edit" onClick={ e => this.handleAddClick() } />
                                  </Tooltip>,
                                  <div> </div>]} >
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
