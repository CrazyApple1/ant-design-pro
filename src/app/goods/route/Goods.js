import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tree, Row, Col, Card, Form, Input, Icon, Button, Modal, message } from 'antd';
import GoodsList from './List';
import Detail from './Detail';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './Goods.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

// 将对象转为，分割的字符串
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

//连接组件和store
// 把state.rule绑定给组件的 rule
@connect(state => ({
  goods: state.goods,
}))
@Form.create()
export default class Goods extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    modalType: 'create',
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  // 组件加载完成后加载数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/fetch',
    });
  }
  
  // 表格动作触发事件
  handleListChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

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
  }
  // 树节点选择
  onSelect = (selectedKeys, info) => {
    const { dispatch } = this.props;
    const values = {
      category : selectedKeys[0]
    }
    dispatch({
      type: 'goods/fetch',
      payload: values,
    });
  }
  // 重置事件
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'goods/fetch',
      payload: {},
    });
  }

  // 折叠查询条件
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  // 删除事件
  handleRemoveClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'goods/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:break;
    }
  }
  // 行选事件
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  // 搜索事件
  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    // 表单验证
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'goods/fetch',
        payload: values,
      });
    });
  }

  // 新增窗口
  handleModalVisible = (flag, action) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  
  // 新增窗口保存按钮事件
  handleAdd = () => {
    this.props.dispatch({
      type: 'goods/add',
      payload: {
        description: this.state.addInputValue,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  // 简单搜索条件
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="商品名称">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品编码">
              {getFieldDecorator('code')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  // 高级查询条件
  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="商品名称">
              {getFieldDecorator('name')(
                <Input placeholder="请输入名称" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品编码">
              {getFieldDecorator('code')(
                <Input placeholder="请输入编码" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品条码">
              {getFieldDecorator('qrcode')(
                <Input placeholder="请输入条码" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }
  // 是否展开
  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  // 渲染界面
  render() {
    const { goods: { loading: loading, data } } = this.props;
    const { selectedRows, modalVisible, addInputValue, modalType } = this.state;
    
    const modalProps = {
      item: modalType,
      visible: modalVisible,
      maskClosable: false,
      // confirmLoading: loading.effects['goods/update'],
      title:  '添加商品',
      wrapClassName: 'vertical-center-modal',
      onOk (data) {
        dispatch({
          type: `goods/create`,
          payload: data,
        })
        message.success('添加成功');
        this.setState({
          modalVisible: false,
        });
      },
      onCancel () {
        this.setState({
          modalVisible: false,
        });
      },
    }

    return (
      <PageHeaderLayout title="商品基本信息查询">
      <Row gutter={24}>
      {/* 左侧树 */}
      <Col xl={6} lg={24} md={24} sm={24} xs={24}>
        <Card bordered={false}>
          <div className={styles.goodsInfoCategory}>
            <Icon type="tags" />
            选择商品分类
          </div>
          <Tree
            showLine
            defaultExpandedKeys={['021']}
            onSelect={this.onSelect}>
            <TreeNode title="parent 1" key="0">
              <TreeNode title="parent 1-0" key="01">
                <TreeNode title="leaf" key="012" />
                <TreeNode title="leaf" key="013" />
                <TreeNode title="leaf" key="014" />
              </TreeNode>
              <TreeNode title="parent 1-1" key="02">
                <TreeNode title="leaf" key="021" />
              </TreeNode>
              <TreeNode title="parent 1-2" key="03">
                <TreeNode title="leaf" key="031" />
                <TreeNode title="leaf" key="032" />
              </TreeNode>
            </TreeNode>
          </Tree>
        </Card>
      </Col>
      {/* 右侧列表 */}
      <Col xl={18} lg={24} md={24} sm={24} xs={24}>
        <Card bordered={false}>
          <div className={styles.goodsInfoList}>
            <div className={styles.goodsInfoListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.goodsInfoListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'create')}>新增商品</Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button onClick={this.handleRemoveClick}  selectedKeys={[]}>删除商品</Button>
                 </span>
                )
              }
            </div>
            <GoodsList
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleListChange}
            />
          </div>
        </Card>
        </Col>
        </Row>
        {/* 新增窗口 */}
        {modalVisible && <Detail {...modalProps} />}

      </PageHeaderLayout>
    );
  }
}
