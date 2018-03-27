import modelExtend from 'dva-model-extend';
import { model } from 'core/common/BaseModel';

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
  },
});
