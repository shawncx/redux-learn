/**
 * Created by chenxiao on 9/2/16.
 */
import {connect} from 'react-redux'
import {fetchMilestones} from '../actions/milestoneActions'
import {fetchTickets} from '../actions/workloadActions'
import Dashboard from '../components/Dashboard'

const mapActionCreators = {
  fetchMilestones,
  fetchTickets,
}

const mapStateToProps = state => {
  return {
    team: state.login.team,
    isLoadingMilestones: state.milestone.isLoading,
    isLoadingWorkloads: state.workload.isLoading,
    milestoneMessage: state.milestone.message,
    workloadMessage: state.workload.message,
    milestones: state.milestone.milestones,
    selectedMilestone: state.workload.selectedMilestone,
    tickets: state.workload.tickets,
    developmentWorkload: state.workload.developmentWorkload, 
    evaluationWorkload: state.workload.evaluationWorkload,
  }
}

export default connect(mapStateToProps, mapActionCreators)(Dashboard)