import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../actions/authActions'
import { USER_TOKEN } from '../../utils/constants'
import Error from '../error/error'
import './login.scss'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // Perfoming login user
  const submitLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(user, navigate))
  }

  // Redirecting if logged
  useEffect(() => {
    if (localStorage.getItem(USER_TOKEN)) navigate('/')
  }, [])

  return (
    <div className='login'>
      <form className='login_form' onSubmit={submitLogin}>
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

export default Login
