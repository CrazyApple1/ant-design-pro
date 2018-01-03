import React, {PureComponent} from 'react';
import {Input, Table, Form, Row, Col, Switch, InputNumber, Divider} from 'antd';
import style from './Dict.less';

const FormItem = Form.Item;
const Area = Input.TextArea;

@Form.create()
export default class DictDetail extends PureComponent {
  componentDidMount() {
    console.info("详情加载");
  }

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const column = [{
      title: 'Key',
      dataIndex: 'key',
    }, {
      title: 'Value',
      dataIndex: 'value',
    }, {
      title: '排序',
      dataIndex: 'order',
    }, {
      title: '是否可用',
      dataIndex: 'enable',
    }, {
      title: '描述',
      dataIndex: 'desc',
    }];

    const data = [];
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
            这里是编码
          </FormItem>
          <FormItem label="键名"  {...formItemLayout}>
            <Input placeholder="请输入你的阶段性工作目标"/>
          </FormItem>
          <FormItem label="键值" {...formItemLayout}>
            <Input placeholder="请输入你的阶段性工作目标"/>
          </FormItem>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="排序" labelCol = {{span:6}}>
                <InputNumber placeholder="请输入你的阶段性工作目标"/>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="是否可用" labelCol = {{span:6}}>
                <Switch checkedChildren="启用" unCheckedChildren="停用"/>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="描述" {...formItemLayout}>
            <Area placeholder="请输入你的阶段性工作目标"/>
          </FormItem>
          <Divider/>
          <Table columns={column} dataSource={data} pagination={false} size="small"/>
        </Form>
      </div>
    )
  }
}

