import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'
import Detail from '../detail/detail'

describe('Test: DetailForm component', () => {
  // Preparing variables, objects, JSX elements and functions
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureStore([sagaMiddleware])
  const store = mockStore({
    auth: { loadingAuth: false },
    getDelete: { loadingUsers: false },
    edit: { loadingEdit: false }
  })
  // Spawning edit view in parent
  const toRender = (
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  )

  // Testing
  test("Elements are visible and hidden on parent's button click", async () => {
    render(toRender)

    // Edit form is hidden
    expect(screen.queryByText('df')).not.toBeInTheDocument()
    userEvent.click(screen.getByText('edit'))
    // Edit form is shown
    expect(screen.getByTestId('df')).toBeVisible()
    userEvent.click(screen.getByText('edit'))
    // Edit form is hidden again
    expect(screen.queryByText('df')).not.toBeInTheDocument()
  })

  test('Elements are rendered correctly', async () => {
    render(toRender)

    userEvent.click(screen.getByText('edit'))

    expect(screen.getByTestId('df')).toBeInTheDocument()
    expect(screen.getByTestId('iw')).toBeValid()
    expect(screen.getByText('submit')).toBeVisible()
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeValid()
    expect(screen.getByPlaceholderText('Email')).toBeVisible()
  })

  test('Edit user are called', async () => {
    render(toRender)

    userEvent.click(screen.getByText('edit'))
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@test.com' }
    })

    userEvent.click(screen.getByText('submit'))
    const actions = store.getActions()
    expect(actions[2].type).toEqual('EDIT_USER')
  })
})
