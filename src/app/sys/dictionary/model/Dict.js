import modelExtend from 'dva-model-extend';
import { model } from 'core/common/BaseModel';
import { listDict, getDict, deleteDict, editDict, deleteDictItem } from '../service/DictService';

export default modelExtend(model, {
  namespace: 'dict',
  state: {
    currentItem: {},
    operateType: '',
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
    *deleteDict({ payload, callback }, { call, put }) {
      const response = yield call(deleteDict, payload);
      // 只有返回成功时才刷新
      if(response && response.success){
        // 从当前数据对象中找到响应ID记录删除值
        yield put({
          type: 'updateState',
          payload: {
            data: response.data,
          },
        });
        if(callback) {
          callback();
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            loading: { global: false}
          },
        });
      }
    },
    // 新增/编辑字典项
    *editDict({ payload }, { call, put }) {
      const response = yield call(editDict, payload);
      if (response){
        yield put({
          type: 'updateState',
          payload: {
            operateType: ''
          },
        });
      }
    },
    *deleteDictItem({ payload }, { call, put }) {
      const response = yield call(deleteDictItem, payload);
      const id = payload.id;
      currentItem.items = currentItem.items.filter( i => id !== i.id);
    },
  },
});
