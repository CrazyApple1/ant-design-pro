import React, { PureComponent } from 'react';
import { Table, Input, Divider, Card } from 'antd';
const Search = Input.Search;
export default class DictGrid extends PureComponent{
  componentDidMount() {
    console.info("左侧表格初始化")
  }

  render() {
    const column = [{
      dataIndex: 'name'
    },{
      dataIndex: ''
    }];

    const data = [{
      key: 1,
      name: '业务代码.',
      children: [{
        key: 11,
        name: 'base_system',
        desc: '系统类型',
      }, {
        key: 12,
        name: 'base_operate',
        desc: '操作类型',
      }]
    }];
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
        />
        <Divider dashed={true}/>
        <Table defaultExpandAllRows={ true } scroll={{y:640}} size="small" dataSource={data} columns={column} pagination={ false }/>
      </div>
    )
  }
}
