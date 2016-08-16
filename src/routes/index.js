// We only need to import the modules necessary for initial render
import Login from './LoginRoute';
import CounterRoute from './CounterRoute';
import HelloRoute from './HelloRoute';
import { injectReducer } from '../reducers'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  
  const CoreLayoutContainer = require('../containers/CoreLayoutContainer').default
  const coreLayoutReducer = require('../reducers/coreLayoutReducer').default
  injectReducer(store, { key: 'coreLayout', reducer: coreLayoutReducer })
  
  return ({
    path: '/',
    component: CoreLayoutContainer,
    indexRoute: Login,
    childRoutes: [
      CounterRoute(store),
      HelloRoute(store)
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
