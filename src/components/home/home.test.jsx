import React from 'react'
import { render, screen } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'
import Home from './home'

describe('Test: Home component', () => {
  // Preparing variables, objects, JSX elements and functions
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureStore([sagaMiddleware])
  const store = mockStore({
    auth: { loadingAuth: false },
    getDelete: { loadingUsers: false, pages: 2, current_page: 1 },
    edit: { loadingEdit: false, updated_at: 'test' }
  })
  const toRender = (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  )

  // Testing
  // This test goes first because of despatch in useEffect[] which fills store.getAction()
  test('Release delete dispatch called', async () => {
    render(toRender)
    const rightButton = screen.getByTestId('rb')
    // Push button first before getting left button
    userEvent.click(rightButton)
    const actions = store.getActions()
    // Every test case getUser action is triggered on component mount
    expect(actions[1]).toEqual({ type: 'RELEASE_DELETE' })
  })

  test('Elements are rendered correctly', async () => {
    render(toRender)
    expect(screen.getByTestId('h')).toBeInTheDocument()
    expect(screen.getByTestId('rb')).toBeValid()
    expect(screen.getByTestId('pc')).toBeVisible()
    expect(screen.getByTestId('p')).toBeInTheDocument()
  })

  test('Left button shows correctly', async () => {
    render(toRender)
    const rightButton = screen.getByTestId('rb')
    // Push button first before getting left button
    userEvent.click(rightButton)
    const leftButton = screen.getByTestId('lb')
    expect(leftButton).toBeVisible()
  })

  test('Right button shows correctly', async () => {
    const rbStore = mockStore({
      auth: { loadingAuth: false },
      getDelete: { loadingUsers: false, pages: 2, current_page: 2 },
      edit: { loadingEdit: false, updated_at: 'test' }
    })
    render(
      <Provider store={rbStore}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    )
    const leftButton = screen.getByTestId('lb')
    // Push button first before getting left button
    userEvent.click(leftButton)
    const rightButton = screen.getByTestId('rb')
    expect(rightButton).toBeVisible()
  })

  test('Release delete dispatch called', async () => {
    render(toRender)
    const actions = store.getActions()
    expect(actions[0]).toEqual({ type: 'USER_LIST_REQUEST', page: 1 })
  })
})
