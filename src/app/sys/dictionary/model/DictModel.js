import modelExtend from 'dva-model-extend';
import { model } from '../../../../core/common/BaseModel';

export default modelExtend( model, {
  namespace: 'dict',
  state: {
    currentItem: {},
    loading,
    data: [{
      id: 1,
      name: '业务代码',
      children: [{
        id: 11,
        name: 'base_system',
        desc: '系统类型',
      }, {
        id: 12,
        name: 'base_operate',
        desc: '操作类型',
      }]
    }],
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
      console.info("click load");
      console.info(payload);
    },
    // 新增字典项
    *addDictItem({ payload }, { call, put }) {

    },
    // 编辑/删除字典项
    *editDictItem({ payload }, { call, put }) {

    }
  }
})
