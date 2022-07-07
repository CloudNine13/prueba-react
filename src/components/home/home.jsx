import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_TOKEN } from '../../utils/constants'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem(USER_TOKEN)) navigate('/')
  }, [])

  return <div>Hello World!</div>
}

export default Home
