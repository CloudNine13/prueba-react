import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './error.sass'
import { releaseError } from '../../actions/errorActions'

/**
 * Component which rises an error when triggered inside others JSX elements
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} error object which contains error message
 * @param {Function} releaseErrorDispatch is the function used to set error's timeout
 * @returns {JSX.Element} JSX error element used inside other JSX Elements
 */
const Error = ({ error, releaseErrorDispatch }) => {
  const message = error && error.text

  // Hook useEffect used to reset timer when component is triggered
  const timer = setTimeout(() => releaseErrorDispatch(), 3000)
  useEffect(() => () => clearTimeout(timer), [message])

  if (message) {
    return <div className='error'>{message}</div>
  }
  return null
}

/**
 * Function used to map error state to properties of component
 * @param {string} error destructed state of error passed as property to component
 * @returns parameter error as property
 */
const mapStateToProps = ({ error }) => ({ error })

/**
 * Function used to map error release dispatcher to properties of component
 * @param {Function} dispatch used to dispatch release error action
 * @returns {Object} returns dispatcher object with key releaseErrorDispatch which value is anonymous function
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Function used to dispatch release edit action which deletes edit changes for other cards
   * @returns {Function} dispatch function executing release error action
   */
  releaseErrorDispatch: () => {
    dispatch(releaseError())
  }
})

// Setting type of component properties
Error.propTypes = {
  error: PropTypes.shape({
    text: PropTypes.string
  }),
  releaseErrorDispatch: PropTypes.func
}

// Setting default value to component properties
Error.defaultProps = {
  error: {
    text: null
  },
  releaseErrorDispatch: null
}

export default connect(mapStateToProps, mapDispatchToProps)(Error)
