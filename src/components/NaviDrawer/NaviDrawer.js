/**
 * Created by works on 8/5/2016.
 */
import React, {PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

const SelectableList = MakeSelectable(List);

class NaviDrawer extends React.Component {
  
  static propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    naviItem: PropTypes.array.isRequired,
    onSelectItem: PropTypes.func.isRequired
  }

  render() {
    const {openDrawer, naviItem, onSelectItem} = this.props;

    return (
      <div>
        <Drawer docked={false}
                open={openDrawer}>
          
        </Drawer>
      </div>
    )
  }
}

export default NaviDrawer