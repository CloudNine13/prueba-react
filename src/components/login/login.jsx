// Libraries imports
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
// Project imports
import { loginUser } from '../../actions/authActions'
import { USER_TOKEN } from '../../utils/constants'
import Error from '../error/error'
import Loading from '../loading/loading'
import { setError } from '../../actions/errorActions'
// Styled-components import and theme colors
import {
  A,
  Button,
  Header1,
  Input,
  LoginContainer,
  LoginForm,
  Label,
  ButtonWrapper,
  BackgroundButton
} from './login.styled'
import theme from '../../utils/theme'

/**
 * Component used to represent the login screen
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Function} loginUserDispatch the function used to dispatch login action
 * @param {Function} errorDispatch the function used to dispatch an error in case if login wasn't successful
 * @returns {JSX.Element} JSX element representing login page
 */
const Login = ({ loginUserDispatch, errorDispatch }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  // Setting background
  const warmBack = '/backgrounds/warm.jpg'
  const coolBack = '/backgrounds/cool.jpg'
  const [background, setBackground] = useState(warmBack)

  // Perfoming login user
  const submitLogin = () => {
    if (!user.password) {
      errorDispatch('Password cannot be empty')
      return
    }
    loginUserDispatch(user, navigate)
  }

  // Redirecting if logged
  useEffect(() => {
    if (localStorage.getItem(USER_TOKEN)) navigate('/')
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <LoginContainer background={background} data-testid='lc'>
        <Loading />
        <LoginForm
          data-testid='lf'
          onSubmit={(event) => {
            event.preventDefault()
            submitLogin()
          }}
        >
          <Header1 data-testid='h1'>Login to your account</Header1>
          <Input
            data-testid='i1'
            type='email'
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
            placeholder='Email'
          />
          <Input
            data-testid='i2'
            type='password'
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
            placeholder='Password'
          />
          <Button type='submit' data-testid='sub'>
            Login
          </Button>
          <Error />
        </LoginForm>
        <ButtonWrapper data-testid='bw'>
          <Label data-testid='la'>Background:</Label>
          <BackgroundButton
            data-testid='bb1'
            type='button'
            onClick={() => {
              setBackground(warmBack)
            }}
          >
            warm
          </BackgroundButton>
          <BackgroundButton
            data-testid='bb2'
            type='button'
            onClick={() => {
              setBackground(coolBack)
            }}
          >
            cool
          </BackgroundButton>
        </ButtonWrapper>
        <A href='./fsdfs' data-testid='a'>
          Test 404 page
        </A>
      </LoginContainer>
    </ThemeProvider>
  )
}

/**
 * Function used to map login and set error actions dispatchers to properties of component
 * @param {Function} dispatch used to dispatch release error action
 * @returns {Object} returns dispatchers object with keys getUsersDispatch and releaseDeleteDispatch which value is anonymous function
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Object with key getUsersDispatch with anonymous function as value
   * @param {Object} user is the object containing email and password to login user
   * @param {Function} navigate is the function used to navigate to root component (home) in case of successful login
   * @returns {Function} returns dispatch function executing login action
   */
  loginUserDispatch: (user, navigate) => dispatch(loginUser(user, navigate)),
  /**
   * Object with key getUsersDispatch with anonymous function as value
   * @param {string} message is the string containing the message of error occurred
   * @returns {Function} returns dispatch function executing set error action
   */
  errorDispatch: (message) => dispatch(setError(message))
})

// Defining property types for dispatchers
Login.propTypes = {
  loginUserDispatch: PropTypes.func,
  errorDispatch: PropTypes.func
}

// Defining default properties for dispatchers
Login.defaultProps = {
  loginUserDispatch: null,
  errorDispatch: null
}

export default connect(null, mapDispatchToProps)(Login)
