import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'
import Login from '../login/login'

describe('Test: Loading component', () => {
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
  test('Loading is shown', async () => {
    render(toRender)
    expect(screen.getByTestId('l')).toBeInTheDocument()
    expect(screen.getByTestId('dl')).toBeVisible()
  })
})
