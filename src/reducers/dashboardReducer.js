/**
 * Created by chenxiao on 9/2/16.
 */
import {REQUEST_MILESTONES, RESOLVE_MILESTONES} from '../actions/milestoneActions'
import {REQUEST_TICKETS, RESOLVE_TICKETS} from '../actions/ticketActions'

const ACTION_HANDLERS = {
  [REQUEST_MILESTONES]: (state, action) => {
    return Object.assign({}, state, {isLoadingMilestones: true})
  },
  [RESOLVE_MILESTONES]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoadingMilestones: false,
        message: action.result.message,
        milestones: action.result.milestones,
      })
  },
  [REQUEST_TICKETS]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoadingTickets: true,
        selectedMilestone: action.milestone,
      })
  },
  [RESOLVE_TICKETS]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoadingTickets: false,
        message: action.result.message,
        tickets: action.result.tickets,
      })
  }
}


const initialState = {
  isLoadingMilestones: true,
  isLoadingTickets: false,
  message: null,
  milestones: [],
  selectedMilestone: null,
  tickets: [],
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action): state
}