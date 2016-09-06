/**
 * Created by chenxiao on 8/21/16.
 */
import React, {PropTypes} from 'react'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {MenuItem} from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import outerStyle from './Dashboard.scss'

const innerStyle = {
  toolbar: {
    marginTop: '10px'
  },
  toolbarGroup: {
    maxWidth: '20%'
  },
  item: {
    textAlign: 'left',
    width: '100%'
  },
  itemLabel: {
    fontWeight: 'normal',
  },
  menuItem: {
    backgroundColor: 'white',
    hoverColor: 'red'
  }
}

class Dashboard extends React.Component {

  static propTypes = {
    fetchMilestones: PropTypes.func,
    fetchTickets: PropTypes.func,
    isLoadingMilestones: PropTypes.bool,
    isLoadingTickets: PropTypes.bool,
    leader: PropTypes.string,
    message: PropTypes.string,
    milestones: PropTypes.array,
    selectedMilestone: PropTypes.string,
    tickets: PropTypes.array,
  }


  componentDidMount() {
    if(this.props.isLoadingMilestones) {
      this.props.fetchMilestones()
    }
  }

  onSelectMilestone = (event) => {
    let milestone = event.currentTarget.value
    this.props.fetchTickets(this.props.leader, milestone)
  }

  render() {
    const {
      isLoadingMilestones,
      isLoadingTickets,
      milestones,
      tickets
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
      if(!isLoadingTickets) {
        ticketsContent =
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>No</TableHeaderColumn>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Develop Man-Day</TableHeaderColumn>
                <TableHeaderColumn>Develop Progress</TableHeaderColumn>
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
                  <TableRowColumn>{row.developManDay}</TableRowColumn>
                  <TableRowColumn>{row.developProgress}</TableRowColumn>
                  <TableRowColumn>{row.evaluationManDay}</TableRowColumn>
                  <TableRowColumn>{row.evaluationProgress}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      }

      return (
        <div
          className={outerStyle.container}>
          <Toolbar style={innerStyle.toolbar}>
            <ToolbarGroup
              firstChild={true}
              style={innerStyle.toolbarGroup}>
              <DropDownMenu>
                {milestones.map((item, index) =>
                  <FlatButton
                    key={index}
                    value={item.title}
                    label={item.title}
                    style={innerStyle.item}
                    labelStyle={innerStyle.itemLabel}
                    onClick={this.onSelectMilestone}/>)
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
                <FlatButton
                  label="Upload Tickets"
                  style={innerStyle.item}
                  labelStyle={innerStyle.itemLabel}/>
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