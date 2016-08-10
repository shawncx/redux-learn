import React, {Component, PropTypes} from 'react'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const {history, routes, store} = this.props;
    injectTapEventPlugin();
    return (


        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <Router history={history} children={routes}/>
          </div>
        </Provider>

    )
  }
}

export default AppContainer
