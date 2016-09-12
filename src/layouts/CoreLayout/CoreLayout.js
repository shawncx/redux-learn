import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import NaviDrawer from '../../components/NaviDrawer'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import spacing from 'material-ui/styles/spacing'
import {browserHistory} from 'react-router'
import '../../styles/core.scss'
import outerStyle from './CoreLayout.scss'


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
  }, {
    text: 'Dashboard',
    value: '/dashboard',
  }
];

const innerStyle = {
  headerDivider: {
    paddingTop: spacing.desktopKeylineIncrement,
  },
  paperContainer: {
    padding: '5px 25px 25px 25px',
  }
};

class CoreLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    let theme = getMuiTheme(baseTheme);
    return {muiTheme: theme};
  }

  pageNavi = (event, item) => {
    this.props.closeMenu();
    browserHistory.push(item.props.value);
  }

  render() {
    let {children, openMenu, closeMenu, isMenuOpen} = this.props;
    const title = "TRY";
    
    return (
      <div className={outerStyle.layoutContainer}>
        <Header
          title={title}
          onClickMenuButton={openMenu}
          showMenuButton={true}/>
        <NaviDrawer
          title={title}
          openDrawer={isMenuOpen}
          naviItem={createNaviItems}
          onSelectItem={this.pageNavi}
          changeDrawerRequest={closeMenu}/>
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
