/**
 * Created by works on 8/16/2016.
 */
import { TOGGLE_MENU } from '../actions/coreLayoutActions';

const ACTION_HANDLERS = {
  [TOGGLE_MENU]: (state, action) => Object.assign({}, state, {isMenuOpen: action.payload})
}

const initialState = {
  isMenuOpen: false,
}

export default function coreLayoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}