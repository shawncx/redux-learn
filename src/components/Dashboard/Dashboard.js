/**
 * Created by chenxiao on 8/21/16.
 */
import React, {PropTypes} from 'react'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import {MenuItem} from 'material-ui/Menu'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import outerStyle from './Dashboard.scss'

const innerStyle = {
  toolbar: {
    marginTop: '10px'
  },
  toolbarGroup: {
    maxWidth: '20%'
  },
}

class Dashboard extends React.Component {

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
    if(this.props.isLoadingMilestones) {
      this.props.fetchMilestones()
    }
  }

  onSelectMilestone = (event, index, value) => {
    this.props.fetchWorkloads(this.props.team, value)
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

    if(isLoadingMilestones) {
      return (
        <div
          className={outerStyle.container}>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      let ticketsContent =
        <div className={outerStyle.container}>
          <h1>Loading...</h1>
        </div>
      if(!isLoadingWorkloads) {
        ticketsContent =
          <div>
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
                <TableBody
                  displayRowCheckbox={false}>
                  {tickets.map((row, index) => (
                    <TableRow key={index}>
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
            </div>
            <div>
              <Table>

              </Table>
            </div>
            <div>
              <Table>

              </Table>
            </div>
          </div>
      }

      return (
        <div
          className={outerStyle.container}>
          <Toolbar style={innerStyle.toolbar}>
            <ToolbarGroup
              firstChild={true}
              style={innerStyle.toolbarGroup}>
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
            </ToolbarGroup>
            <ToolbarGroup>
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
              >
                <MenuItem primaryText="Download" />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
          {ticketsContent}
        </div>
      )
    }
  }

}

export default Dashboard