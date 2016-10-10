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
import SampleTable from '../SampleTable'
import outerStyle from './Dashboard.scss'

const innerStyle = {
  toolbar: {
    marginTop: '10px',
  },
  modeMenu: {
    paddingLeft: '0px',
  },
  loadingImg: {
    width: '480px',
    height: '269px',
    marginTop: '20px'
  }
}

class Dashboard extends React.Component {

  state = {
    openUpdateTicketDialog: false,
    openUploadTicketListDialog: false,
    uploadTicketListMode: 'merge',
    uploadMilestoneListModel: 'merge',
    selectedTicket: {},
  }

  static propTypes = {
    fetchMilestones: PropTypes.func,
    fetchWorkloads: PropTypes.func,
    updateTicket: PropTypes.func,
    uploadTicketList: PropTypes.func,
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

  onSelectUploadTicketListMode = (event, index, value) => {
    this.setState(Object.assign({}, this.state,
      {
        uploadTicketListMode: value,
      }
    ))
  }

  onSelectTicket = index => {
    return event => {
      this.setState(Object.assign({}, this.state,
        {
          openUpdateTicketDialog: true,
          selectedTicket: this.props.tickets[index]
        }
      ))
    }
  }

  onCloseUpdateTicketDialog = () => {
    this.setState(Object.assign({}, this.state,
      {
        openUpdateTicketDialog: false,
      }
    ))
  }

  onSubmitUpdateTicketDialog = () => {
    this.onCloseUpdateTicketDialog()
    this.props.updateTicket(
      this.props.team,
      this.props.selectedMilestone,
      {
        'no': parseInt(this.refs['ticketNumberInput'].input.value),
        'title': parseFloat(this.refs['ticketTitleInput'].input.title),
        'developer': this.refs['ticketDeveloperInput'].input.value,
        'evaluator': this.refs['ticketEvaluatorInput'].input.value,
        'developmentManDay': parseFloat(this.refs['ticketDevelopmentManDayInput'].input.value),
        'developmentProgress': parseFloat(this.refs['ticketDevelopmentProgressInput'].input.value),
        'evaluationManDay': parseFloat(this.refs['ticketEvaluationManDayInput'].input.value),
        'evaluationProgress': parseFloat(this.refs['ticketEvaluationProgressInput'].input.value)
      }
    )
  }

  onCloseUploadTicketListDialog = () => {
    this.setState(Object.assign({}, this.state,
      {
        openUploadTicketListDialog: false,
      }
    ))
  }

  onSubmitUploadTicketListDialog = () => {
    let fileUpload = document.getElementById('uploadTicketListInput')
    if (fileUpload.files && fileUpload.files[0]) {
      let file = fileUpload.files[0]
      let textType = /text.*/;
      if (file.type.match(textType)) {
        this.props.uploadTicketList(this.props.team, this.props.selectedMilestone,
          this.state.uploadTicketListMode, file)
      }
    } else {
      console.log('file error!')
    }
    this.onCloseUploadTicketListDialog()
  }

  createWorkloadTable = workload => {
    let headers = ['', 'Available', 'Support', 'Cost', 'Remain']
    let rows = []
    if (workload) {
      workload.personalWorkloads.forEach(ele => {
        rows.push([
          ele.name,
          ele.available,
          ele.support,
          ele.cost,
          ele.remain,
        ])
      })
      rows.push([
        '',
        workload.totalAvailable,
        workload.totalSupport,
        workload.totalCost,
        workload.totalRemain,
      ])
    }
    return (
      <SampleTable
        tableHeaders={headers}
        tableRows={rows}/>
    )
  }

  createDialogActions = (onCancel, onSubmit) => [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={onCancel}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onTouchTap={onSubmit}
    />,
  ]

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
      let headers = [
        'No',
        'Title',
        'Developer',
        'Development Man-Day',
        'Development Progress',
        'Evaluator',
        'Evaluation Man-Day',
        'Evaluation Progress'
      ]
      let rows = []
      if (tickets) {
        tickets.forEach(t => {
          rows.push([
            t.no,
            t.title,
            t.developer,
            t.developmentManDay,
            t.developmentProgress,
            t.evaluator,
            t.evaluationManDay,
            t.evaluationProgress,
          ])
        })
      }
      let ticketTable = (
        <SampleTable
          tableHeaders={headers}
          tableRows={rows}
          onDoubleClickRow={this.onSelectTicket}/>
      )

      const developmentWorkloadTable = this.createWorkloadTable(developmentWorkload)
      const evaluationWorkloadTable = this.createWorkloadTable(evaluationWorkload)

      let workloads =
        <div className={outerStyle.container}>
          <img src="loading.gif" style={innerStyle.loadingImg} />
        </div>

      if (!isLoadingWorkloads) {
        workloads =
          <div>
            <div>
              {ticketTable}
            </div>
            <div >
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
          </div>
      }

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
                <MenuItem
                  primaryText="Upload Tickets"
                  onTouchTap={() => {
                    this.setState(Object.assign({}, this.state, {openUploadTicketListDialog: true}))
                  }}/>
                <MenuItem primaryText="Upload Milestones"/>
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>

          {workloads}

          <Dialog title="Upload Tickets"
                  actions={this.createDialogActions(this.onCloseUploadTicketListDialog, this.onSubmitUploadTicketListDialog)}
                  modal={true}
                  open={this.state.openUploadTicketListDialog}
                  autoScrollBodyContent={true}>
            <div className={outerStyle.container}>
              <Title
                title="Mode"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <DropDownMenu
                value={this.state.uploadTicketListMode}
                ref="uploadTicketListModeInput"
                labelStyle={innerStyle.modeMenu}
                onChange={this.onSelectUploadTicketListMode}>
                <MenuItem
                  value="merge"
                  primaryText="Merge"/>
                <MenuItem
                  value="override"
                  primaryText="Override"/>
              </DropDownMenu>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Ticket File"
                color="black"
                fontSize="20px"/>
              <input type="file" id="uploadTicketListInput"/>
            </div>
          </Dialog>

          <Dialog
            title="Ticket Workload"
            actions={this.createDialogActions(this.onCloseUpdateTicketDialog, this.onSubmitUpdateTicketDialog)}
            modal={true}
            open={this.state.openUpdateTicketDialog}
            autoScrollBodyContent={true}>
            <div className={outerStyle.container}>
              <Title
                title="Number"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketNumberInput"
                disabled={true}
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.no}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Title"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketTitleInput"
                disabled={true}
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.title}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Developer"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketDeveloperInput"
                disabled={true}
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.developer}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Development Man-Day"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketDevelopmentManDayInput"
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.developmentManDay}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Development Progress"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketDevelopmentProgressInput"
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.developmentProgress}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Evaluator"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketEvaluatorInput"
                disabled={true}
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.evaluator}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Evaluation Man-Day"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketEvaluationManDayInput"
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.evaluationManDay}/>
            </div>
            <div className={outerStyle.container}>
              <Title
                title="Evaluation Progress"
                color="black"
                fontSize="20px"
                marginBottom="0px"/>
              <TextField
                ref="ticketEvaluationProgressInput"
                fullWidth={true}
                id="text-field-default"
                defaultValue={this.state.selectedTicket.evaluationProgress}/>
            </div>

          </Dialog>
        </div>
      )
    }
  }

}

export default Dashboard