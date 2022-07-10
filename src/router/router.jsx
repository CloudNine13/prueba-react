import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from '../components/login/login'
import Detail from '../components/detail/detail'
import Home from '../components/home/home'
import store from '../store/configureStore'
import Navbar from '../components/navbar/navbar'
import Error404 from '../components/404/404'

/**
 * This is the function used to set routes of the application
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @returns {JSX.Element} JSX element which is router component
 */
export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<Detail />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)
