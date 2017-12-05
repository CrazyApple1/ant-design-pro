import { queryGoods, removeGoods, addGoods } from '../service/GoodsService';
import { pageModel } from '../../../common/BaseModel'
import modelExtend from 'dva-model-extend'

export default modelExtend(pageModel, {
  namespace: 'goods',

  state: {
    modalVisible: false,
    modalType: 'create',
    expandForm: false,
    selectedRows: [],
    formValues: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // loading
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      // 查询数据
      const response = yield call(queryGoods, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      // 取消loading
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(addGoods, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeGoods, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

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
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});
