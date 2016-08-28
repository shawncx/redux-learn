/**
 * Created by chenxiao on 8/21/16.
 */
import { connect } from 'react-redux'
import { login } from '../actions/loginActions'
import Login from '../components/Login'

const mapActionCreators = {
  login,
}

const mapStateToProps = (state) => ({
  isLogin: state.isLogin,
  isLoading: state.isLoading,
  username: state.username
})



export default connect(mapStateToProps, mapActionCreators)(Login)