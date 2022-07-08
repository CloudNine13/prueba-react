import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { USER_TOKEN } from '../../utils/constants'
import DetailForm from '../detailForm/detailForm'
import './detail.scss'

/**
 * Hook used to create user detail's card
 * @returns {JSX.Element} card view as JSX element
 */
const Detail = () => {
  const [isEditable, setIsEditable] = useState(false)
  const { user } = useLocation().state || {}
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // Restricting access without correct link or token or if user is empty (= if URL is called manually)
  useEffect(() => {
    if (!searchParams.get('id')) navigate(-1)
    if (!localStorage.getItem(USER_TOKEN)) navigate('/login')
    if (!user) navigate('/')
  }, [])

  /**
   * Function to avoid boilerplate button code inside JSX element to render
   * @param {string} name value used to set css class of the button and it's text
   * @param {Function} onClickCallback function used inside onClick button callback
   * @returns {JSX.Element} JSX element which is used to set button on screen
   */
  const buttonBuilder = (name, onClickCallback) => (
    <button
      className={`${name}_button`}
      type='button'
      onClick={onClickCallback}
    >
      {name}
    </button>
  )

  return (
    <div className='detail'>
      <div className='detail_card'>
        <div className='data_wrapper'>
          <img src={user.avatar} alt='user avatar' />
          {isEditable ? (
            // Detail form hook component used to dispatch CRUD API call (put)
            <DetailForm />
          ) : (
            <>
              <h1>
                {user.first_name} {user.last_name}
              </h1>
              <div className='email_wrapper'>
                <p>Email:</p>
                {user.email}
              </div>
            </>
          )}
        </div>
        <div className='button_wrapper'>
          {buttonBuilder('delete', () => {
            console.log('Delete triggered')
          })}
          {buttonBuilder('edit', () => {
            setIsEditable(!isEditable)
          })}
        </div>
      </div>
      {buttonBuilder('back', () => {
        navigate(-1)
      })}
    </div>
  )
}

export default Detail
