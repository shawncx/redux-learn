/**
 * Created by chenxiao on 9/6/16.
 */
import 'whatwg-fetch'

export const REQUEST_MILESTONES = 'REQUEST_MILESTONES'
export const RESOLVE_MILESTONES = 'RESOLVE_MILESTONES'

function requestMilestones() {
  return {
    type: REQUEST_MILESTONES,
  }
}

function resolveMilestones(json) {
  return {
    type: RESOLVE_MILESTONES,
    result: json,
  }
}

export function fetchMilestones() {
  return dispatch => {
    dispatch(requestMilestones())
    return fetch('http://localhost:5000/milestoneList')
      .then(response => response.json())
      .then(json => dispatch(resolveMilestones(json)))
      .catch(e => console.log(e))
  }
}