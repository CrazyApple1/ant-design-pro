import React, { PureComponent } from 'react';
import { Table, Alert, Divider } from 'antd';
import styles from './List.less';

class List extends PureComponent {
  // 清除选择
  cleanSelectedKeys = () => {
    this.handleSelectRows([]);
  };

  // 行选事件
  handleSelectRows = (rows) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/updateState',
      payload: { selectedRows: rows,}
    });

    console.info(this.props);
  };

  // 表格动作触发事件
  handleListChange = (pagination, filtersArg, sorter) => {
    const { dispatch, formValues } = this.props;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'goods/fetch',
      payload: params,
    });
  };

  render() {
    const {selectedRows, data: { list, pagination }, loading } = this.props;

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: '分类',
        dataIndex: 'category',
        render: val => (
          <div style={{ textAlign: 'center' }}>
            {val}
          </div>
        ),
      },
      {
        title: '编码',
        dataIndex: 'code',
        sorter: true,
      },
      {
        title: '单位',
        dataIndex: 'unit',
        sorter: true,
        render: val => (
          <div style={{ textAlign: 'center' }}>
            {val}
          </div>
        ),
      },
      {
        title: '装箱规格',
        dataIndex: 'spec',
      },
      {
        title: '条码',
        dataIndex: 'qrcode',
        sorter: true,
      },
      {
        title: '操作',
        render: () => (
          <div>
            <a href="">编辑</a>
            <Divider type="vertical" />
            <a href="">删除</a>
          </div>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const  rowSelectionProps = {
        fixed: true,
        selectedRowKeys: selectedRows,
        onChange: (keys) => {
          this.handleSelectRows(keys);
        }
    };
    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空选择</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          className={ styles.headBorder }
          bordered
          rowKey={record => record.key}
          rowSelection = {rowSelectionProps}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleListChange}
        />
      </div>
    );
  }
}
export default List;
