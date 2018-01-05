import React, {PureComponent} from 'react';
import {Input, Badge, Button, Table, Form, Row, Col, Switch, InputNumber, Divider} from 'antd';
import style from './Dict.less';

const FormItem = Form.Item;
const Area = Input.TextArea;

@Form.create()
export default class DictDetail extends PureComponent {
  componentDidMount() {
  }
  // 新增
  handleAddClick = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'dict/updateState',
      payload: {currentItem: {},}
    });
  };
  // 编辑事件
  handleEditClick = (record, e) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'dict/updateState',
      payload: {currentItem: record,}
    });
  };
  // 保存
  handleSaveClick = () => {
    console.info("save");
  };

  // 删除事件
  handleDeleteClick = (record, e) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'dict/deleteDictItem',
      payload: {id: record.id}
    });
  };

  render() {
    const {dictData, currentItem} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

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
          <Badge status="success" text="正常"/> : <Badge status="error" text="停用"/>
      }
    }, {
      title: '描述',
      dataIndex: 'desc',
    }, {
      title: '操作',
      render: (text, record) => (
        <div>
          <a onClick={e => this.handleEditClick(record, e)}>编辑</a>
          <Divider type="vertical"/>
          <a onClick={e => this.handleDeleteClick(record, e)}>删除</a>
        </div>
      )
    }];


    const formItemLayout = {
      labelCol: {
        xs: {span: 2},
      },
      wrapperCol: {
        xs: {span: 18},
      },
    };
    return (
      <div>
        <Form className={style.dict_form_item}>
          <FormItem label="编码"  {...formItemLayout} >
            {/* TODO 这里两个按钮的对齐有问题 */}
            <Row gutter={24}>
              <Col span={8}>{currentItem.code}</Col>
              <Col span={7} offset={9}>
                <Button type="danger" onClick={ () => this.handleAddClick() }>新增</Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={ () => this.handleSaveClick() }>保存</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="键名"  {...formItemLayout}>
            {getFieldDecorator('keyName', {
              initialValue: currentItem.keyName,
              rules: [{
                required: true,
                message: '请输入编码',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem label="键值" {...formItemLayout}>
            {getFieldDecorator('keyValue', {
              initialValue: currentItem.keyValue,
              rules: [{
                required: true,
                message: '请输入编码',
              }],
            })(<Input/>)}
          </FormItem>
          {/* TODO 这里对齐有问题 */}
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="排序" labelCol={{span: 6}}>
                {getFieldDecorator('order', {
                  initialValue: currentItem.order
                })(<InputNumber/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="是否可用" labelCol={{span: 6}}>
                {getFieldDecorator('enable', {
                  valuePropName: 'checked',
                  initialValue: currentItem.enable
                })(<Switch checkedChildren="启用" unCheckedChildren="停用"/>)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="描述" {...formItemLayout}>
            {getFieldDecorator('order', {
              initialValue: currentItem.desc
            })(<Area/>)}
          </FormItem>
          <Divider/>
          <Table
            rowKey={record => record.id}
            columns={column}
            dataSource={dictData}
            pagination={false}
            size="small"/>
        </Form>
      </div>
    )
  }
}

