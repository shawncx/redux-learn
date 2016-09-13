/**
 * Created by chenxiao on 8/21/16.
 */
import {REQUEST_LOGIN, RESOLVE_LOGIN, REQUIRE_LOGIN} from '../actions/loginActions'


const ACTION_HANDLERS = {
  [REQUEST_LOGIN]: (state, action) => {
    return Object.assign({}, state, {isLoading: true})
  },
  [RESOLVE_LOGIN]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoading: false,
        isLogin: action.result.isSuccess,
        message: action.result.message,
        username: action.result.username,
        team: action.result.team,
      })
  }, 
  [REQUIRE_LOGIN]: (state) => {
    return Object.assign({}, state, 
      {
        message: 'Please login!'
      })
  }
}

const initialState = {
  isLogin: false,
  message: null,
  username: null,
  team: null, 
  isLoading: false,
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}