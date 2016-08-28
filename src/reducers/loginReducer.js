/**
 * Created by chenxiao on 8/21/16.
 */
import {REQUEST_LOGIN, RESOLVE_LOGIN} from '../actions/loginActions'


const ACTION_HANDLERS = {
  [REQUEST_LOGIN]: (state, action) => {
    return Object.assign({}, state, {isLoading: true})
  },
  [RESOLVE_LOGIN]: (state, action) => {
    return Object.assign({}, state,
      {isLoading: false,
        isLogin: action.result.isSuccess,
        message: action.result.message,
        username: action.result.username})
  }
}

const initialState = {
  isLogin: false,
  message: null,
  username: null,
  isLoading: false
}

export default function Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}