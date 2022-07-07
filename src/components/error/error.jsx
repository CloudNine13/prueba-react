import React from 'react'
import { connect, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import './error.scss'
import { releaseError } from '../../actions/errorActions'

const Error = ({ error }) => {
  const dispatch = useDispatch()
  const message = error && error.text

  setTimeout(() => dispatch(releaseError()), 5000)

  if (message) {
    return <div className='error'>{message}</div>
  }

  return null
}

Error.propTypes = {
  error: PropTypes.shape({
    text: PropTypes.string
  })
}

Error.defaultProps = {
  error: {
    text: null
  }
}

const mapStateToProps = ({ error }) => ({ error })

export default connect(mapStateToProps)(Error)
