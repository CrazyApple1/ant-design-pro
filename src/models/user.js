import { query as queryUsers, queryCurrent } from '../services/user';
import {getMenuData} from "../core/common/menu";

export default {
  namespace: 'user',

  state: {
    list: [],
    menus: [{
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
    }],
    currentUser: {},
  },

  effects: {
    // 查询
    listModule: function* ({payload}, {call, put}) {
      const response = getMenuData();
      // 查询数据
      yield put({
        type: 'updateState',
        payload: {
          menus: response
        },
      });
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
