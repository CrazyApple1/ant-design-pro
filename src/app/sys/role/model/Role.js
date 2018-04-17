import modelExtend from 'dva-model-extend';
import { pageModel } from 'core/common/BaseModel';
import {
  list,
  saveRole,
  saveModule,
  delRole,
  lockRole,
  checkUnique,
  getRole,
  listModule,
  getDictItemByRoleId,
  listUserByRoleId,
} from '../service/RoleService';
import {message} from "antd/lib/index";
// 角色授权管理model
export default modelExtend(pageModel, {
  namespace: 'role',
  state: {
    currentItem: {},
    modalType: '',
    operateType: '',
    selectedRowKeys: [],
    moduleData: {
      data: [],
      checked: [],
    },
    userData: {
      data: [],
      checked: [],
    },
    configData: [],
  },
  effects: {
    // 校验编码唯一性
    *checkUnique({ payload }, { call }) {
      return yield call(checkUnique, payload);
    },
    // 加载权限列表
    *listRole({ payload }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'updateState',
        payload: {
          data: {
            list: response.data.data,
            pagination:{
              total: response.data.total,
              current: response.data.current
            }
          },
        },
      });
    },
    // 切换锁定状态
    *lockSwitch({ payload }, { call }){
      const response = yield call(lockRole, payload);
      if (response && response.success) {
      }
    },
    // 编辑按钮
    *edit({ payload }, { call, put }) {
      const response = yield call(getRole, payload);
      if (response && response.data) {
        yield put({
          type: 'updateState',
          payload: {
            modalType: 'edit',
            currentItem: response.data,
          },
        });
      }
    },
    // 保存提交
    *save({ payload }, { call, put }) {
      const response = yield call(saveRole, payload);
      if (response && response.data) {
        yield put({
          type: 'updateState',
          payload: {
            modalType: '',
            currentItem: {},
            data: {
              list: response.data.data,
              pagination:{
                total: response.data.total,
                current: response.data.current
              }
            },
          },
        });
        message.success('操作成功');
      } else {
        yield put({
          type: 'updateState',
          payload: {
            modalType: '',
            currentItem: {},
          },
        });
        message.success('操作失败');
      }
    },
    // 保存模块关系表
    *saveModule({ payload }, { call, put }) {
      const response = yield call(saveModule, payload);
      if (response && response.data) {
        yield put({
          type: 'updateState',
          payload: {
            moduleData: {
              checked: payload.param,
            }
          },
        });
        message.success('操作成功');
      } else {
        message.success('操作失败');
      }
    },
    // 加载模块授权列表
    *listModule({ payload }, { call, put }) {
      const response = yield call(listModule, payload);
      yield put({
        type: 'updateState',
        payload: {
          currentItem: payload.currentItem,
          moduleData: {
            data: response.data.modules,
            checked: response.data.roleModules,
          },
          operateType: payload.operateType,
        },
      });
    },
    // 获取所有授权参数
    *listConfig({ payload }, { call, put }) {
      const response = yield call(getDictItemByRoleId, payload);
      yield put({
        type: 'updateState',
        payload: {
          currentItem: payload.currentItem,
          configData: response,
          operateType: payload.operateType,
        },
      });
    },
    // 获取所有用户
    *listUser({ payload }, { call, put }) {
      const response = yield call(listUserByRoleId, payload);
      yield put({
        type: 'updateState',
        payload: {
          currentItem: payload.currentItem,
          userData: { ...response },
          operateType: payload.operateType,
        },
      });
    },
    // 删除
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(delRole, payload);
      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            data: {
              list: response.data.data,
              pagination:{
                total: response.data.total,
                current: response.data.current
              }
            },
            selectedRowKeys: [],
          },
        });
      }
      if (callback) callback();
    },
    // -- end
  },
});
