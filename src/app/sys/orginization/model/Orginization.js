import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';

export default modelExtend( model, {
  namespace: 'orginization',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    formValues: {},
    data:[]
  },
  effects: {
    // 查询
    *fetch({ payload }, { call, put }) {
      // loading
      yield put({ type: 'showLoading' });
      // 查询数据
      const response = yield call(getModule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      // 取消loading
      yield put({ type: 'hideLoading' });
    },
  }
})
