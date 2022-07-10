import React from 'react'
import { ThemeProvider } from 'styled-components'
// Styled-components import and theme colors
import { Background, Title, Subtitle, ButtonWrapper, A } from './404.styled'
import theme from '../../utils/theme'

/**
 * Component than shows 404 error if user goes to undefined page
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @returns {JSX.Element} JSX element of 404 error
 */
const Error404 = () => (
  <ThemeProvider theme={theme}>
    <Background>
      <Title>404</Title>
      <Subtitle>This page does not exist :(</Subtitle>
      <ButtonWrapper className='button_wrapper_404'>
        <A href='/'>Go to homepage</A>
      </ButtonWrapper>
    </Background>
  </ThemeProvider>
)

export default Error404
