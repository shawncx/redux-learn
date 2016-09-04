/**
 * Created by works on 8/16/2016.
 */
import { injectReducer } from '../reducers'

export default (store) => ({
    path: 'counter',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Counter = require('../containers/CounterContainer').default
        const reducer = require('../reducers/counterReducer').default
        injectReducer(store, { key: 'counter', reducer })
        cb(null, Counter)
      }, 'counter')
    }
})

