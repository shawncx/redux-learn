/**
 * Created by chenxiao on 9/13/16.
 */
import {REQUEST_TICKETS, RESOLVE_TICKETS} from '../actions/ticketActions'

const ACTION_HANDLERS = {
  [REQUEST_TICKETS]: (state) => {
    return Object.assign({}, state,
      {
        isLoading: true,
      })
  },
  [RESOLVE_TICKETS]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoading: false,
        message: action.result.message,
        tickets: action.result.tickets,
      })
  }
}

const initialState = {
  isLoading: false,
  message: null,
  tickets: [],
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action): state
}