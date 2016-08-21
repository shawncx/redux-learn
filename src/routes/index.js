// We only need to import the modules necessary for initial render
import CounterRoute from './CounterRoute';
import HelloRoute from './HelloRoute';
import DashboardRoute from './DashboardRoute'
import { injectReducer } from '../reducers'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  
  const CoreLayoutContainer = require('../containers/CoreLayoutContainer').default
  const coreLayoutReducer = require('../reducers/coreLayoutReducer').default
  injectReducer(store, { key: 'coreLayout', reducer: coreLayoutReducer })

  const LoginContainer = require('../containers/LoginContainer').default
  const loginReducer = require('../reducers/loginReducer').default
  injectReducer(store, {key: 'login', reducer: loginReducer})

  return ({
    path: '/',
    component: CoreLayoutContainer,
    indexRoute: {component: LoginContainer},
    childRoutes: [
      // LoginRoute(store),
      CounterRoute(store),
      HelloRoute(store),
      DashboardRoute(store),
    ]
  })
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
