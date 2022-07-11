import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'
import Detail from './detail'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Test: Detail component', () => {
  // Preparing variables, objects, JSX elements and functions
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureStore([sagaMiddleware])
  const store = mockStore({
    auth: { loadingAuth: false },
    getDelete: { loadingUsers: false },
    edit: { loadingEdit: false, updated_at: 'test' }
  })
  const toRender = (
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  )

  // Tesing
  test('Click on delete calls deleteUserDispatch', async () => {
    render(toRender)

    userEvent.click(screen.getByText('delete'))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'DELETE_REQUEST',
      id: 0,
      navigate: mockNavigate
    })
  })

  test('Unmount calls releaseEditDispatch', async () => {
    const { unmount } = render(toRender)

    unmount()
    const actions = store.getActions()
    expect(actions[1]).toEqual({ type: 'RELEASE_EDIT' })
  })

  test('Elements are rendered correctly', async () => {
    render(toRender)
    expect(screen.getByTestId('d')).toBeInTheDocument()
    expect(screen.getByTestId('dc')).toBeValid()
    expect(screen.getByTestId('dw')).toBeVisible()
    expect(screen.getByAltText('user avatar')).toBeInTheDocument()
    expect(screen.getByTestId('h1')).toBeValid()
    expect(screen.getByTestId('p')).toBeVisible()
    expect(screen.getByTestId('bw')).toBeInTheDocument()
    expect(screen.getByTestId('u')).toBeValid()
    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(screen.getByText('edit')).toBeInTheDocument()
    expect(screen.getByText('delete')).toBeValid()
    expect(screen.getByText('back')).toBeVisible()
  })
})
