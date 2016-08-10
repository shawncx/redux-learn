/**
 * Created by works on 8/5/2016.
 */
import React, {PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Header from '../Header';
import outerStyle from './NaviDrawer.scss';

const innerStyle = {
  menuItem: {
    // color: '#2fba20',
    // backgroundColor: 'red'
  }
};

class NaviDrawer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    openDrawer: PropTypes.bool.isRequired,
    changeDrawerRequest: PropTypes.func.isRequired,
    naviItem: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {title, openDrawer, naviItem, onSelectItem, changeDrawerRequest} = this.props;
    return (
      <Drawer
        docked={false}
        open={openDrawer}
        onRequestChange={changeDrawerRequest}>
        <Header
          title={title}
          showMenuButton={false} />
        <Menu >
          {naviItem.map(item =>
            <MenuItem 
              innerDivStyle={innerStyle.menuItem} 
              key={item.text} 
              primaryText={item.text} 
              value={item.value}/>
          )}
        </Menu>
      </Drawer>
    )
  }
}

export default NaviDrawer