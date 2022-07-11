import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { logoutUser } from '../../actions/authActions'
// Styled-components import and theme colors
import { Nav, Img, Button } from './navbar.styled'
import theme from '../../utils/theme'

/**
 * Component used to represent top bar
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} auth is object containing string of user's auth token
 * @param {Object} auth is object containing string of user's auth token
 * @returns {JSX.Element} JSX element representing top bar of the app
 */
const Navbar = ({ auth, logoutUserDispatch }) => {
  const token = auth && auth.token
  const navigate = useNavigate()

  // Perfoming logout user
  const handleLogout = () => {
    logoutUserDispatch(navigate)
  }

  return (
    <ThemeProvider theme={theme}>
      <Nav data-testid='n'>
        <Img
          data-testid='i'
          src='https://upload.wikimedia.org/wikipedia/commons/0/02/Sopra_Steria_logo.svg'
          alt='Sopra Steria img'
        />

        {token && (
          <Button data-testid='b' type='button' onClick={() => handleLogout()}>
            Logout
          </Button>
        )}
      </Nav>
    </ThemeProvider>
  )
}

/**
 * Function used to map authentification state to properties of component
 * @param {object} auth destructed state of auth passed as property to component
 * @returns parameter auth as property
 */
const mapStateToProps = ({ auth }) => ({ auth })
/**
 * Function used to map logout action dispatcher to properties of component
 * @param {Function} dispatch used to dispatch logout user action
 * @returns {Object} returns dispatcher object with key logoutUserDispatch which value is anonymous function
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Object used to logout user and delete his auth token
   * @param {Function} navigate is the function to navigate to login screen
   * @returns {Function} returns dispatch function executing logout action
   */
  logoutUserDispatch: (navigate) => dispatch(logoutUser(navigate))
})

// Setting props type
Navbar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string
  }),
  logoutUserDispatch: PropTypes.func
}

// Setting default prop
Navbar.defaultProps = {
  auth: {
    token: null
  },
  logoutUserDispatch: null
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
