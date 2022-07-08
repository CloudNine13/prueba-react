import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './error.scss'
import { releaseError } from '../../actions/errorActions'

const Error = ({ error, releaseErrorDispatch }) => {
  const message = error && error.text

  setTimeout(() => releaseErrorDispatch(), 8000)

  if (message) {
    return <div className='error'>{message}</div>
  }

  return null
}

Error.propTypes = {
  error: PropTypes.shape({
    text: PropTypes.string
  }),
  releaseErrorDispatch: PropTypes.func
}

Error.defaultProps = {
  error: {
    text: null
  },
  releaseErrorDispatch: null
}

const mapStateToProps = ({ error }) => ({ error })
const mapDispatchToProps = (dispatch) => ({
  releaseErrorDispatch: () => {
    dispatch(releaseError())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Error)
