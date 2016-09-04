/**
 * Created by chenxiao on 9/2/16.
 */
import {connect} from 'react-redux'
import {fetchTickets} from '../actions/ticketActions'
import Dashboard from '../components/Dashboard'

const mapActionCreators = {
  fetchTickets,
}

const mapStateToProps = state => {
  return {
    leader: state.login.username,
    isLoading: state.dashboard.isLoading,
    message: state.dashboard.message,
    tickets: state.dashboard.tickets,
  }
}

export default connect(mapStateToProps, mapActionCreators)(Dashboard)