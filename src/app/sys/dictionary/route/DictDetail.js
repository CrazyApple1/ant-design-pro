import React, { Component } from 'react';
import { Card, Input, Badge, Button, Table, Form, Row, Col, Switch, InputNumber, Divider } from 'antd';
import style from './Dict.less';
import {connect} from "dva";

const FormItem = Form.Item;
const Area = Input.TextArea;

@connect(({ loading }) => ({
  submitting: loading.effects['dict/submit'],
}))
@Form.create()
export default class DictDetail extends Component {
  componentDidMount() {
    console.info("dict detail")
  }

  // 新增
  handleAddClick = (operateType) => {
    const { dispatch, currentItem, form } = this.props;
    if (operateType === 'newDict') {
      dispatch({
        type: 'dict/updateState',
        payload: {
          operateType,
        },
      });
    } else {
      form.resetFields();
      dispatch({
        type: 'dict/updateState',
        payload: {
          operateType: 'newItem',
          currentItem: {
            keyName: '',
            keyValue: '',
            desc: '',
            order: 1,
            id: '',
            code: currentItem.code,
            parent: currentItem.parent,
            enable: true,
          },
        },
      });
    }
  };
  // 编辑事件
  handleEditClick = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/updateState',
      payload: { currentItem: record },
    });
  };
  // 保存
  handleSaveClick = () => {
    console.info('save');
    const { dispatch, currentItem } = this.props;
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: currentItem.id,
      };

      dispatch({
        type: 'dict/addDictItem',
        payload: data,
      });
    });
  };

  // 删除事件
  handleDeleteClick = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/deleteDictItem',
      payload: { id: record.id },
    });
  };

  render() {
    const { dictData, currentItem, operateType } = this.props;
    const { getFieldDecorator } = this.props.form;

    const column = [{
      title: 'Key',
      dataIndex: 'keyName',
    }, {
      title: 'Value',
      dataIndex: 'keyValue',
    }, {
      title: '排序',
      dataIndex: 'order',
    }, {
      title: '是否可用',
      dataIndex: 'enable',
      render: (text, record) => {
        return record.enable ?
          <Badge status="success" text="正常" /> : <Badge status="error" text="停用" />;
      },
    }, {
      title: '描述',
      dataIndex: 'desc',
    }, {
      title: '操作',
      render: (text, record) => (
        <div>
          <a onClick={e => this.handleEditClick(record, e)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={e => this.handleDeleteClick(record, e)}>删除</a>
        </div>
      ),
    }];

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 18 },
      },
    };

    const extraContent = (
      <Button type="danger" onClick={() => this.handleAddClick()}>删除字典项</Button>
    );

    const titleContent = (
      <div>
        <Button.Group>
          <Button onClick={() => this.handleAddClick('newDict')}>新增字典项</Button>
          <Button onClick={() => this.handleAddClick()}>新增子条目</Button>
        </Button.Group>
        { operateType !== '' && <Divider type="vertical" />}
        {operateType !== '' &&
        <Button type="primary" onClick={() => this.handleSaveClick()}>保存</Button>
        }
      </div>
    );
    return (
      <div>
        <Card bordered={false} title={titleContent} bodyStyle={{ padding: '0 32px 0 32px' }} extra={extraContent} />
        <Divider dashed />
        <Form  key="1" className={style.dict_form_item}>
          <FormItem key="2" label="编码" {...formItemLayout} >
            {
              currentItem.code ? currentItem.code : getFieldDecorator('code', {
                initialValue: currentItem.keyName,
                rules: [{
                  required: true,
                  message: '请输入编码',
                }],
              })(<Input />)
            }
          </FormItem>
          <FormItem key="3" label="键名" {...formItemLayout}>
            {getFieldDecorator('keyName', {
              initialValue: currentItem.keyName,
              rules: [{
                required: true,
                message: '请输入编码',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem key="4" label="键值" {...formItemLayout}>
            {getFieldDecorator('keyValue', {
              initialValue: currentItem.keyValue,
              rules: [{
                required: true,
                message: '请输入编码',
              }],
            })(<Input />)}
          </FormItem>
          {/* TODO 这里对齐有问题 */}
          <Row gutter={24}>
            <Col span={8}>
              <FormItem key="5" label="排序" labelCol={{ span: 6 }}>
                {getFieldDecorator('order', {
                  initialValue: currentItem.order,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem key="6" label="是否可用" labelCol={{ span: 6 }}>
                {getFieldDecorator('enable', {
                  valuePropName: 'checked',
                  initialValue: currentItem.enable ? currentItem.enable : true,
                })(<Switch checkedChildren="启用" unCheckedChildren="停用" />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="描述" {...formItemLayout}>
            {getFieldDecorator('desc', {
              initialValue: currentItem.desc,
            })(<Area />)}
          </FormItem>
          </Form>
          <Divider />
          <Table
            rowKey={record => record.id}
            columns={column}
            dataSource={dictData}
            pagination={false}
            size="small"
          />
      </div>
    );
  }
}

