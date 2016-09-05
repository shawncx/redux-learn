/**
 * Created by chenxiao on 9/2/16.
 */
import {connect} from 'react-redux'
import {fetchMilestones} from '../actions/milestoneActions'
import {fetchTickets} from '../actions/ticketActions'
import Dashboard from '../components/Dashboard'

const mapActionCreators = {
  fetchMilestones,
  fetchTickets,
}

const mapStateToProps = state => {
  return {
    leader: state.login.username,
    isLoadingMilestones: state.dashboard.isLoadingMilestones,
    isLoadingTickets: state.dashboard.isLoadingTickets,
    message: state.dashboard.message,
    milestones: state.dashboard.milestones,
    selectedMilestone: state.dashboard.selectedMilestone,
    tickets: state.dashboard.tickets,
  }
}

export default connect(mapStateToProps, mapActionCreators)(Dashboard)