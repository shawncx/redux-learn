/**
 * Created by chenxiao on 9/13/16.
 */
import {REQUEST_WORKLOADS, RESOLVE_WORKLOADS} from '../actions/workloadActions'

const ACTION_HANDLERS = {
  [REQUEST_WORKLOADS]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoading: true,
        selectedMilestone: action.milestone,
      })
  },
  [RESOLVE_WORKLOADS]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoading: false,
        message: action.result.message,
        tickets: action.result.tickets,
        developmentWorkload: action.result.developmentWorkload,
        evaluationWorkload: action.result.evaluationWorkload,
      })
  }
}

const initialState = {
  isLoading: false,
  message: null,
  tickets: [],
  selectedMilestone: null,
  developmentWorkload: null,
  evaluationWorkload: null,
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action): state
}