import React, {Component} from 'react';
import {Card, Input, Badge, Button, Table, Form, Row, Col, Switch, InputNumber, Divider, Icon} from 'antd';
import style from './Dict.less';
import {connect} from "dva";

const FormItem = Form.Item;
const Area = Input.TextArea;

@connect(({loading}) => ({
  submitting: loading.effects['dict/submit'],
}))
@Form.create()
export default class DictDetail extends Component {

  // 新增
  handleAddClick = (operateType) => {
    const {dispatch, currentItem, form } = this.props;
    let code = currentItem.code;
    if(operateType === 'newDict') {
      code = '';
    }

    dispatch({
      type: 'dict/updateState',
      payload: {
        operateType: operateType,
        currentItem: {
          keyName: '',
          keyValue: '',
          desc: '',
          order: 1,
          id: '',
          code: code,
          parent: currentItem.parent,
          enable: true,
        },
        dictData: [],
      },
    });
    form.resetFields();
  };
  // 编辑事件
  handleEditClick = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'dict/updateState',
      payload: {currentItem: record},
    });
  };
  // 保存
  handleSaveClick = () => {
    const {dispatch, currentItem} = this.props;
    const {getFieldsValue, validateFields} = this.props.form;
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
    const {dispatch} = this.props;
    dispatch({
      type: 'dict/deleteDictItem',
      payload: {id: record.id},
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
          <Badge status="success" text="正常"/> : <Badge status="error" text="停用"/>;
      },
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
      ),
    }];

    const formRowOne = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };

    const extraContent = (
      <Button type="danger" onClick={() => this.handleAddClick()}>删除字典项</Button>
    );

    const titleContent = (
      <div>
        <Button.Group>
          <Button onClick={() => this.handleAddClick('newDict')} type="primary"><Icon type="book" />新增字典项</Button>
          <Button onClick={() => this.handleAddClick('newItem')} type="primary">新增子条目<Icon type="file-add" /></Button>
        </Button.Group>
        {operateType !== '' && <Divider type="vertical"/>}
        {operateType !== '' &&
        <Button type="primary" onClick={() => this.handleSaveClick()}>保存</Button>
        }
      </div>
    );
    return (
      <div>
        <Card bordered={false} title={titleContent} bodyStyle={{padding: '0 32px 0 32px'}} extra={extraContent}/>
        <Divider dashed/>
        <Form className={style.dict_form_item} layout="inline">
          <FormItem label="编码" {...formRowOne} >
            {
              getFieldDecorator('code', {
                initialValue: currentItem.code,
                rules: [{
                  required: true,
                  message: '请输入编码',
                }],
              })(<Input disabled={'' !== currentItem.code} />)
            }
          </FormItem>
          <FormItem label="编码描述" {...formRowOne}>
            {getFieldDecorator('keyName', {
              initialValue: currentItem.keyName,
              rules: [{
                required: true,
                message: '请输入字典项',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem label="归属分类" {...formRowOne}>
            {getFieldDecorator('keyValue', {
              initialValue: currentItem.keyValue,
              rules: [{
                required: true,
                message: '请输入键值',
              }],
            })(<Input/>)}
          </FormItem>
          <FormItem label="备注" {...formRowOne}>
            {getFieldDecorator('desc', {
              initialValue: currentItem.desc,
            })(<Area/>)}
          </FormItem>
        </Form>
        <Divider/>
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

