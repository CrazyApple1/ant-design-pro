import modelExtend from 'dva-model-extend';
import { model } from 'core/common/BaseModel';
import { listDict, getDict, deleteById, add } from '../service/DictService';
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
    // 加载字典分类
    *listDict({ payload }, { call, put }) {
      const response = yield call(listDict, payload);
      yield put({
        type: 'saveData',
        payload: response.data,
      });
    },
    // 加载字典项
    *getDict({ payload }, { call, put }) {
      const response = yield call(getDict, payload);
      yield put({
        type: 'updateState',
        payload: {
          currentItem: response.data,
          operateType: ''
        },
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
