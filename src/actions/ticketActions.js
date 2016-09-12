/**
 * Created by chenxiao on 9/2/16.
 */
import 'whatwg-fetch'

export const REQUEST_TICKETS = 'REQUEST_TICKETS'
export const RESOLVE_TICKETS = 'RESOLVE_TICKETS'

function requestTickets(milestone) {
  return {
    type: REQUEST_TICKETS,
    milestone: milestone,
  }
}

function resolveTickets(json) {
  return {
    type: RESOLVE_TICKETS,
    result: json,
  }
}

export function fetchTickets(leader, milestone) {
  return dispatch => {
    dispatch(requestTickets(milestone))
    return fetch('http://localhost:5000/ticketList/' + leader + '/' + milestone)
      .then(response => response.json())
      .then(json => dispatch(resolveTickets(json)))
      .catch(e => console.log(e))
  }
}
