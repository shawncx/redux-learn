/**
 * Created by chenxiao on 8/21/16.
 */
import {LOGIN} from '../actions/loginActions'
import 'whatwg-fetch'



const ACTION_HANDLERS = {
  [LOGIN]: (state, action) => {
    console.log('Try to log with ' + action.username + '/' + action.password)
    fetch('/loginSuccess.json')
      .then(data => console.log(data))
      .catch(e => console.log(e))

  },
}

const initialState = {
  isLogin: false,
}

export default function Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}