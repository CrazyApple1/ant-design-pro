import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const Area = Input.TextArea;

@Form.create()
export default class OrgDetail extends Component{
  componentDidMount() {
    console.info("load org detail");
  }
  handleCloseForm = () => {
    // 关闭窗口
    this.props.dispatch({
      type: 'orginization/updateState',
      payload: {
        modalType: ''
      }
    })
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalType, currentItem } = this.props;
    const cmView = modalType === 'view';

    console.info(currentItem);
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 14
      },
    };
    const formRowOne = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 19
      },
    };
    return (
      <Modal onCancel={() => this.handleCloseForm()}
             visible={modalType !== ''}
             width={600}
             title={ modalType === 'create'? '新增组织信息': modalType === 'edit'? '编辑组织信息':'查看组织信息'}>
        <Form>
        {/*第一行*/}
            <Row>
              <Col span={12}>
                <FormItem label="名称" {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: currentItem.name,
                  rules: [{ required: true, message: '请输入组织名称' }],
                })(
                  <Input />
                )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="编码" {...formItemLayout}>
                  {getFieldDecorator('code', {
                    initialValue: currentItem.code,
                    rules: [{
                      required: true,
                      message: '请输入编码',
                    }],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            {/*第二行*/}
            <FormItem label="上级节点" {...formRowOne} >
              {getFieldDecorator('code', {
                initialValue: currentItem.parent,
                rules: [{
                  message: '请输入编码',
                }],
              })(<Input />)}
            </FormItem>
            {/*第三行*/}
            <Row>
              <Col span={12}>
                <FormItem label="排序" {...formItemLayout} >
                  {getFieldDecorator('order', {
                    initialValue: currentItem.order,
                    rules: [{
                      message: '请输入编码',
                    }],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="状态" {...formItemLayout} >
                  {getFieldDecorator('status', {
                    initialValue: currentItem.status,
                    rules: [{
                      message: '请输入编码',
                    }],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            {/*第四行*/}
            <FormItem label="备注" {...formRowOne} >
              {getFieldDecorator('remark', {
                initialValue: currentItem.description,
                rules: [{
                  message: '请输入备注',
                }],
              })(<Area />)}
            </FormItem>
            {/*第五行*/}
            {cmView &&
            <Row>
              <Col span={12}>
                <FormItem label="创建人" {...formItemLayout} >
                  <Input disabled defaultValue={currentItem.description}/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="创建时间" {...formItemLayout} >
                  <Input disabled defaultValue={currentItem.description}/>
                </FormItem>
              </Col>
            </Row>
            }
            {/*第六行*/}
            {cmView &&
            <Row>
              <Col span={12}>
                <FormItem label="修改人" {...formItemLayout} >
                  <Input disabled defaultValue={currentItem.description}/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="修改时间" {...formItemLayout} >
                  <Input disabled defaultValue={currentItem.description}/>
                </FormItem>
              </Col>
            </Row>
            }
        </Form>
      </Modal>
    )
  }
}
