import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../actions/authAction'
import { USER_TOKEN } from '../../utils/constants'

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
    if (localStorage.getItem(USER_TOKEN)) navigate('/home')
  }, [])

  return (
    <div className='login'>
      <form className='login__form' onSubmit={submitLogin}>
        <h1>Login</h1>
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
        <button type='submit'>sub</button>
      </form>
    </div>
  )
}

export default Login
