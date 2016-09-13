/**
 * Created by chenxiao on 8/21/16.
 */
import { connect } from 'react-redux'
import { login } from '../actions/loginActions'
import Login from '../components/Login'

const mapActionCreators = {
  login,
}

const mapStateToProps = state => {
  return {
    isLogin: state.login.isLogin,
    isLoading: state.login.isLoading,
    username: state.login.username,
    message: state.login.message,
  }
}



export default connect(mapStateToProps, mapActionCreators)(Login)