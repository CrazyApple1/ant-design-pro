import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace.toLowerCase() === model.substring(model.lastIndexOf('/') + 1).toLowerCase();
  })

);

// wrapper of dynamic
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
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../../${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
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
    '/goods/goodsinfo': {
      name: '商品信息',
      component: dynamicWrapper(app, ['app/goods/model/Goods'], () => import('../../app/goods/route/Goods')),
    },
    '/sys/orginization': {
      component: dynamicWrapper(app, ['app/sys/orginization/model/Orginization'], () => import('../../app/sys/orginization/route/Orginization')),
    },
    '/sys/account': {
      name: '用户管理',
      component: dynamicWrapper(app, ['app/sys/account/model/Account'], () => import('../../app/sys/account/route/Account')),
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
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['models/login'], () => import('../../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['models/register'], () => import('../../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
    };
  });
  return routerData;
};
