import React, {PropTypes} from 'react';
import Header from '../../components/Header';
import classes from './CoreLayout.scss';
import '../../styles/core.scss';
import NaviDrawer from '../../components/NaviDrawer';

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
  
  state = {
    openNaviDrawer: false
  };

  constructor(props) {
    super(props);
    this.openNaviDrawer = this.openNaviDrawer.bind(this);
    this.state = {
      openNaviDrawer: false
    };
  }
  
  openNaviDrawer() {
    
    this.setState(
      Object.assign({}, 
        this.state,
        {openNaviDrawer: !this.state.openNaviDrawer})
    );
  }

  pageNavi(event, value) {
    // this.context.router.push(value);
    // this.setState(Object.assign({}, this.state, {openNaviDrawer: false}));
  }

  render() {
    let {children} = this.props;

    return (
      <div className={classes.layoutContainer}>
        <Header onClickMenuButton={this.openNaviDrawer}/>
        <NaviDrawer
          openDrawer={this.state.openNaviDrawer}
          naviItem={createNaviItems}
          onSelectItem={this.pageNavi}/>
        <div className={classes.mainContainer}>
          {children}
        </div>
      </div>
    );
  }
}

export default CoreLayout
