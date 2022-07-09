import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './navbar.scss'
import { logoutUser } from '../../actions/authActions'

const Navbar = ({ auth, logoutUserDispatch }) => {
  const token = auth && auth.token
  const navigate = useNavigate()

  // Perfoming logout user
  function handleLogout() {
    logoutUserDispatch(navigate)
  }

  return (
    <div className='navbar'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/0/02/Sopra_Steria_logo.svg'
        alt='Sopra Steria img'
      />

      {token && (
        <button type='button' onClick={() => handleLogout()}>
          Logout
        </button>
      )}
    </div>
  )
}

// Mapping states from authReducer to navbar
const mapStateToProps = ({ auth }) => ({ auth })
const mapDispatchToProps = (dispatch) => ({
  logoutUserDispatch: (navigate) => {
    dispatch(logoutUser(navigate))
  }
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
