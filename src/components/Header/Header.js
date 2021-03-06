import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import outerStyle from './Header.scss';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const innerStyle = {
  appBar: {
    fontSize: 24,
    color: typography.textFullWhite,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    top: 0,
    height: '100%',
  },
};

class Header extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    showMenuButton: PropTypes.bool.isRequired,
    onClickMenuButton: PropTypes.func
  }
  
  static defaultTypes = {
    onClickMenuButton: () => {}
  }

  static contextType = {
    muiTheme: PropTypes.object.isRequired,
  }


  render() {
    const {title, showMenuButton, onClickMenuButton} = this.props;
    return (
      <div className={outerStyle.container}>
        <AppBar
          style={innerStyle.appBar}
          title={title}
          onLeftIconButtonTouchTap={onClickMenuButton}
          showMenuIconButton={showMenuButton}
          zDepth={0}/>
      </div>
    )
  }

}


export default Header
