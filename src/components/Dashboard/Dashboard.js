/**
 * Created by chenxiao on 8/21/16.
 */
import React, {PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import {MenuItem} from 'material-ui/Menu'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Title from '../Title'
import TextField from 'material-ui/TextField'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import outerStyle from './Dashboard.scss'

const innerStyle = {
  toolbar: {
    marginTop: '10px',
  },
}

class Dashboard extends React.Component {

  state = {
    openDialog: false,
    selectedTicket: {},
  }

  static propTypes = {
    fetchMilestones: PropTypes.func,
    fetchWorkloads: PropTypes.func,
    isLoadingMilestones: PropTypes.bool,
    isLoadingWorkloads: PropTypes.bool,
    team: PropTypes.string,
    message: PropTypes.string,
    milestones: PropTypes.array,
    selectedMilestone: PropTypes.string,
    tickets: PropTypes.array,
    developmentWorkload: PropTypes.object,
    evaluationWorkload: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.isLoadingMilestones) {
      this.props.fetchMilestones()
    }
  }

  onSelectMilestone = (event, index, value) => {
    this.props.fetchWorkloads(this.props.team, value)
  }

  onSelectTicket = (index) => {
    return event => {
      this.setState(Object.assign({}, this.state, 
        {
          openDialog: true, 
          selectedTicket: this.props.tickets[index]
        }
      ))
    }
  }
  
  closeDialog = () => {
    this.setState(Object.assign({}, this.state,
      {
        openDialog: false,
      }
    ))
  }
  

  createWorkloadTable = workload => {
    if (workload) {
      return (
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Available</TableHeaderColumn>
              <TableHeaderColumn>Support</TableHeaderColumn>
              <TableHeaderColumn>Cost</TableHeaderColumn>
              <TableHeaderColumn>Remain</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}>
            {workload.personalWorkloads.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.available}</TableRowColumn>
                <TableRowColumn>{row.support}</TableRowColumn>
                <TableRowColumn>{row.cost}</TableRowColumn>
                <TableRowColumn>{row.remain}</TableRowColumn>
              </TableRow>
            ))}
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
              <TableRowColumn>{workload.totalAvailable}</TableRowColumn>
              <TableRowColumn>{workload.totalSupport}</TableRowColumn>
              <TableRowColumn>{workload.totalCost}</TableRowColumn>
              <TableRowColumn>{workload.totalRemain}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      )
    } else {
      return (
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>Available</TableHeaderColumn>
              <TableHeaderColumn>Support</TableHeaderColumn>
              <TableHeaderColumn>Cost</TableHeaderColumn>
              <TableHeaderColumn>Remain</TableHeaderColumn>
            </TableRow>
          </TableHeader>
        </Table>
      )
    }
  }

  render() {
    const {
      isLoadingMilestones,
      isLoadingWorkloads,
      milestones,
      tickets,
      selectedMilestone,
      developmentWorkload,
      evaluationWorkload,
    } = this.props

    if (isLoadingMilestones) {
      return (
        <div
          className={outerStyle.container}>
          <h1>Loading...</h1>
        </div>
      )
    } else {

      let ticketTable =
        <div>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>No</TableHeaderColumn>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Developer</TableHeaderColumn>
                <TableHeaderColumn>Development Man-Day</TableHeaderColumn>
                <TableHeaderColumn>Development Progress</TableHeaderColumn>
                <TableHeaderColumn>evaluator</TableHeaderColumn>
                <TableHeaderColumn>Evaluation Man-Day</TableHeaderColumn>
                <TableHeaderColumn>Evaluation Progress</TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

      if (tickets) {
        ticketTable =
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>No</TableHeaderColumn>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Developer</TableHeaderColumn>
                <TableHeaderColumn>Development Man-Day</TableHeaderColumn>
                <TableHeaderColumn>Development Progress</TableHeaderColumn>
                <TableHeaderColumn>Evaluator</TableHeaderColumn>
                <TableHeaderColumn>Evaluation Man-Day</TableHeaderColumn>
                <TableHeaderColumn>Evaluation Progress</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}>
              {tickets.map((row, index) => (
                <TableRow key={index} onDoubleClick={this.onSelectTicket(index)}>
                  <TableRowColumn>{row.no}</TableRowColumn>
                  <TableRowColumn>{row.title}</TableRowColumn>
                  <TableRowColumn>{row.developer}</TableRowColumn>
                  <TableRowColumn>{row.developmentManDay}</TableRowColumn>
                  <TableRowColumn>{row.developmentProgress}</TableRowColumn>
                  <TableRowColumn>{row.evaluator}</TableRowColumn>
                  <TableRowColumn>{row.evaluationManDay}</TableRowColumn>
                  <TableRowColumn>{row.evaluationProgress}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      }

      const developmentWorkloadTable = this.createWorkloadTable(developmentWorkload)
      const evaluationWorkloadTable = this.createWorkloadTable(evaluationWorkload)

      let workloads =
        <div className={outerStyle.container}>
          <h1>Loading...</h1>
        </div>

      if (!isLoadingWorkloads) {
        workloads =
          <div>
            <div>
              {ticketTable}
            </div>
            <div>
              <Toolbar style={innerStyle.toolbar}>
                <ToolbarGroup>
                  <ToolbarTitle text="Development Summary"/>
                </ToolbarGroup>
              </Toolbar>
              {developmentWorkloadTable}
            </div>
            <div>
              <Toolbar style={innerStyle.toolbar}>
                <ToolbarGroup>
                  <ToolbarTitle text="Evaluation Summary"/>
                </ToolbarGroup>
              </Toolbar>
              {evaluationWorkloadTable}
            </div>
          </div>
      }

      const dialogActions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.closeDialog}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          disabled={true}
          onTouchTap={this.closeDialog}
        />,
      ]

      return (
        <div
          className={outerStyle.container}>
          <Toolbar style={innerStyle.toolbar}>
            <ToolbarGroup>
              <ToolbarTitle text="Ticket List"/>
            </ToolbarGroup>
            <ToolbarGroup>
              <DropDownMenu
                value={selectedMilestone}
                onChange={this.onSelectMilestone}>
                {milestones.map((item, index) =>
                  <MenuItem
                    key={index}
                    value={item.title}
                    primaryText={item.title}/>)
                }
              </DropDownMenu>
              <ToolbarSeparator />
              <IconMenu
                iconButtonElement={
                 <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                 </IconButton>
                }
              >
                <MenuItem primaryText="Edit"/>
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
          {workloads}

          <Dialog
            title="Ticket Workload"
            actions={dialogActions}
            modal={true}
            open={this.state.openDialog}
            autoScrollBodyContent={true}>
            <div className={outerStyle.container}>
              <Title
                title="Number"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                disabled={true}
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.no}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Title"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                disabled={true}
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.title}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Developer"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                disabled={true}
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.developer}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Development Man-Day"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.developmentManDay}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Development Progress"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.developmentProgress}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Evaluator"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                disabled={true}
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.evaluator}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Evaluation Man-Day"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.evaluationManDay}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Evaluation Progress"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                fullWidth={true}
                id="text-field-disabled"
                value={this.state.selectedTicket.evaluationProgress}/>
            </div>

          </Dialog>
        </div>
      )
    }
  }

}

export default Dashboard