/**
 * Created by works on 8/5/2016.
 */
import React, {PropTypes} from 'react'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Header from '../Header'
import Divider from 'material-ui/Divider'
import spacing from 'material-ui/styles/spacing'

const innerStyle = {
  drawer: {
    position: 'fixed',
    zIndex: '9999',
  },
  headerDivider: {
    paddingTop: spacing.desktopKeylineIncrement,
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

    const {
      title,
      openDrawer,
      naviItem,
      onSelectItem,
      changeDrawerRequest
    } = this.props;

    return (
      <Drawer
        docked={false}
        open={openDrawer}
        onRequestChange={changeDrawerRequest}
        style={innerStyle.drawer}>
        <Header
          title={title}
          showMenuButton={false}
          style={innerStyle.drawer}/>
        <Divider style={innerStyle.headerDivider} />
        <Menu onItemTouchTap={onSelectItem}>
          {naviItem.map((item, index) =>
            <MenuItem
              key={index}
              primaryText={item.text}
              value={item.value} />
          )}
        </Menu>
      </Drawer>
    )
  }
}

export default NaviDrawer