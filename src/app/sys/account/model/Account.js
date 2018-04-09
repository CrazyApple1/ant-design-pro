import modelExtend from 'dva-model-extend';
import { listUser, delUser, lockUser } from '../service/AccountService';
import { listOrgByAttr } from '../../organization/service/Organization';
import { pageModel } from 'core/common/BaseModel';

export default modelExtend(pageModel, {
  namespace: 'account',
  state: {
    orgData: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    expandForm: false,
    selectedRowKeys: [],
    formValues: {},
  },
  effects: {
    // 右侧按条件查询
    *fetchUser({ payload }, { call, put}){
      const userData = yield call(listUser, payload);
      yield put({
        type: 'updateState',
        payload: {
          data: {
            list: userData.data
          },
        },
      });
    },
    // 查询
    *fetch({ payload }, { call, put }) {
      // 查询数据
      const userData = yield call(listUser, payload);
      const treeData = yield call(listOrgByAttr, {status:'0001'});
      yield put({
        type: 'updateState',
        payload: {
          data: {
            list: userData.data
          },
          orgData: treeData.data
        },
      });
    },
    // 新增
    *add({ payload, callback }, { call, put }) {
     // const response = yield call(addGoods, payload);

      yield put({
        type: 'saveData',
        payload: response,
      });
      if (callback) callback();
    },
    // 切换锁定状态
    *lockSwitch({ payload }, { call, put }){
      const response = yield call(lockUser, payload);
      if (response && response.success) {
      }
    },
    // 删除
    *remove({ payload, callback }, { call, put }) {
     const response = yield call(delUser, payload);
      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            data: {
              list:  response.data
            },
            selectedRowKeys: [],
          },
        });
      }
      if (callback) callback();
    },
  },
});
