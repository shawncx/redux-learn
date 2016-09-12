import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'

import * as reducers from '../reducers'
import {routerReducer} from 'react-router-redux'

export default (initialState = {}, history) => {

  const middleware = [
    thunk,
    routerMiddleware(history),
    logger
  ]


  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middleware),
    )
  )

  return store
}
