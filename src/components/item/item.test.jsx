import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import Item from './item'

describe('Test: Item component', () => {
  const userObj = {
    first_name: 'test',
    last_name: 'test',
    email: 'test@test.com',
    id: 1
  }

  // Testing
  test('Elements are rendered correctly', async () => {
    const toRender = (
      <BrowserRouter>
        <Item user={userObj} />
      </BrowserRouter>
    )
    render(toRender)

    expect(screen.getByTestId('b')).toBeInTheDocument()
    expect(screen.getByTestId('fn')).toBeValid()
    expect(screen.getByTestId('s1')).toBeVisible()
    expect(screen.getByTestId('s2')).toBeInTheDocument()
    expect(screen.getByTestId('e')).toBeValid()
    expect(screen.getByTestId('s3')).toBeVisible()
  })

  test('Should go to "/user" route', async () => {
    const history = createMemoryHistory()
    render(
      <Router location={history.location} navigator={history}>
        <Item user={userObj} />
      </Router>
    )
    userEvent.click(screen.getByTestId('b'))
    expect(history.location.pathname).toEqual(`/user`)
  })
})
