import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';
import { getOrg, listOrg, deleteOrg, changeStatus } from '../service/Orginization';

export default modelExtend(model, {
  namespace: 'orginization',
  state: {
    currentItem: {},
    modalType: '',
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
    // 新增/新增子节点
    *addOrg({ payload }, { call, put }) {
      // 有id时为新增下级，加载父级节点相关信息
      yield put({
        type: 'updateState',
        payload: {
          ...payload
        }
      })
    },
    // 编辑
    *editOrg({ payload }, { call, put }){
      const response = yield call(getOrg, payload);
      yield put({
        type: 'updateState',
        payload: {
          modalType: 'edit',
          currentItem: response
        }
      })
    },
    // 更改可用状态
    *changeStatus({ payload }, { call, put }) {
      const response = yield call(changeStatus, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // 删除数据
    *deleteOrg({ payload, callback }, { call, put }) {
      // 查询数据
      const response = yield call(deleteOrg, payload);
      yield put({
        type: 'updateState',
        payload: {
          data: response,
          selectedRowKeys: []
        },
      });
      if(callback) {
        callback();
      }
    },
  },
});
