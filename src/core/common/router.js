import React from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  // eslint-disable-next-line no-underscore-dangle
  models: () => models.filter(m => !app._models.some(
    ({ namespace }) => namespace === m
  )).map(m => import(`../../${m}.js`)),
  // add routerData prop
  component: () => {
    const p = component();
    return new Promise((resolve, reject) => {
      p.then((raw) => {
        const Comp = raw.default || raw;
        resolve(props => <Comp {...props} routerData={getRouterData(app)} />);
      }).catch(err => reject(err));
    });
  },
});

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = item.name;
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = item.name;
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerData = {
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
    '/goods/goodsinfo': {
      name: '商品信息',
      component: dynamicWrapper(app, ['app/goods/model/GoodsModel'], () => import('../../app/goods/route/Goods')),
    },
    '/sys/orginization': {
      component: dynamicWrapper(app, ['app/sys/orginization/model/Orginization'], () => import('../../app/sys/orginization/route/Orginization')),
    },
    '/sys/account': {
      component: dynamicWrapper(app, ['app/goods/model/GoodsModel'], () => import('../../app/goods/route/Goods')),
    },
    '/sys/module': {
      component: dynamicWrapper(app, ['app/goods/model/GoodsModel'], () => import('../../app/goods/route/Goods')),
    },
    '/sys/role': {
      component: dynamicWrapper(app, ['app/goods/model/GoodsModel'], () => import('../../app/goods/route/Goods')),
    },
    '/sys/dictionary': {
      component: dynamicWrapper(app, ['app/goods/model/GoodsModel'], () => import('../../app/goods/route/Goods')),
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
      component: dynamicWrapper(app, ['error'], () => import('../../routes/Exception/triggerException')),
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
  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name || menuData[item.replace(/^\//, '')],
    };
  });
  return routerDataWithName;
};
