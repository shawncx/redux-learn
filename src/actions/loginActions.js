/**
 * Created by chenxiao on 8/21/16.
 */
import 'whatwg-fetch'
import {browserHistory} from 'react-router'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RESOLVE_LOGIN = 'RESOLVE_LOGIN'

export const REQUIRE_LOGIN = 'REQUIRE_LOGIN'

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

function resolveLogin(json) {
  return {
    type: RESOLVE_LOGIN,
    result: json,
  }
}

export function login(username, password) {
  return dispatch => {
    dispatch(requestLogin())

    return fetch('http://localhost:5000/login/' + username + '/' + password)
      .then(response => response.json())
      .then(json => dispatch(resolveLogin(json)))
      .then((data) => {
        if(data.result.isSuccess){
          browserHistory.push({pathname: '/dashboard'})
        }
      })
      .catch(e => console.log(e))
  }
}

export function requireLogin() {
  return {
    type: REQUIRE_LOGIN
  }
}