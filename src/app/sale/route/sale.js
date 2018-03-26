import React, {PureComponent} from 'react';
import {connect} from 'dva';
import cs from 'classnames'
import {List, Avatar, Row, Col, Card, Input, Button, Divider} from 'antd';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';
import Page from 'components/Page';
import style from './Sale.less';

@connect(state => ({
  sale: state.sale,
}))
export default class Sale extends PureComponent {
  componentDidMount() {
    console.info('sale loaded');
  }

  handleCashInput = (e) => {
    console.info(e);
    console.info("cash");
  };
  handleCashBtnClick = () => {
    console.info('btn click');
  };

  render() {
    const {dispatch} = this.props;

    const data = [{
        title: 'Ant Design Title 1',
      },{
        title: 'Ant Design Title 2',
      }
      // ,{
      //   title: 'Ant Design Title 3',
      // },{
      //   title: 'Ant Design Title 4',
      // },{
      //   title: 'Ant Design Title 5',
      // },{
      //   title: 'Ant Design Title 6',
      // },{
      //  title: 'Ant Design Title 7',
      // },{
      //   title: 'Ant Design Title 8',
      // },{
      //   title: 'Ant Design Title 9',
      // },{
      //   title: 'Ant Design Title 10',
      // }
      ];


    return (
      <PageHeaderLayout title="零售开单">
        <Page className={style.pageWrapper} inner>
          <Row  gutter={16} className={style.flex_stretch}>
            {/*第一列*/}
            <Col span={16} className={style.left_col}>
              <Card bordered={false} className={style.gridWrapper}>
                <Card.Grid className={style.gridStyle}>地瓜</Card.Grid>
                <Card.Grid className={style.gridStyle}>饮料</Card.Grid>
                <Card.Grid className={style.gridStyle}>雪糕</Card.Grid>
                <Card.Grid className={style.gridStyle}>玩具</Card.Grid>
              </Card>
            </Col>
            {/*第二列*/}
            <Col span={8}>
              {/*顶部已选列表*/}
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.title} x 3</a>}
                    />

                    <Input className={style.input_20}/>
                  </List.Item>
                )}
              />
              {/*底部行*/}
              <Row className={style.footer_row}>
                <Col span={24} className={cs(style.text_right, style.total)}>
                  合计 <Divider type="vertical"/> xx元
                </Col>
              </Row>

              <Row className={style.footer_row}>
                <Col className={style.footbar_left} span={18}>
                  <Input type='number' onKeyDown={(e) => this.handleCashInput(e)}/>
                </Col>
                <Col className={style.footbar_right} span={6}>
                  <Button type='primary' onClick={this.handleCashBtnClick()}>收钱</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Page>
      </PageHeaderLayout>
    );
  }
}
