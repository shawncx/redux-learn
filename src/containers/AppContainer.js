import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

import CoreLayoutContainer from '../containers/CoreLayoutContainer'
import Login from '../containers/LoginContainer'
import Dashboard from '../containers/DashboardContainer'
import Hello from '../components/Hello'

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    // routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const {history, store} = this.props;
    injectTapEventPlugin();
    return (
        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <Router history={history} >
              <Route path='/' component={CoreLayoutContainer} >
                <IndexRoute component={Login} />
                <Route path="dashboard" component={Dashboard}/>
                <Route path="hello" component={Hello}/>
              </Route>
            </Router>

          </div>
        </Provider>

    )
  }
}

export default AppContainer
