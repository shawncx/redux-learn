/**
 * Created by works on 8/16/2016.
 */
export default (store, onEnter) => ({
  path: 'hello',
  onEnter,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Hello = require('../components/Hello').default;
      cb(null, Hello);

    }, 'hello')
  }
})