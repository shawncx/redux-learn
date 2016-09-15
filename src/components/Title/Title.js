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
    marginBottom: PropTypes.string,
  }

  static defaultProps = {
    title: 'Default',
    color: '#03A9F4',
    fontSize: '30px',
    fontWeight: 300,
    marginBottom: '15px',
  }

  render() {
    const {title, color, fontSize, fontWeight, marginBottom} = this.props;
    
    const style = {
      color,
      fontSize,
      fontWeight, 
      marginBottom,
    };
    
    return (
      <p style={style}>
        {title}
      </p>
    );
  }
}

export default Title