import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import classes from './Header.scss';

class Header extends React.Component {

  static propTypes = {
    onClickMenuButton: PropTypes.func.isRequired
  };

  render() {

    const {onClickMenuButton} = this.props;

    return (
      <div className={classes.header}>
        <AppBar
          title="TRY"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={onClickMenuButton}
        />
      </div>
    )
  }

}


export default Header
