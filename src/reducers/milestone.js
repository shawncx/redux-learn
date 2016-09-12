/**
 * Created by chenxiao on 9/13/16.
 */
import {REQUEST_MILESTONES, RESOLVE_MILESTONES} from '../actions/milestoneActions'

const ACTION_HANDLERS = {
  [REQUEST_MILESTONES]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoading: true
      })
  },
  [RESOLVE_MILESTONES]: (state, action) => {
    return Object.assign({}, state,
      {
        isLoading: false,
        message: action.result.message,
        milestones: action.result.milestones,
      })
  },
}


const initialState = {
  isLoading: true,
  message: null,
  milestones: [],
  selectedMilestone: null,
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action): state
}