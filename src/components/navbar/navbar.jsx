import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import './navbar.scss'
import { logoutUser } from '../../actions/authActions'

const Navbar = ({ auth }) => {
  const token = auth && auth.token
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Perfoming logout user
  function handleLogout() {
    dispatch(logoutUser(navigate))
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

// Setting props type
Navbar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string
  })
}

// Setting default prop
Navbar.defaultProps = {
  auth: {
    token: null
  }
}

// Mapping states from authReducer to navbar
const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Navbar)
