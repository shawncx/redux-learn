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
    isLoadingMilestones: state.milestone.isLoadingMilestones,
    isLoadingTickets: state.ticket.isLoadingTickets,
    milestoneMessage: state.milestone.message,
    ticketMessage: state.ticket.message,
    milestones: state.milestone.milestones,
    selectedMilestone: state.milestone.selectedMilestone,
    tickets: state.ticket.tickets,
  }
}

export default connect(mapStateToProps, mapActionCreators)(Dashboard)