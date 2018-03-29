import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tree, Row, Col, Card, Form, Input, Icon, Button, message, Popconfirm } from 'antd';
import AccountList from './List';
import Detail from './Detail';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';
import Page from 'components/Page'
import styles from './Account.less';

const FormItem = Form.Item;
const { TreeNode } = { ...Tree };

// 连接组件和store
// 把state.goods定给组件的goods
@connect(state => ({
  account: state.account,
}))
@Form.create()
export default class Account extends PureComponent {
  // 组件加载完成后加载数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/fetch',
    });
  }

  // 树节点选择
  onSelect = selectedKeys => {
    const { dispatch } = this.props;
    const values = {
      category: selectedKeys[0],
    };
    dispatch({
      type: 'account/fetch',
      payload: values,
    });
  };
  // 重置事件
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'account/fetch',
      payload: {},
    });
  };
  // 删除事件
  handleRemoveClick = () => {
    const { dispatch, goods: { selectedRowKeys } } = this.props;
    if (!selectedRowKeys) return;

    dispatch({
      type: 'account/remove',
      payload: {
        key: selectedRowKeys,
      },
      callback: () => {
        dispatch({
          type: 'account/updateState',
          payload: { selectedRowKeys: [] },
        });
      },
    });
  };
  // 搜索事件
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    // 表单验证
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      dispatch({
        type: 'account/fetch',
        payload: values,
      });
    });
  };
  // 新增窗口
  handleModalVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/showModal',
      payload: {
        modalType: 'create',
        currentItem: {},
      },
    });
  };

  // 左侧树
  renderCategoryTree() {
    return (
      <Card bordered={false}>
        <div className={styles.goodsInfoCategory}>
          <Icon type="tags" />归属部门
        </div>
        <Tree showLine defaultExpandedKeys={['021']} onSelect={this.onSelect}>
          <TreeNode title="parent 1" key="0">
            <TreeNode title="parent 1-0" key="01">
              <TreeNode title="leaf" key="012" />
              <TreeNode title="leaf" key="014" />
            </TreeNode>
          </TreeNode>
          <TreeNode title="parent 1-2" key="03">
            <TreeNode title="leaf" key="031" />
            <TreeNode title="leaf" key="032" />
          </TreeNode>
        </Tree>
      </Card>
    );
  }

  // 简单搜索条件
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="帐号">
              {getFieldDecorator('account_no')(<Input placeholder="输入帐号搜索" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户名称">
              {getFieldDecorator('account_name')(<Input placeholder="输入用户名称搜索" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 渲染界面
  render() {
    const { dispatch } = this.props;
    const {
      loading,
      data,
      selectedRowKeys,
      modalVisible,
      modalType,
      currentItem,
    } = this.props.account;

    const listPops = {
      dispatch,
      loading,
      data,
      selectedRowKeys,
    };

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      title: `${modalType === 'create' ? '新增用户' : '编辑用户'}`,
      wrapClassName: 'vertical-center-modal',
      onOk(detailData) {
        dispatch({
          type: 'account/add',
          payload: detailData,
        });
        message.success('添加成功');
      },
      onCancel() {
        dispatch({
          type: 'account/hideModal',
        });
      },
    };
    return (
      <PageHeaderLayout title="用户信息管理">
        <Page inner>
        <Row gutter={24}>
          {/* 左侧树 */}
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            {this.renderCategoryTree()}
          </Col>
          {/* 右侧列表 */}
          <Col xl={18} lg={18} md={18} sm={18} xs={18}>
            <Card bordered={false}>
              <div className={styles.goodsInfoList}>
                <div className={styles.goodsInfoListForm}>{this.renderSimpleForm()}</div>
                <div className={styles.goodsInfoListOperator}>
                  <Button
                    icon="plus"
                    type="primary"
                    onClick={() => this.handleModalVisible(true, 'create')}
                  >
                    新增用户
                  </Button>
                  {selectedRowKeys.length > 0 && (
                    <span>
                      <Popconfirm
                        title="确定要删除所选用户吗?"
                        placement="top"
                        onConfirm={this.handleRemoveClick}
                      >
                        <Button>删除用户</Button>
                      </Popconfirm>
                    </span>
                  )}
                </div>
                <AccountList {...listPops} />
              </div>
            </Card>
          </Col>
        </Row>
        {/* 新增窗口 */}
        {modalVisible && <Detail {...modalProps} />}
        </Page>
      </PageHeaderLayout>
    );
  }
}
