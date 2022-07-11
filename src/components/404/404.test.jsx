import React from 'react'
import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import Error404 from './404'

describe('Test: Error404 component', () => {
  // Testing
  test('Elements are rendered correctly', async () => {
    render(<Error404 />)
    const background = screen.getByTestId('bg')
    const buttonWrapper = screen.getByTestId('bw')
    const title = screen.getByText('404')
    const subtitle = screen.getByText('This page does not exist :(')
    const link = screen.getByText('Go to homepage')

    expect(background).toBeInTheDocument()
    expect(background).toContainElement(title)
    expect(background).toContainElement(subtitle)
    expect(background).toContainElement(link)
    expect(background).toContainElement(buttonWrapper)
    expect(buttonWrapper).toBeValid()
    expect(buttonWrapper).toContainElement(link)
    expect(title).toBeVisible()
    expect(subtitle).toBeInTheDocument()
    expect(link).toBeValid()
  })

  test('Should go to "/" route', async () => {
    const history = createMemoryHistory()
    render(
      <Router location={history.location} navigator={history}>
        <Error404 />
      </Router>
    )
    userEvent.click(screen.getByText('Go to homepage'))
    expect(history.location.pathname).toEqual('/')
  })
})
