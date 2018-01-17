import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';
import { getMenuData } from '../../../../core/common/menu';

export default modelExtend(model, {
  namespace: 'module',
  state: {
    currentItem: {},
    modalType: 'create',
    selectedRowKeys: [],
    formValues: {},
  },
  effects: {
    // 查询
    listModule: function* ({payload}, {call, put}) {
      const response = getMenuData();
      // 查询数据
      yield put({
        type: 'updateState',
        payload: {
          data: response
        },
      });
    },
  },
})
