/**
 * Created by works on 8/12/2016.
 */
import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Title from '../Title';
import outerStyle from './Login.scss'

class Login extends React.Component {

  static propTypes = {
    login: PropTypes.func,
  }

  onLogin = () => {
    this.props.login(this.refs['usernameInput'].input.value,
      this.refs['passwordInput'].input.value)
  }

  render() {

    return (
      <div 
        className={outerStyle.container}>
        <Title title="Login"/>
        <div 
          className={outerStyle.inputContainer}>
          <TextField
            ref="usernameInput"
            hintText="Username"
            fullWidth={true}/>
          <br />
        </div>
        <div
          className={outerStyle.inputContainer}>
          <TextField
            ref="passwordInput"
            hintText="Password"
            type="password"
            fullWidth={true}/>
        </div>
        <div 
          className={outerStyle.buttonContainer}>
          <RaisedButton 
            primary={true} 
            label="LOGIN"
            onClick={this.onLogin}/>
        </div>
      </div>
    )

  }

}

export default Login