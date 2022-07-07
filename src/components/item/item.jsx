import React from 'react'
import PropTypes from 'prop-types'
import './item.scss'

const Item = (props) => {
  const { user } = props
  const { first_name, last_name, email } = user
  return (
    <button
      className='item'
      type='button'
      onClick={() => {
        console.log('plug')
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
