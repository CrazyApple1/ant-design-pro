import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';
import { listOrg, deleteOrg } from '../service/Orginization';

export default modelExtend(model, {
  namespace: 'orginization',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    formValues: {},
  },
  effects: {
    // 查询
    *listOrg({ payload }, { call, put }) {
      // 查询数据
      const response = yield call(listOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // 删除数据
    *deleteOrg({ payload, callback }, { call, put }) {
      // 查询数据
      const response = yield call(deleteOrg, payload);
      yield put({
        type: 'updateState',
        payload: {
          data: response,
          selectedRowKeys: []
        },
      });
      if(callback) {
        callback();
      }
    },
  },
});
