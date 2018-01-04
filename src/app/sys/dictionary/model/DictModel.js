import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';
import { loadDict, getDict, deleteDictItem } from '../service/DictService';

export default modelExtend( model, {
  namespace: 'dict',
  state: {
    currentItem: {},
    dictData: [],
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
    // 加载字典项
    *getDict({ payload }, { call, put }) {
      const response = yield call( getDict, payload );
      yield put({
        type: 'updateState',
        payload: {dictData: response},
      });
    },
    // 新增字典项
    *addDictItem({ payload }, { call, put }) {

    },
    *deleteDictItem({ payload }, { call, put }) {
      const response = yield call( deleteDictItem, payload );
      yield put({
        type: 'updateState',
        payload: {
          dictData: response,
          currentItem:{}
        },
      });
    },
    // 编辑/删除字典项
    *getDictItem({ payload }, { call, put }) {
      const response = yield call( getDictItem, payload );
      yield put({
        type: 'updateState',
        payload: {currentItem: response},
      });
    }
  }
})
