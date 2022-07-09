import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/authActions'
import { USER_TOKEN } from '../../utils/constants'
import Error from '../error/error'
import './login.sass'
import Loading from '../loading/loading'
import { setError } from '../../actions/errorActions'

const Login = ({ loginUserDispatch, errorDispatch }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // Perfoming login user
  const submitLogin = () => {
    if (!user.password) errorDispatch('Password cannot be empty')
    loginUserDispatch(user, navigate)
  }

  // Redirecting if logged
  useEffect(() => {
    if (localStorage.getItem(USER_TOKEN)) navigate('/')
  }, [])

  return (
    <div className='login'>
      <Loading />
      <form
        className='login_form'
        onSubmit={(event) => {
          event.preventDefault()
          submitLogin()
        }}
      >
        <h1>Login to your account</h1>
        <input
          type='email'
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          placeholder='Email'
        />
        <input
          type='password'
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          placeholder='Password'
        />
        <button type='submit'>Login</button>
        <Error />
      </form>
      <a href='./fsdfs'>Test 404 page</a>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loginUserDispatch: (user, navigate) => dispatch(loginUser(user, navigate)),
  errorDispatch: (message) => dispatch(setError(message))
})

Login.propTypes = {
  loginUserDispatch: PropTypes.func,
  errorDispatch: PropTypes.func
}

Login.defaultProps = {
  loginUserDispatch: null,
  errorDispatch: null
}

export default connect(null, mapDispatchToProps)(Login)
