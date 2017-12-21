import { queryGoods, removeGoods, addGoods } from '../service/GoodsService';
import { pageModel } from '../../../core/common/BaseModel'
import modelExtend from 'dva-model-extend'

export default modelExtend(pageModel, {
  namespace: 'goods',
  state: {
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
      // loading
      yield put({ type: 'showLoading' });
      // 查询数据
      const response = yield call(queryGoods, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      // 取消loading
      yield put({ type: 'hideLoading' });
    },
    // 新增
    *add({ payload, callback }, { call, put }) {
      yield put({ type: 'showLoading' });
      const response = yield call(addGoods, payload);

      yield put({
        type: 'save',
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
        type: 'save',
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
