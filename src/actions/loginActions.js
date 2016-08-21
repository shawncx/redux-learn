/**
 * Created by chenxiao on 8/21/16.
 */
export const LOGIN = 'LOGIN'

export function login(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  }
}

export const actions = {
  login,
}