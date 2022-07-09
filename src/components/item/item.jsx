import React from 'react'
import PropTypes from 'prop-types'
import './item.scss'
import { useNavigate } from 'react-router-dom'

const Item = ({ user }) => {
  const navigate = useNavigate()
  const { first_name, last_name, email } = user
  return (
    <button
      className='item'
      type='button'
      onClick={() => {
        navigate(
          {
            pathname: '/user',
            search: `?id=${user.id}`
          },
          { state: { user } }
        )
      }}
    >
      <div>
        First name: <strong>{first_name}</strong>, Last name:
        <strong> {last_name}</strong>
      </div>
      <div>
        Email: <strong>{email}</strong>
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
