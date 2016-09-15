/**
 * Created by chenxiao on 9/2/16.
 */
import 'whatwg-fetch'

export const REQUEST_WORKLOADS = 'REQUEST_WORKLOAD'
export const RESOLVE_WORKLOADS = 'RESOLVE_WORKLOAD'

function requestWorkloads(milestone) {
  return {
    type: REQUEST_WORKLOADS,
    milestone: milestone,
  }
}

function resolveWorkloads(json) {
  return {
    type: RESOLVE_WORKLOADS,
    result: json,
  }
}

export function fetchWorkloads(team, milestone) {
  return dispatch => {
    dispatch(requestWorkloads(milestone))
    return fetch('http://localhost:5000/workloadList/' + team + '/' + milestone)
      .then(response => response.json())
      .then(json => dispatch(resolveWorkloads(json)))
      .catch(e => console.log(e))
  }
}
