import React, {PropTypes} from 'react';
import Header from '../../components/Header';
import NaviDrawer from '../../components/NaviDrawer';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import '../../styles/core.scss';
import classes from './CoreLayout.scss';


const createNaviItems = [
  {
    text: 'Home',
    value: '/'
  }, {
    text: 'Counter',
    value: '/counter'
  }, {
    text: 'Hello',
    value: '/hello'
  }
];

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
    console.log(theme);
    return {muiTheme: theme};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  changeNaviDrawerRequest = (open) => {
    this.setState(
      Object.assign({},
        this.state,
        {openNaviDrawer: open})
    );
  };

  pageNavi(event, value) {
    console.log(event);
    console.log(value);
    // this.context.router.push(value);
    // this.setState(Object.assign({}, this.state, {openNaviDrawer: false}));
  }

  render() {
    let {children} = this.props;
    const title = "TRY";
    
    return (
      <div className={classes.layoutContainer}>
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
        <div className={classes.mainContainer}>
          {children}
        </div>
      </div>
    );
  }
}

export default CoreLayout
