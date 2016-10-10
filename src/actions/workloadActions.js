/**
 * Created by chenxiao on 9/2/16.
 */
import 'whatwg-fetch'

export const REQUEST_WORKLOADS = 'REQUEST_WORKLOAD'
export const RESOLVE_WORKLOADS = 'RESOLVE_WORKLOAD'

export const REQUEST_UPDATE_TICKET = 'REQUEST_UPDATE_TICKET'
export const RESOLVE_UPDATE_TICKET = 'RESOLVE_UPDATE_TICKET'

export const REQUEST_UPLOAD_TICKET_LIST = 'REQUEST_UPLOAD_TICKET_LIST'
export const RESOLVE_UPLOAD_TICKET_LIST = 'RESOLVE_UPLOAD_TICKET_LIST'

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


function requestUpdateTicket(ticket) {
  return {
    type: REQUEST_UPDATE_TICKET,
    ticket: ticket,
  }
}

function resolveUpdateTicket(json) {
  return {
    type: RESOLVE_UPDATE_TICKET,
    result: json,
  }
}

export function updateTicket(team, milestone, ticket) {
  return dispatch => {
    dispatch(requestUpdateTicket(ticket))
    let ticketWrapper = {
      ticket,
      team,
      milestone
    }
    console.log(ticketWrapper)
    return fetch('http://localhost:5000/ticket/update', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketWrapper)
    }).then(response => response.json())
      .then(json => dispatch(resolveUpdateTicket(json)))
      .then(() => dispatch(fetchWorkloads(team, milestone)))
      .catch(e => console.log(e))
  }
}

function requestUploadTicketList() {
  return {
    type: REQUEST_UPLOAD_TICKET_LIST,
  }
}

function resolveUploadTicketList(json) {
  return {
    type: RESOLVE_UPLOAD_TICKET_LIST,
    result: json,
  }
}

export function uploadTicketList(team, milestone, mode, ticketList) {
  let data = new FormData()
  data.append('team', team)
  data.append('milestone', milestone)
  data.append('mode', mode)
  data.append('ticketList', ticketList)


  return dispatch => {
    dispatch(requestUploadTicketList())
    return fetch('http://localhost:5000/ticketList/update', {
      method: 'POST',
      body: data,
    }).then(response => response.json())
      .then(json => dispatch(resolveUploadTicketList(json)))
      .then(() => dispatch(fetchWorkloads(team, milestone)))
      .catch(e => console.log(e))
  }
}