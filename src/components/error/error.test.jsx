import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'
import Login from '../login/login'

describe('Test: Error component', () => {
  // Preparing variables, objects, JSX elements and functions
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureStore([sagaMiddleware])
  const store = mockStore({
    auth: { loadingAuth: false },
    getDelete: { loadingUsers: false },
    edit: { loadingEdit: false }
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
  test('Set error are called', async () => {
    render(toRender)
    userEvent.click(screen.getByText('Login'))
    const actions = store.getActions()
    // action[4] is because every time detail component gets unmounted, release edit is triggered
    expect(actions[0]).toEqual({
      type: 'SET_ERROR',
      payload: 'Password cannot be empty'
    })
  })
})
