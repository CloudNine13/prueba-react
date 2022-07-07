import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from '../components/login/login'
import Home from '../components/home/home'
import store from '../store/configureStore'
import Navbar from '../components/navbar/navbar'
import Error404 from '../components/404/404'

function router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default router
