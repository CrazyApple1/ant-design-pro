import React, { Component } from 'react';
import { Row, Col, Form, Input, InputNumber, Modal, Switch, TreeSelect } from 'antd';

const FormItem = Form.Item;
const Area = Input.TextArea;
const TreeNode = TreeSelect.TreeNode;

@Form.create()
export default class AOEForm extends Component {
  componentDidMount() {
    // 加载树数据 - 只加载未停用状态的数据
    console.info('load org detail');
  }
  // 关闭窗口
  handleCloseForm = () => {
    this.props.dispatch({
      type: 'account/updateState',
      payload: {
        modalType: '',
      },
    });
  };
  // 保存
  handleSaveClick = () => {
    const { dispatch, item } = this.props;
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      };
      dispatch({
        type: 'account/save',
        payload: data,
      });
    });
  };
  // 渲染树节点
  renderTreeNodes = data => {
    return data
      .map(item => {
        if ('0001' === item.status) {
          if (item.children) {
            return (
              <TreeNode
                title={item.name}
                pathname={item.pathname ? item.pathname : item.name}
                key={item.id}
                value={item.id}
              >
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return (
            <Node
              title={item.name}
              pathname={item.pathname ? item.pathname : item.name}
              key={item.id}
              value={item.id}
            />
          );
        } else {
          return null;
        }
      })
      .filter(item => (item ? item : false));
  };
  // 渲染界面
  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalType, item, orgData } = this.props;
    const cmView = modalType === 'view';

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const formRowOne = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
    };

    return (
      <Modal
        onCancel={() => this.handleCloseForm()}
        visible={modalType !== ''}
        width={600}
        onOk={() => this.handleSaveClick()}
        title={
          modalType === 'create'? '新增用户信息': modalType === 'edit' ? '编辑用户信息' : '查看用户信息'
        }
      >
        <Form>
          {/*第一行*/}
          <Row>
            <Col span={12}>
              <FormItem label="姓名" hasFeedback {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: item.name,
                  rules: [{ required: true, message: '请输入组织名称' }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="昵称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('nickName', {
                  initialValue: item.nickName,
                  rules: [{message: '请输入编码',}],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="帐号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('account', {
                  initialValue: item.account,
                  rules: [{ required: true, message: '请输入用户帐号' }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="编码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('code', {
                  initialValue: item.code,
                  rules: [{message: '请输入用户编码',}],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          {/*第二行*/}
          <FormItem label="所属部门" hasFeedback {...formRowOne}>
            {getFieldDecorator('deptId', {
              initialValue: item.deptId,
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                showCheckedStrategy={TreeSelect.SHOW_ALL}
                allowClear
                showSearch
                treeNodeFilterProp="title"
                treeNodeLabelProp="pathname"
                placeholder="请选择所属部门节点"
              >
                {this.renderTreeNodes(orgData)}
              </TreeSelect>
            )}
          </FormItem>
          {/*第三行*/}
          <Row>
            <Col span={12}>
              <FormItem label="电话" hasFeedback {...formItemLayout}>
                {getFieldDecorator('tel', {
                  initialValue: item.tel,
                  rules: [
                    {
                      type: 'number',
                      message: '请输入电话',
                    },
                  ],
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="邮箱" hasFeedback {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: item.email,
                  rules: [
                    {
                      type: 'email',
                      message: '请输入邮箱地址',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="是否锁定" hasFeedback {...formRowOne}>
            {getFieldDecorator('locked', {
              valuePropName: 'checked',
              initialValue: !!item.locked,
            })(<Switch checkedChildren="启用" unCheckedChildren="锁定" />)}
          </FormItem>
          {/*第四行*/}
          <FormItem label="备注" hasFeedback {...formRowOne}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  message: '请输入备注',
                },
              ],
            })(<Area />)}
          </FormItem>
          {/*第五行*/}
          {cmView && (
            <Row>
              <Col span={12}>
                <FormItem label="创建人" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="创建时间" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
            </Row>
          )}
          {/*第六行*/}
          {cmView && (
            <Row>
              <Col span={12}>
                <FormItem label="修改人" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="修改时间" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>
    );
  }
}
