/**
 * Created by works on 8/16/2016.
 */
import { injectReducer } from '../reducers'

export default (store) => ({
  path: 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginContainer = require('../containers/LoginContainer').default
      const reducer = require('../reducers/loginReducer').default
      injectReducer(store, {key: 'login', reducer})
      cb(null, LoginContainer)
    }, 'login')
  }
})