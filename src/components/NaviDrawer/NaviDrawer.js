/**
 * Created by works on 8/5/2016.
 */
import React, {PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Header from '../Header';
import Divider from 'material-ui/Divider';
import spacing from 'material-ui/styles/spacing';
import outerStyle from './NaviDrawer.scss';

const innerStyle = {
  headerDivider: {
    paddingTop: spacing.desktopKeylineIncrement,
  },
  item: {
    textAlign: 'left',
    width: '100%',
  },
  itemLabel: {
    fontWeight: 'normal',
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
          showMenuButton={false}/>
        <Divider style={innerStyle.headerDivider} />
        {naviItem.map(item =>
            <div
              key={item.text}
              className={outerStyle.itemContainer}>
              <FlatButton
                label={item.text}
                value={item.value}
                onClick={onSelectItem}
                style={innerStyle.item}
                labelStyle={innerStyle.itemLabel}/>
            </div>
        )}
      </Drawer>
    )
  }
}

export default NaviDrawer