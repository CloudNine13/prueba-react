import styled from 'styled-components'

export const Nav = styled.div`
  position: relative;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${({ theme }) => theme.colors.grey_darkest};
  height: 60px;
  display: flex;
  align-items: center;
`

export const Img = styled.img`
  height: 50%;
  margin-left: 1%;

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    height: 40%;
    margin-left: 3%;
  }
`

export const Button = styled.button`
  margin-left: auto;
  margin-right: 1%;
  height: 50%;
  border: 0.16em solid ${({ theme }) => theme.colors.white};
  border-radius: 2em;
  background-color: ${({ theme }) => theme.colors.grey_dark};
  box-sizing: border-box;
  text-transform: uppercase;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 0.04em 0.04em ${({ theme }) => theme.colors.grey};
  text-align: center;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.grey_dark};
    border: 0.16em solid ${({ theme }) => theme.colors.grey_dark};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    margin-top: 0.3%;
  }

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    margin-right: 3%;
    font-size: 19px;
    font-weight: 500;
  }
`
