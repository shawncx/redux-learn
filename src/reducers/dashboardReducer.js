/**
 * Created by chenxiao on 9/2/16.
 */
import {REQUEST_TICKETS, RESOLVE_TICKETS} from '../actions/ticketActions'

const ACTION_HANDLERS = {
  [REQUEST_TICKETS]: (state, action) => {
    return Object.assign({}, state, {isLoading: true})
  },
  [RESOLVE_TICKETS]: (state, action) => {
    return Object.assign({}, state,
      {isLoading: false,
        message: action.result.message,
        tickets: action.result.tickets})
  }
}


const initialState = {
  isLoading: true,
  message: null,
  tickets: [],
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action): state
}