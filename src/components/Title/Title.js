/**
 * Created by works on 8/12/2016.
 */
import React, {PropTypes} from 'react';

class Title extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.number,
  }

  static defaultProps = {
    title: 'Default',
    color: '#03A9F4',
    fontSize: '30px',
    fontWeight: 300,
  }

  render() {
    const {title, color, fontSize, fontWeight} = this.props;
    
    const style = {
      color,
      fontSize,
      fontWeight, 
      marginBottom: '15px',
    };
    
    return (
      <p style={style}>
        {title}
      </p>
    );
  }
}

export default Title