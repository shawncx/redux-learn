/**
 * Created by works on 8/16/2016.
 */
export const INCREMENT_COUNTER = 'COUNTER_INCREMENT';

export function increment (value = 1) {
  return {
    type: INCREMENT_COUNTER,
    payload: value,
  }
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}