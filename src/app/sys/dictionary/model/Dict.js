import modelExtend from 'dva-model-extend';
import { model } from 'core/common/BaseModel';
import { list, getById, deleteById, add } from '../service/DictService';
import {message} from "antd/lib/index";

export default modelExtend(model, {
  namespace: 'dict',
  state: {
    currentItem: {},
    operateType: '',
    dictData: [],
    formValues: {},
  },
  effects: {
    // 搜索
    *loadDict({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const response = yield call(list, payload);
      yield put({
        type: 'saveData',
        payload: response,
      });
      yield put({ type: 'hideLoading' });
    },
    // 加载字典项
    *getDict({ payload }, { call, put }) {
      const response = yield call(getById, payload);
      yield put({
        type: 'updateState',
        payload: response,
      });
    },
    // 新增字典项
    *addDictItem({ payload }, { call, put }) {
      const response = yield call(add, payload);
      yield put({
        type: 'updateState',
        payload: {
          currentItem: {},
          dictData: response,
        },
      });
    },
    *submit() {
      message.success('提交成功');
    },
    *deleteDictItem({ payload }, { call, put }) {
      const response = yield call(deleteById, payload);
      yield put({
        type: 'updateState',
        payload: {
          dictData: response,
          currentItem: {},
        },
      });
    },
  },
});
