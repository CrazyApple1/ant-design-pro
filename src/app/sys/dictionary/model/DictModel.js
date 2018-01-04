import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';
import { loadDict, loadDictItem } from '../service/DictService';

export default modelExtend( model, {
  namespace: 'dict',
  state: {
    currentItem: {},
    data: [],
    formValues: {}
  },
  effects: {
    // 搜索
    *loadDict({ payload }, { call, put }) {
      yield put({ type: "showLoading"});
      const response = yield call( loadDict, payload );
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({ type: "hideLoading"});
    },
    // 加载字典
    *loadDictItem({ payload }, { call, put }) {
      console.info("-------");
      const response = yield call( loadDictItem, payload );
      console.info(response);
      console.info("-------");
      yield put({
        type: 'updateState',
        payload: {currentItem: response},
      });
    },
    // 新增字典项
    *addDictItem({ payload }, { call, put }) {

    },
    // 编辑/删除字典项
    *editDictItem({ payload }, { call, put }) {

    }
  }
})
