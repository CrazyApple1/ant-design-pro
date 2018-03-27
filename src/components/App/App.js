import React from 'react';
import { connect } from 'dva';
import Loader from '../Loader';
import { getRouterData } from '../../core/common/router';

const App = WrappedComponent => {
  @connect(state => ({
    global: state.global,
  }))
  class App extends React.Component {
    componentDidMount() {
      this.props.dispatch({
        type: 'global/fetchMenus',
      });
    }
    render() {
      const menus = this.props.global.menus;
      const routerConfig = this.props.routerConfig;
      const routerData = getRouterData(routerConfig, menus);

      return menus.length === 0 ? (
        <Loader fullScreen spinning />
      ) : (
        <WrappedComponent {...this.props} menus={menus} routerData={routerData} />
      );
    }
  }

  return App;
};
export default App;
