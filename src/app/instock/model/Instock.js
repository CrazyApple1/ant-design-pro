import modelExtend from 'dva-model-extend';
import { model } from 'core/common/BaseModel';

export default modelExtend(model, {
  namespace: 'instock',
  state: {
    rowEdit: false,
  },
  effects: {
  },
});
