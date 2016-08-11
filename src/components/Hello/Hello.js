/**
 * Created by works on 8/5/2016.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import outerStyle from './Hello.scss';

class Hello extends React.Component {

  handleClick(event) {
    alert(1);
  }

  render() {
return (
  <div className={outerStyle.duck}>
    <h1>Hello!</h1>
    <RaisedButton onClick={this.handleClick} label="Default"/>
  </div>
)
}

}

export default Hello