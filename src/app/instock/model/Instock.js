import modelExtend from 'dva-model-extend';
import { model } from 'core/common/BaseModel';
import { saveInstock } from "../service/Instock";

export default modelExtend(model, {
  namespace: 'instock',
  state: {
    rowEdit: false,
  },
  effects: {
    // 保存采购入库单
    *saveInstock({ payload }, { call, put }) {
      console.info('  ---- > ');
      const response = yield call(saveInstock, payload);
      console.info(response);
      yield put({
        type: 'saveData',
        payload: response.data,
      });
    }
  },
});
