import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'
import Login from './login'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Test: Login component', () => {
  // Preparing variables, objects, JSX elements and functions
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureStore([sagaMiddleware])
  const store = mockStore({
    auth: { loadingAuth: true },
    getDelete: { loadingUsers: true },
    edit: { loadingEdit: true }
  })
  // Spawning error in parent
  const toRender = (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  )

  // Testing
  test('Elements are rendered correctly', async () => {
    render(toRender)
    expect(screen.getByTestId('lc')).toBeValid()
    expect(screen.getByTestId('lf')).toBeVisible()
    expect(screen.getByTestId('h1')).toBeInTheDocument()
    expect(screen.getByTestId('i1')).toBeValid()
    expect(screen.getByTestId('i2')).toBeVisible()
    expect(screen.getByTestId('sub')).toBeInTheDocument()
    expect(screen.getByTestId('bw')).toBeValid()
    expect(screen.getByTestId('bb1')).toBeVisible()
    expect(screen.getByTestId('bb2')).toBeInTheDocument()
    expect(screen.getByTestId('a')).toBeValid()
    expect(screen.getByTestId('la')).toBeVisible()
  })

  test('Submit calls loginUserDispatch()', async () => {
    render(toRender)
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@test.com' }
    })
    userEvent.click(screen.getByText('Login'))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'LOGIN_REQUEST',
      user: { email: 'test@test.com', password: 'Test' },
      navigate: mockNavigate
    })
  })

  test('Should go to 404 route', () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    )
    userEvent.click(screen.getByText('Test 404 page'))
    expect(history.location.pathname).toEqual('/')
  })
})
