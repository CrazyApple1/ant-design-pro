import dynamic from "dva/dynamic";
import {createElement} from "react";

// 判断model是否已存在
const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace.toLowerCase() === model.substring(model.lastIndexOf('/') + 1).toLowerCase();
  })
);
// model包装器
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../../${model}`).default);
      }
    });
    return (props) => {
      return createElement(component().default, {
        ...props,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    // 判断model是否存在 避免重复注册
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../../${m}.js`)
    ),
    component: () => {
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props
        });
      });
    },
  });
};

export default function getConfig(app) {
  return {
      '/': {
        component: dynamicWrapper(app, ['models/user', 'models/login'], () => import('../layouts/BasicLayout')),
      },
      '/dashboard/analysis': {
        component: dynamicWrapper(app, ['models/chart'], () => import('../../routes/Dashboard/Analysis')),
      },
      '/dashboard/monitor': {
        component: dynamicWrapper(app, ['models/monitor'], () => import('../../routes/Dashboard/Monitor')),
      },
      '/dashboard/workplace': {
        component: dynamicWrapper(app, ['models/project', 'models/activities', 'models/chart'], () => import('../../routes/Dashboard/Workplace')),
        // hideInBreadcrumb: true,
        name: '工作台',
      },
      '/monitor/druid': {
        name: 'Druid监控',
        component: dynamicWrapper(app, [], () => import('../../app/monitor/druid/Druid')),
      },
      '/monitor/hystrix': {
        name: 'Hystrix',
        component: dynamicWrapper(app, [], () => import('../../app/monitor/hystrix/Hystrix')),
      },
      '/monitor/swagger': {
        name: 'Swagger',
        component: dynamicWrapper(app, [], () => import('../../app/monitor/swagger/Swagger')),
      },
      '/monitor/loginlog': {
        name: '登录日志',
        component: dynamicWrapper(app, [], () => import('../../app/monitor/druid/Druid')),
      },
      '/monitor/operatelog': {
        name: '操作日志',
        component: dynamicWrapper(app, [], () => import('../../app/monitor/druid/Druid')),
      },
      '/goods/goodsinfo': {
        name: '商品信息',
        component: dynamicWrapper(app, ['app/goods/model/Goods'], () => import('../../app/goods/route/Goods')),
      },
      '/sys/orginization': {
        name: '组织管理',
        component: dynamicWrapper(app, ['app/sys/orginization/model/Orginization'], () => import('../../app/sys/orginization/route/Orginization')),
      },
      '/sys/account': {
        name: '用户管理',
        component: dynamicWrapper(app, ['app/sys/account/model/Account'], () => import('../../app/sys/account/route/Account')),
      },
      '/sys/role': {
        name: '角色授权管理',
        component: dynamicWrapper(app, ['app/sys/role/model/Role'], () => import('../../app/sys/role/route/Role')),
      },
      '/sys/dictionary': {
        name: '字典管理',
        component: dynamicWrapper(app, ['app/sys/dictionary/model/Dict'], () => import('../../app/sys/dictionary/route/Dict')),
      },
      '/form/basic-form': {
        component: dynamicWrapper(app, ['models/form'], () => import('../../routes/Forms/BasicForm')),
      },
      '/form/step-form': {
        component: dynamicWrapper(app, ['models/form'], () => import('../../routes/Forms/StepForm')),
      },
      '/form/step-form/confirm': {
        component: dynamicWrapper(app, ['models/form'], () => import('../../routes/Forms/StepForm/Step2')),
      },
      '/form/step-form/result': {
        component: dynamicWrapper(app, ['models/form'], () => import('../../routes/Forms/StepForm/Step3')),
      },
      '/form/advanced-form': {
        component: dynamicWrapper(app, ['models/form'], () => import('../../routes/Forms/AdvancedForm')),
      },
      '/list/table-list': {
        component: dynamicWrapper(app, ['models/rule'], () => import('../../routes/List/TableList')),
      },
      '/list/basic-list': {
        component: dynamicWrapper(app, ['models/list'], () => import('../../routes/List/BasicList')),
      },
      '/list/card-list': {
        component: dynamicWrapper(app, ['models/list'], () => import('../../routes/List/CardList')),
      },
      '/list/search': {
        component: dynamicWrapper(app, ['models/list'], () => import('../../routes/List/List')),
      },
      '/list/search/projects': {
        component: dynamicWrapper(app, ['models/list'], () => import('../../routes/List/Projects')),
      },
      '/list/search/applications': {
        component: dynamicWrapper(app, ['models/list'], () => import('../../routes/List/Applications')),
      },
      '/list/search/articles': {
        component: dynamicWrapper(app, ['models/list'], () => import('../../routes/List/Articles')),
      },
      '/profile/basic': {
        component: dynamicWrapper(app, ['models/profile'], () => import('../../routes/Profile/BasicProfile')),
      },
      '/profile/advanced': {
        component: dynamicWrapper(app, ['models/profile'], () => import('../../routes/Profile/AdvancedProfile')),
      },
      '/result/success': {
        component: dynamicWrapper(app, [], () => import('../../routes/Result/Success')),
      },
      '/result/fail': {
        component: dynamicWrapper(app, [], () => import('../../routes/Result/Error')),
      },
      '/exception/403': {
        component: dynamicWrapper(app, [], () => import('../../routes/Exception/403')),
      },
      '/exception/404': {
        component: dynamicWrapper(app, [], () => import('../../routes/Exception/404')),
      },
      '/exception/500': {
        component: dynamicWrapper(app, [], () => import('../../routes/Exception/500')),
      },
      '/exception/trigger': {
        component: dynamicWrapper(app, ['models/error'], () => import('../../routes/Exception/triggerException')),
      },
  };
}

export function getMenus() {
  return [{
    id: 1,
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    order: 1,
    url: '',
    status: '1',
    children: [{
      id: 11,
      name: '分析页',
      path: 'analysis',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 12,
      name: '监控页',
      path: 'monitor',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 13,
      name: '工作台',
      path: 'workplace',
      order: 1,
      url: '',
      status: '1',
      // hideInMenu: true,
    }],
  }, {
    id: 2,
    name: '系统管理',
    icon: 'setting',
    path: 'sys',
    order: 1,
    url: '',
    status: '1',
    children: [
      {
        id: 21,
        icon: 'flag',
        name: '组织管理',
        path: 'orginization',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 22,
        icon: 'bars',
        name: '模块管理',
        path: 'module',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 23,
        icon: 'usergroup-add',
        name: '用户管理',
        path: 'account',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 24,
        icon: 'form',
        name: '权限管理',
        path: 'role',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 25,
        icon: 'profile',
        name: '字典管理',
        path: 'dictionary',
        order: 1,
        url: '',
        status: '1',
      },
    ],
  }, {
    id: 3,
    name: '系统监控',
    icon: 'book',
    path: 'monitor',
    order: 1,
    url: '',
    status: '1',
    children: [
      {
        id: 31,
        name: '数据库监控',
        path: 'druid',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 32,
        name: 'Hystrix',
        path: 'hystrix',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 33,
        name: 'Swagger',
        path: 'swagger',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 34,
        name: '访问日志',
        path: 'loginlog',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 35,
        name: '操作日志',
        path: 'operatelog',
        order: 1,
        url: '',
        status: '1',
      },
    ],
  }, {
    id: 4,
    name: '商品管理',
    icon: 'book',
    path: 'goods',
    order: 1,
    url: '',
    status: '1',
    children: [
      {
        id: 41,
        name: '商品信息',
        path: 'goodsinfo',
        order: 1,
        url: '',
        status: '1',
      },
    ],
  }, {
    id: 5,
    name: '表单页',
    icon: 'form',
    path: 'form',
    order: 1,
    url: '',
    status: '1',
    children: [{
      id: 51,
      name: '基础表单',
      path: 'basic-form',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 52,
      name: '分步表单',
      path: 'step-form',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 53,
      name: '高级表单',
      authority: 'admin',
      path: 'advanced-form',
      order: 1,
      url: '',
      status: '1',
    }],
  }, {
    id: 6,
    name: '列表页',
    icon: 'table',
    path: 'list',
    order: 1,
    url: '',
    status: '1',
    children: [{
      id: 61,
      name: '查询表格',
      path: 'table-list',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 62,
      name: '标准列表',
      path: 'basic-list',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 63,
      name: '卡片列表',
      path: 'card-list',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 64,
      name: '搜索列表',
      path: 'search',
      order: 1,
      url: '',
      status: '1',
      children: [{
        id: 641,
        name: '搜索列表（文章）',
        path: 'articles',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 642,
        name: '搜索列表（项目）',
        path: 'projects',
        order: 1,
        url: '',
        status: '1',
      }, {
        id: 643,
        name: '搜索列表（应用）',
        path: 'applications',
        order: 1,
        url: '',
        status: '1',
      }],
    }],
  }, {
    id: 7,
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    order: 1,
    url: '',
    status: '1',
    children: [{
      id: 71,
      name: '基础详情页',
      path: 'basic',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 72,
      name: '高级详情页',
      path: 'advanced',
      authority: 'admin',
      order: 1,
      url: '',
      status: '1',
    }],
  }, {
    id: 8,
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    order: 1,
    url: '',
    status: '1',
    children: [{
      id: 81,
      name: '成功',
      path: 'success',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 82,
      name: '失败',
      path: 'fail',
      order: 1,
      url: '',
      status: '1',
    }],
  }, {
    id: 9,
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    order: 1,
    url: '',
    status: '1',
    children: [{
      id: 91,
      name: '403',
      path: '403',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 92,
      name: '404',
      path: '404',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 93,
      name: '500',
      path: '500',
      order: 1,
      url: '',
      status: '1',
    }, {
      id: 94,
      name: '触发异常',
      path: 'trigger',
      hideInMenu: true,
      order: 1,
      url: '',
      status: '1',
    }],
  }, {
    id: 10,
    name: '使用文档',
    icon: 'book',
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank',
    order: 1,
    url: '',
    status: '1',
  }]
}
