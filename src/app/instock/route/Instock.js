import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Table, Input, InputNumber, Button, Card, DatePicker, Divider} from 'antd';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';
import style from './Instock.less';
import {Fragment} from "react";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
/**
 * 进货单界面
 */
@Form.create()
@connect(state => ({
  instock: state.instock,
}))
export default class Instock extends PureComponent {
  componentDidMount() {
    console.info('instock loaded');
  }
  // 表单保存
  // 子表新增
  // 编辑
  // 删除

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: '品名',
        dataIndex: 'name',
      },
      {
        title: '单位',
        dataIndex: 'unit',
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '入库单价',
        dataIndex: 'price',
        render: (text, record) => {
          const id = record.id;
          return getFieldDecorator(id)(<InputNumber onBlur={() => this.priceChange()} />);
        },
      },
      {
        title: '总价',
        dataIndex: 'subtotal',
        render: (text, record) => {
          const id = record.id;
          return getFieldDecorator(id)(<InputNumber onBlur={() => this.priceChange()} />);
        },
      },
      {
        title: '操作',
        render: (text, record) => {
          return '编辑 | 删除';
        },
      },
    ];
    const formRowOne = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <PageHeaderLayout title="采购入库单">
        <Form>
          <Card className={style.card} title={"入库详情 - RKD201808501"} extra={(
            <div>
              <Button> 挂单 </Button>
              <Divider type="vertical"/>
              <Button type="primary"> 保存 </Button>
            </div>
          )}>
          {/*顶部已选列表*/}
              <Row gutter={16}>
                <Col span={6} >
                  <FormItem label="入库日期" {...formRowOne}>
                    {getFieldDecorator('indate', {
                      initValue: moment.now(),
                      required: true
                    })(<DatePicker showTime />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="承运人" {...formRowOne}>
                    {getFieldDecorator('shiped_person', {
                    })(<Input disabled/>)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="签收人" {...formRowOne}>
                    {getFieldDecorator('deliverd_person', {
                      required: true
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>
              {/*  第二行 */}
              <Row gutter={16}>
                <Col span={18} >
                  <FormItem label="备注"  labelCol = {{ span: 2 }} wrapperCol = {{ span: 22 }}>
                    {getFieldDecorator('remark', {
                    })(<TextArea />)}
                  </FormItem>
                </Col>
              </Row>
            </Card>
            <Card title="入库明细" extra={<Button icon="file-excel" type="danger"> 导入 </Button>}>
              <Table
                columns={columns}
                pagination={false}
                rowKey={record => record.id}
              />
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              icon="plus"
            >
              新增明细
            </Button>
          </Card>
        </Form>
      </PageHeaderLayout>
    );
  }
}
