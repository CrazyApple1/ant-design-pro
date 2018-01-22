import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const Area = Input.TextArea;

@Form.create()
export default class OrgDetail extends Component{
  componentDidMount() {
    console.info("load org detail");
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalType } = this.props;

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
      <Modal visible
             width={600}
             title={ modalType === 'create'? '新增组织信息': modalType === 'edit'? '编辑组织信息':'查看组织信息'}>
        <Form>
        {/*第一行*/}
            <Row>
              <Col span={12}>
                <FormItem label="名称" {...formItemLayout}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                  <Input />
                )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="编码" {...formItemLayout}>
                  {getFieldDecorator('code', {
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
                    rules: [{
                      message: '请输入编码',
                    }],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="状态" {...formItemLayout} >
                  {getFieldDecorator('status', {
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
                rules: [{
                  message: '请输入备注',
                }],
              })(<Area />)}
            </FormItem>
            {/*第五行*/}
            <Row>
              <Col span={12}>
                <FormItem label="创建人" {...formItemLayout} >
                  <Input disabled defaultValue="abc"/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="创建时间" {...formItemLayout} >
                  <Input disabled defaultValue="2017"/>
                </FormItem>
              </Col>
            </Row>
            {/*第六行*/}
            <Row>
              <Col span={12}>
                <FormItem label="修改人" {...formItemLayout} >
                  <Input disabled defaultValue="cba"/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="修改时间" {...formItemLayout} >
                  <Input disabled defaultValue="2018"/>
                </FormItem>
              </Col>
            </Row>
        </Form>
      </Modal>
    )
  }
}
