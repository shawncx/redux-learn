/**
 * Created by works on 8/16/2016.
 */
import { connect } from 'react-redux'
import { openMenu, closeMenu } from '../actions/coreLayoutActions'
import CoreLayout from '../layouts/CoreLayout'

const mapActionCreators = {
  openMenu,
  closeMenu,
}

const mapStateToProps = (state) => ({
    isMenuOpen: state.coreLayout.isMenuOpen
})

    

export default connect(mapStateToProps, mapActionCreators)(CoreLayout)