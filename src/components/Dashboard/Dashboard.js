/**
 * Created by chenxiao on 8/21/16.
 */
import React, {PropTypes} from 'react'
import outerStyle from './Dashboard.scss'

class Dashboard extends React.Component {

  render() {
    return (
      <div
        className={outerStyle.container}>
        <h1>Dashboard</h1>
      </div>
    )
  }

}

export default Dashboard