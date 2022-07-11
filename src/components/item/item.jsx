import React from 'react'
import PropTypes from 'prop-types'
import './item.scss'
import { useNavigate } from 'react-router-dom'

/**
 * Item component representing each item of users' list in home page
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} user is the object passed as prop from home which contains users info such as names, id etc.
 * @returns {JSX.Element} Item component as JSX element
 */
const Item = ({ user }) => {
  const navigate = useNavigate()
  const { first_name, last_name, email, id } = user
  return (
    <button
      className='item'
      type='button'
      data-testid='b'
      onClick={() => {
        navigate(
          {
            pathname: '/user',
            search: `?id=${id}`
          },
          { state: { user } }
        )
      }}
    >
      <div data-testid='fn'>
        First name: <strong data-testid='s1'>{first_name}</strong>, Last name:
        <strong data-testid='s2'> {last_name}</strong>
      </div>
      <div data-testid='e'>
        Email: <strong data-testid='s3'>{email}</strong>
      </div>
    </button>
  )
}

Item.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
}

Item.defaultProps = {
  user: null
}

export default Item
