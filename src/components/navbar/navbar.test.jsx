import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'
import Navbar from './navbar'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Test: Navbar component', () => {
  // Preparing variables, objects, JSX elements and functions
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureStore([sagaMiddleware])
  const store = mockStore({ auth: { token: '123123' } })
  // Spawning error in parent
  const toRender = (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  )

  test('Elements are rendered correctly', async () => {
    render(toRender)
    expect(screen.getByTestId('n')).toBeInTheDocument()
    expect(screen.getByTestId('i')).toBeValid()
    expect(screen.getByTestId('b')).toBeVisible()
  })

  test('Button calls logout dispatcher', () => {
    render(toRender)
    userEvent.click(screen.getByTestId('b'))
    const actions = store.getActions()
    expect(actions).toEqual([
      {
        type: 'LOGOUT_REQUEST',
        navigate: mockNavigate
      }
    ])
  })
})
