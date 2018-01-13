import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';
import { listOrg } from '../service/Orginization';

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
  },
});
