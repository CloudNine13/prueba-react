import styled from 'styled-components'

export const LoginContainer = styled.div`
  position: fixed;
  top: 60px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${({ background }) => background}) no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`

export const LoginForm = styled.form`
  position: absolute;
  top: auto;
  width: fit-content;
  padding: 5%;
  text-align: center;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.grey_darkest};

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    padding: 5%;
    top: 10%;
  }
`

export const Header1 = styled.h1`
  margin: 0 0 5%;
  line-height: 1;
  color: ${({ theme }) => theme.colors.red};

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    margin: 0 0 15%;
  }
`
export const Input = styled.input`
  outline: none;
  display: block;
  width: 100%;
  margin: 0 0 20px;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.grey_dark};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.grey_dark};
  font-family: 'Roboto';
  box-sizing: border-box;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: 0.2s linear;

  &:focus {
    color: #333;
    border: 3px solid ${({ theme }) => theme.colors.purple};
  }

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    margin: 0 0 30px;
    font-size: 25px;
  }
`

export const Button = styled.button`
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.colors.red};
  text-decoration: none;
  padding: 15px;
  background-color: transparent;
  text-transform: uppercase;
  font-weight: 1000;
  color: ${({ theme }) => theme.colors.red};
  border-radius: 26px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.2s ease-in-out;
  }

  &:active {
    padding: 13px;
  }
`

export const BackgroundButton = styled(Button)`
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.blue};

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 24px;
  font-weight: 800;
`

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    gap: 30px;
  }
`

export const A = styled.a`
  position: absolute;
  bottom: 5%;
  font-weight: 900;
  font-size: 25px;
  color: ${({ theme }) => theme.colors.red};

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    bottom: 7%;
  }
`
