import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import './detailForm.scss'
import Error from '../error/error'
import { SET_ERROR } from '../../utils/constants'
import { setError } from '../../actions/errorActions'

/**
 * Hook used to create edit form for user's detail form
 * @param {Function} editDispatch destructed dispatch function of hook properties which are set with mapping connection
 * @returns {JSX.Element} edit action form as JSX element
 */
const DetailForm = ({ editDispatch }) => {
  const dispatch = useDispatch()
  const [userDetail, setUserDetail] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })

  /**
   * Callback function used to dispatch edit action (or error) on submit click
   * @returns nothing from function to prevent dispatch edit action
   */
  const submitEditDetail = () => {
    /* [IMPORTANTE:] En la información de la prueba no se especifica si se necesita 
    actualizar todos los datos a la vez o se puede hacerlo uno por uno. 
    Según el ejemplo dado se supone que se necesita actualizarlo todo a la vez. 
    En el caso contratio rehacer esta parte no será el problema. Lo haré enseguida.
     */
    if (!userDetail.first_name || !userDetail.last_name || !userDetail.email) {
      dispatch(
        setError({
          type: SET_ERROR,
          err: 'You should fill all of the camps'
        })
      )
      return
    }
    editDispatch(userDetail)
  }

  /**
   * Function to avoid boilerplate code in JSX element to render
   * @param {string} name parameter used to set class, type and object key
   * @param {string} placeholder parameter used to set placeholder name
   * @returns {JSX.Element} prepared JSX.Element input for every situation
   */
  const inputBuilder = (name, placeholder) => (
    <input
      className={name}
      type={name}
      placeholder={placeholder}
      onChange={(event) => {
        const object = { ...userDetail }
        object[name] = event.target.value
        setUserDetail(object)
      }}
    />
  )

  return (
    <form
      className='detail_form'
      onSubmit={(event) => {
        event.preventDefault()
        submitEditDetail()
      }}
    >
      <div className='input_wrapper'>
        {inputBuilder('first_name', 'First Name')}
        {inputBuilder('last_name', 'Last Name')}
      </div>
      {inputBuilder('email', 'Email')}
      <button type='submit'>submit</button>
      <Error />
    </form>
  )
}

/**
 *
 * @param {Function} dispatch
 * @returns {Object} returns dispatcher object which is anonymous function
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Object with key editDispatch with anonymous function as value.
   * This function calls redux dispatch sending details of user to CRUD (update) action
   * @param {*} userDetail is the user data parameter passed to put api request
   */
  editDispatch: (userDetail) => {
    dispatch(userDetail)
  }
})

// Setting type of hook properties
DetailForm.propTypes = {
  editDispatch: PropTypes.func
}

// Setting default value to hook properties
DetailForm.defaultProps = {
  editDispatch: null
}

// Connecting dispatcher as props to DetailForm function
export default connect(null, mapDispatchToProps)(DetailForm)
