/**
 * Created by chenxiao on 8/21/16.
 */
import { injectReducer } from '../reducers'

export default (store, onEnter) => {
  return ({
    path: 'dashboard',
    onEnter,
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const Container = require('../containers/DashboardContainer').default
        const reducer = require('../reducers/dashboardReducer').default
        injectReducer(store, {key: 'dashboard', reducer})
        cb(null, Container)
      }, 'dashboard')
    }
  })
}
