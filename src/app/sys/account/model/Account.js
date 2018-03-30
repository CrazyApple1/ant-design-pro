import modelExtend from 'dva-model-extend';
import { queryGoods, removeGoods, addGoods } from '../service/AccountService';
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
    // 查询
    *fetch({ payload }, { call, put }) {
      // 查询数据
      const userData = yield call(queryGoods, payload);
      const treeData = yield call(listOrgByAttr, {status:'0001'});
      console.info(treeData);
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
      yield put({ type: 'showLoading' });
      const response = yield call(addGoods, payload);

      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({ type: 'hideLoading' });

      yield put({ type: 'hideModal' });
      if (callback) callback();
    },
    // 删除
    *remove({ payload, callback }, { call, put }) {
      yield put({ type: 'showLoading' });
      const response = yield call(removeGoods, payload);

      yield put({
        type: 'saveData',
        payload: response,
      });

      yield put({ type: 'hideLoading' });

      if (callback) callback();
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
});
