/**
 * Created by chenxiao on 8/21/16.
 */

export default (store, onEnter) => {
  return ({
    path: 'dashboard',
    onEnter,
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const Dashboard = require('../components/Dashboard').default
        cb(null, Dashboard)
      }, 'dashboard')
    }
  })
}
