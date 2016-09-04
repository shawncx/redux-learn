/**
 * Created by chenxiao on 9/2/16.
 */
import 'whatwg-fetch'

export const REQUEST_TICKETS = 'REQUEST_TICKETS'
export const RESOLVE_TICKETS = 'RESOLVE_TICKETS'

function requestTickets() {
  return {
    type: REQUEST_TICKETS
  }
}

function resolveTickets(json) {
  return {
    type: RESOLVE_TICKETS,
    result: json,
  }
}

export function fetchTickets(leader) {
  return dispatch => {
    dispatch(requestTickets())
    return fetch('http://localhost:5000/ticketList/' + leader)
      .then(response => response.json())
      .then(json => dispatch(resolveTickets(json)))
      .catch(e => console.log(e))
  }
}
