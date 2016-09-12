import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'


const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory,
  store,
)

const MOUNT_NODE = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
    />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
// if (__DEV__) {
//   if (module.hot) {
//     // Development render functions
//     const renderApp = render
//     const renderError = (error) => {
//       const RedBox = require('redbox-react').default
//
//       ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
//     }
//
//     // Wrap render in try/catch
//     render = () => {
//       try {
//         renderApp()
//       } catch (error) {
//         renderError(error)
//       }
//     }
//
//     // Setup hot module replacement
//     module.hot.accept('./routes/index', () => {
//       setTimeout(() => {
//         ReactDOM.unmountComponentAtNode(MOUNT_NODE)
//         render()
//       })
//     })
//   }
// }

// ========================================================
// Go!
// ========================================================
render()
