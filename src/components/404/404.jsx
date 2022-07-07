import React from 'react'
import './404.scss'

const Error404 = () => (
  <div className='background_404'>
    <div className='title_404'>404</div>
    <div className='subtitle_404'>This page does not exist :(</div>
    <div className='button_wrapper_404'>
      <a href='/'>Go to homepage</a>
    </div>
  </div>
)

export default Error404
