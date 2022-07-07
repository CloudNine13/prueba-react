import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_TOKEN } from '../../utils/constants'
import './home.scss'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem(USER_TOKEN)) navigate('/login')
  }, [])

  return (
    <div className='home'>
      <div className='item'>test</div>
    </div>
  )
}

export default Home
