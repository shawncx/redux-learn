import React, {PropTypes} from 'react';
import Header from '../../components/Header';
import NaviDrawer from '../../components/NaviDrawer';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';

import '../../styles/core.scss';
import outerStyle from './CoreLayout.scss';


const createNaviItems = [
  {
    text: 'Home',
    value: '/home'
  }, {
    text: 'Counter',
    value: '/counter'
  }, {
    text: 'Hello',
    value: '/hello'
  }
];

const innerStyle = {
  headerDivider: {
    paddingTop: spacing.desktopKeylineIncrement,
  },
  paperContainer: {
    position: 'relative',
    right: '50%',
    padding: '5px 25px 25px 25px',
  }
};

class CoreLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.openNaviDrawer = this.openNaviDrawer.bind(this);
    this.changeNaviDrawerRequest = this.changeNaviDrawerRequest.bind(this);
    this.pageNavi = this.pageNavi.bind(this);
    this.state = {
      openNaviDrawer: false
    };
  }
  
  openNaviDrawer() {
    this.setState(
      Object.assign({}, 
        this.state,
        {openNaviDrawer: true})
    );
  }


  getChildContext() {
    let theme = getMuiTheme(baseTheme);
    return {muiTheme: theme};
  }

  changeNaviDrawerRequest = (open) => {
    this.setState(
      Object.assign({},
        this.state,
        {openNaviDrawer: open})
    );
  };

  pageNavi(event) {
    const path = event.currentTarget.value;
    this.setState(Object.assign({}, this.state, {openNaviDrawer: false}));
    this.context.router.push(path);
  }

  render() {
    let {children} = this.props;
    const title = "TRY";
    
    return (
      <div className={outerStyle.layoutContainer}>
        <Header
          title={title}
          onClickMenuButton={this.openNaviDrawer}
          showMenuButton={true}/>
        <NaviDrawer
          title={title}
          openDrawer={this.state.openNaviDrawer}
          naviItem={createNaviItems}
          onSelectItem={this.pageNavi}
          changeDrawerRequest={this.changeNaviDrawerRequest}/>
        <Divider
          style={innerStyle.headerDivider} />
        <div
          className={outerStyle.mainContainer}>
          <Paper
            zDepth={3}
            style={innerStyle.paperContainer}>
            {children}
          </Paper>
        </div>
      </div>
    );
  }
}

export default CoreLayout
