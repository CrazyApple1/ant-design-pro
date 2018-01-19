import React from 'react';
import {connect} from "dva";
import Loader from '../Loader';

const App = (WrappedComponent) => {
  @connect(state => ({
    global: state.global,
  }))
  class App extends React.Component {
    componentDidMount() {
      this.props.dispatch({
        type: 'global/fetchMenus'
      })
    }
    render() {
      const menus = this.props.global.menus;

      return (
        menus.length === 0 ? <Loader fullScreen spinning />:
          <WrappedComponent {...this.props} menus={menus}/>
      )
    }
  }

  return App;
};
export default App;
